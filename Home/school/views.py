from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from django.views.decorators.http import require_POST
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Student, Attendance, Homework, Exam, Grade, TimeTable, Notification, Assignment, AssignmentSubmission, LearningResource
from .ai_chatbot import get_bot_response

def index(request):
    # Show landing page for non-authenticated users
    if request.user.is_authenticated:
        return redirect('student_dashboard')
    return render(request, 'school/landing.html')


@login_required
def student_dashboard(request, student_id=None):
    """
    Student Dashboard - Displays personalized information for a student
    """
    # Get student object (could be logged-in student or specified student)
    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        # Try to get student associated with logged-in user
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    # Get today's date
    now = timezone.now()
    today = timezone.localdate()

    # 1. Attendance Data
    total_attendance = Attendance.objects.filter(student=student).count()
    present_count = Attendance.objects.filter(student=student, status='Present').count()
    absent_count = Attendance.objects.filter(student=student, status='Absent').count()
    leave_count = Attendance.objects.filter(student=student, status='Leave').count()
    attendance_percentage = (present_count / total_attendance * 100) if total_attendance > 0 else 0

    # Recent attendance (last 5 records)
    recent_attendance = Attendance.objects.filter(student=student).order_by('-date')[:5]
    attendance_chart_records = list(Attendance.objects.filter(student=student).order_by('-date')[:7])
    attendance_chart_records.reverse()
    attendance_chart_labels = [record.date.strftime('%b %d') for record in attendance_chart_records]
    attendance_chart_values = [
        100 if record.status == 'Present' else 50 if record.status == 'Leave' else 0
        for record in attendance_chart_records
    ]
    attendance_heatmap = list(Attendance.objects.filter(student=student).order_by('-date')[:14])

    # 2. Homework Data
    pending_homework = Homework.objects.filter(student=student, status='Pending').order_by('due_date')
    overdue_homework = pending_homework.filter(due_date__lt=now)
    upcoming_homework = pending_homework.filter(due_date__gte=now)[:5]
    submitted_homework = Homework.objects.filter(student=student, status='Submitted').count()
    reviewed_homework = Homework.objects.filter(student=student, status='Reviewed').count()

    # 3. Upcoming Exams
    upcoming_exams = Exam.objects.filter(
        student=student,
        date__gte=now,
        status='Scheduled'
    ).order_by('date')[:5]

    completed_exams = Exam.objects.filter(student=student, status='Completed').count()

    # 4. Grades & Performance
    recent_grades = Grade.objects.filter(student=student).order_by('-date')[:5]
    average_percentage = 0
    if recent_grades.exists():
        average_percentage = sum(g.percentage for g in recent_grades) / len(recent_grades)

    # Subject-wise average
    subjects_grades = {}
    for grade in Grade.objects.filter(student=student):
        if grade.subject not in subjects_grades:
            subjects_grades[grade.subject] = {'marks': [], 'percentage': []}
        subjects_grades[grade.subject]['marks'].append(grade.marks_obtained)
        subjects_grades[grade.subject]['percentage'].append(grade.percentage)

    for subject in subjects_grades:
        marks_list = subjects_grades[subject]['marks']
        percent_list = subjects_grades[subject]['percentage']
        subjects_grades[subject]['avg_marks'] = sum(marks_list) / len(marks_list)
        subjects_grades[subject]['avg_percentage'] = sum(percent_list) / len(percent_list)

    # 5. Timetable for student's class
    timetable = TimeTable.objects.filter(class_name=student.class_name).order_by('day', 'start_time')

    # Get today's classes
    day_mapping = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday'}
    today_day = day_mapping.get(today.weekday(), '')
    today_classes = timetable.filter(day=today_day)

    # 6. Notifications (Unread and recent)
    unread_notifications = Notification.objects.filter(student=student, is_read=False).order_by('-created_at')[:10]
    all_notifications = Notification.objects.filter(student=student).order_by('-created_at')[:10]
    unread_count = unread_notifications.count()

    # 7. Assignment overview
    active_assignments = Assignment.objects.filter(is_active=True).order_by('due_date')
    student_assignments = []
    for assignment in active_assignments:
        if student.class_name in assignment.classes or not assignment.classes:
            submission = AssignmentSubmission.objects.filter(
                assignment=assignment,
                student=student
            ).first()
            assignment.submission = submission
            assignment.display_status = submission.status if submission else 'Pending'
            assignment.progress_percent = 100 if submission and submission.status in ['Submitted', 'Reviewed'] else 35
            student_assignments.append(assignment)

    dashboard_assignments = student_assignments[:5]
    completed_assignment_count = sum(
        1 for assignment in student_assignments
        if assignment.submission and assignment.submission.status in ['Submitted', 'Reviewed']
    )
    pending_assignment_count = len(student_assignments) - completed_assignment_count

    # 8. Learning resources overview
    resources = LearningResource.objects.filter(is_active=True)
    if student.class_name:
        resources = resources.filter(Q(class_name='') | Q(class_name__icontains=student.class_name))
    recent_resources = resources.order_by('-created_at')[:4]
    video_resources_count = resources.filter(resource_type='Video').count()
    pdf_resources_count = resources.filter(resource_type='PDF').count()
    coding_resources_count = resources.filter(resource_type='Coding').count()

    # 9. Progress summary
    completed_tasks = submitted_homework + reviewed_homework + completed_assignment_count
    total_tasks = pending_homework.count() + submitted_homework + reviewed_homework + len(student_assignments)
    weekly_progress = round((completed_tasks / total_tasks) * 100) if total_tasks else 100

    grade_chart_labels = [grade.subject for grade in recent_grades]
    grade_chart_values = [round(grade.percentage, 2) for grade in recent_grades]

    # Prepare context data
    context = {
        'student': student,
        'today': today,
        'day_name': today_day,
        'weekly_progress': weekly_progress,
        'completed_tasks': completed_tasks,
        'total_tasks': total_tasks,

        # Attendance
        'attendance_percentage': round(attendance_percentage, 2),
        'present_count': present_count,
        'absent_count': absent_count,
        'leave_count': leave_count,
        'total_attendance': total_attendance,
        'recent_attendance': recent_attendance,
        'attendance_heatmap': attendance_heatmap,
        'attendance_chart_labels': attendance_chart_labels,
        'attendance_chart_values': attendance_chart_values,

        # Homework
        'pending_homework_count': pending_homework.count(),
        'overdue_homework': overdue_homework,
        'upcoming_homework': upcoming_homework,
        'submitted_homework': submitted_homework,
        'reviewed_homework': reviewed_homework,

        # Exams
        'upcoming_exams': upcoming_exams,
        'completed_exams': completed_exams,

        # Grades
        'recent_grades': recent_grades,
        'average_percentage': round(average_percentage, 2),
        'subjects_grades': subjects_grades,
        'grade_chart_labels': grade_chart_labels,
        'grade_chart_values': grade_chart_values,

        # Assignments
        'dashboard_assignments': dashboard_assignments,
        'completed_assignment_count': completed_assignment_count,
        'pending_assignment_count': pending_assignment_count,

        # Resources
        'recent_resources': recent_resources,
        'total_resources': resources.count(),
        'video_resources_count': video_resources_count,
        'pdf_resources_count': pdf_resources_count,
        'coding_resources_count': coding_resources_count,

        # Timetable
        'today_classes': today_classes,
        'full_timetable': timetable,

        # Notifications
        'unread_notifications': unread_notifications,
        'all_notifications': all_notifications,
        'unread_count': unread_count,
    }

    return render(request, 'school/student_dashboard.html', context)


@require_http_methods(['POST'])
def mark_notification_as_read(request, notification_id):
    """Mark a notification as read"""
    notification = get_object_or_404(Notification, id=notification_id)
    notification.is_read = True
    notification.save()
    return HttpResponse('OK')


@require_http_methods(['POST'])
def mark_all_notifications_as_read(request):
    """Mark all notifications as read for a student"""
    # Get student (assuming logged-in user)
    student = Student.objects.first()
    if student:
        Notification.objects.filter(student=student, is_read=False).update(is_read=True)
    return HttpResponse('OK')


# ============== ASSIGNMENT SUBMISSION VIEWS ==============

@login_required
def assignments_list(request, student_id=None):
    """List all assignments for a student"""
    # Get student
    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    now = timezone.now()

    # Get assignments for the student's class
    all_assignments = Assignment.objects.filter(is_active=True).order_by('-due_date')

    # Filter assignments for student's class
    assignments_list = []
    for assignment in all_assignments:
        if student.class_name in assignment.classes or not assignment.classes:
            assignments_list.append(assignment)

    # Categorize assignments
    upcoming_assignments = []
    overdue_assignments = []
    completed_assignments = []

    for assignment in assignments_list:
        submission = AssignmentSubmission.objects.filter(
            assignment=assignment,
            student=student
        ).first()

        assignment.submission = submission
        assignment.submission_status = submission.status if submission else 'Not Started'

        if assignment.due_date < now:
            overdue_assignments.append(assignment)
        elif submission and submission.status in ['Submitted', 'Reviewed']:
            completed_assignments.append(assignment)
        else:
            upcoming_assignments.append(assignment)

    context = {
        'student': student,
        'upcoming_assignments': upcoming_assignments,
        'overdue_assignments': overdue_assignments,
        'completed_assignments': completed_assignments,
        'total_assignments': len(assignments_list),
    }

    return render(request, 'school/assignments_list.html', context)


@login_required
def assignment_detail(request, assignment_id, student_id=None):
    """View assignment details and submission status"""
    assignment = get_object_or_404(Assignment, id=assignment_id)

    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    # Get submission for this student
    submission = AssignmentSubmission.objects.filter(
        assignment=assignment,
        student=student
    ).first()

    # Check if student can submit
    can_submit = assignment.due_date > timezone.now() or (submission and submission.status == 'Resubmit')

    context = {
        'assignment': assignment,
        'student': student,
        'submission': submission,
        'can_submit': can_submit,
        'is_overdue': assignment.due_date < timezone.now(),
        'days_remaining': assignment.days_remaining(),
    }

    return render(request, 'school/assignment_detail.html', context)


@login_required
@require_POST
def submit_assignment(request, assignment_id, student_id=None):
    """Handle assignment submission"""
    assignment = get_object_or_404(Assignment, id=assignment_id)

    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Student profile not found'})
    else:
        return JsonResponse({'success': False, 'error': 'Authentication required'})

    if not student:
        return JsonResponse({'success': False, 'error': 'Student not found'})

    # Check if file is present
    if 'submission_file' not in request.FILES:
        return JsonResponse({'success': False, 'error': 'No file provided'})

    submission_file = request.FILES['submission_file']

    # Validate file type
    valid_extensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'zip', 'rar', '7z']
    file_ext = submission_file.name.split('.')[-1].lower()

    if file_ext not in valid_extensions:
        return JsonResponse({'success': False, 'error': f'File type .{file_ext} not allowed'})

    # Check file size (10MB max)
    if submission_file.size > 10485760:
        return JsonResponse({'success': False, 'error': 'File size exceeds 10MB limit'})

    # Check if submission already exists
    submission = AssignmentSubmission.objects.filter(
        assignment=assignment,
        student=student
    ).first()

    is_late = assignment.due_date < timezone.now()

    if submission:
        # Update existing submission
        submission.submission_file = submission_file
        submission.submission_date = timezone.now()
        submission.status = 'Submitted'
        submission.is_late = is_late
        if is_late:
            delta = timezone.now().date() - assignment.due_date.date()
            submission.late_days = delta.days
    else:
        # Create new submission
        submission = AssignmentSubmission.objects.create(
            assignment=assignment,
            student=student,
            submission_file=submission_file,
            status='Submitted',
            is_late=is_late,
        )
        if is_late:
            delta = timezone.now().date() - assignment.due_date.date()
            submission.late_days = delta.days

    submission.save()

    return JsonResponse({
        'success': True,
        'message': f'Assignment submitted successfully {"(Late)" if is_late else ""}',
        'is_late': is_late,
        'late_days': submission.late_days if is_late else 0
    })


@login_required
def my_submissions(request, student_id=None):
    """View all submissions by a student"""
    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    # Get all submissions for the student
    submissions = AssignmentSubmission.objects.filter(student=student).order_by('-submission_date')

    # Calculate stats
    total_submissions = submissions.count()
    pending_review = submissions.filter(status='Pending').count()
    reviewed = submissions.filter(status='Reviewed').count()
    average_marks = 0

    if reviewed > 0:
        total_marks = sum(s.marks_obtained or 0 for s in submissions.filter(status='Reviewed', marks_obtained__isnull=False))
        average_marks = total_marks / reviewed if reviewed > 0 else 0

    # Get submissions with status breakdown
    pending_submissions = submissions.filter(status__in=['Submitted', 'Pending'])
    reviewed_submissions = submissions.filter(status='Reviewed')
    resubmit_submissions = submissions.filter(status='Resubmit')

    context = {
        'student': student,
        'submissions': submissions,
        'pending_submissions': pending_submissions,
        'reviewed_submissions': reviewed_submissions,
        'resubmit_submissions': resubmit_submissions,
        'total_submissions': total_submissions,
        'pending_review': pending_review,
        'reviewed': reviewed,
        'average_marks': round(average_marks, 2),
    }

    return render(request, 'school/my_submissions.html', context)


@login_required
def submission_feedback(request, submission_id, student_id=None):
    """View feedback for a submission"""
    submission = get_object_or_404(AssignmentSubmission, id=submission_id)

    if student_id:
        student = get_object_or_404(Student, id=student_id)
        if submission.student.id != student.id:
            return render(request, 'school/error.html', {'message': 'Unauthorized access'})
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
    else:
        student = Student.objects.first()

    context = {
        'submission': submission,
        'student': student,
        'assignment': submission.assignment,
    }

    return render(request, 'school/submission_feedback.html', context)


# ============== LEARNING RESOURCES VIEWS ==============

@login_required
def learning_resources(request, student_id=None):
    """List all learning resources for students"""
    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    # Get query parameters for filtering
    resource_type = request.GET.get('type', '')
    subject = request.GET.get('subject', '')
    search = request.GET.get('search', '')

    # Get active resources
    resources = LearningResource.objects.filter(is_active=True).order_by('-created_at')

    # Filter by student's class if class_name filter is specified
    if student.class_name:
        # Include resources for all classes or specifically for student's class
        resources = resources.filter(
            Q(class_name='') | Q(class_name__icontains=student.class_name)
        )

    # Apply filters
    if resource_type:
        resources = resources.filter(resource_type=resource_type)
    
    if subject:
        resources = resources.filter(subject=subject)
    
    if search:
        resources = resources.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search) |
            Q(tags__icontains=search) |
            Q(teacher_name__icontains=search)
        )

    # Get counts for stats
    total_resources = resources.count()
    notes_count = resources.filter(resource_type='Notes').count()
    pdf_count = resources.filter(resource_type='PDF').count()
    video_count = resources.filter(resource_type='Video').count()
    presentation_count = resources.filter(resource_type='Presentation').count()
    coding_count = resources.filter(resource_type='Coding').count()

    # Get recent resources
    recent_resources = resources[:10]

    # Get available subjects from resources (deduplicated)
    available_subjects = LearningResource.objects.filter(is_active=True).values_list('subject', flat=True).order_by('subject').distinct()

    # Group resources by subject (subject-wise display)
    from collections import OrderedDict
    subject_groups = OrderedDict()
    for resource in resources:
        subj = resource.subject
        if subj not in subject_groups:
            subject_groups[subj] = []
        subject_groups[subj].append(resource)

    context = {
        'student': student,
        'resources': resources,
        'subject_groups': subject_groups,
        'recent_resources': recent_resources,
        'total_resources': total_resources,
        'notes_count': notes_count,
        'pdf_count': pdf_count,
        'video_count': video_count,
        'presentation_count': presentation_count,
        'coding_count': coding_count,
        'available_subjects': available_subjects,
        'current_type': resource_type,
        'current_subject': subject,
        'search_query': search,
    }

    return render(request, 'school/learning_resources.html', context)


@login_required
def resource_detail(request, resource_id, student_id=None):
    """View resource details and handle download"""
    resource = get_object_or_404(LearningResource, id=resource_id)

    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    # Increment view count
    resource.view_count += 1
    resource.save()

    # Get related resources
    related_resources = LearningResource.objects.filter(
        subject=resource.subject,
        is_active=True
    ).exclude(id=resource.id)[:5]

    context = {
        'student': student,
        'resource': resource,
        'related_resources': related_resources,
    }

    return render(request, 'school/resource_detail.html', context)


@login_required
def download_resource(request, resource_id):
    """Handle resource download and increment download count"""
    resource = get_object_or_404(LearningResource, id=resource_id)
    
    # Increment download count
    resource.download_count += 1
    resource.save()
    
    # Return file for download
    if resource.file:
        response = HttpResponse(resource.file, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{resource.file.name}"'
        return response
    
    return redirect('resource_detail', resource_id=resource_id)


# ============== AI CHATBOT VIEWS ==============

@login_required
def ai_chatbot(request, student_id=None):
    """AI Chatbot page - Student can ask questions and get AI responses"""
    if student_id:
        student = get_object_or_404(Student, id=student_id)
    elif request.user.is_authenticated:
        try:
            student = Student.objects.get(user=request.user)
        except Student.DoesNotExist:
            student = Student.objects.first()
            if not student:
                return render(request, 'school/no_student.html', {'message': 'No student found'})
    else:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    context = {
        'student': student,
    }

    return render(request, 'school/ai_chatbot.html', context)


@login_required
@require_POST
def ai_chatbot_api(request):
    """API endpoint for AI Chatbot - returns JSON response"""
    import json
    
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
    except (json.JSONDecodeError, AttributeError):
        user_message = ''
    
    if not user_message.strip():
        return JsonResponse({
            'response': 'Please type a message to get started! 😊'
        })
    
    # Get AI response
    bot_response = get_bot_response(user_message)
    
    return JsonResponse({
        'response': bot_response
    })


# ============== AUTHENTICATION VIEWS ==============

def user_login(request):
    """Handle user login"""
    if request.user.is_authenticated:
        return redirect('student_dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Try to authenticate with username or email
        user = authenticate(request, username=username, password=password)
        
        if user is None:
            # Try with email
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None
        
        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful! Welcome back.')
            return redirect('student_dashboard')
        else:
            messages.error(request, 'Invalid username/email or password.')
    
    return render(request, 'school/login.html')


def user_register(request):
    """Handle user registration"""
    if request.user.is_authenticated:
        return redirect('student_dashboard')
    
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        roll_number = request.POST.get('roll_number')
        class_name = request.POST.get('class_name')
        date_of_birth = request.POST.get('date_of_birth')
        phone = request.POST.get('phone')
        
        # Validation
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists.')
            return render(request, 'school/register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'school/register.html')
        
        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'school/register.html')
        
        if len(password1) < 8:
            messages.error(request, 'Password must be at least 8 characters long.')
            return render(request, 'school/register.html')
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create student profile
        full_name = f"{first_name} {last_name}"
        student = Student.objects.create(
            user=user,
            name=full_name,
            roll_number=roll_number,
            email=email,
            phone=phone,
            date_of_birth=date_of_birth,
            class_name=class_name
        )
        
        messages.success(request, 'Account created successfully! Please login.')
        return redirect('login')
    
    return render(request, 'school/register.html')


def user_logout(request):
    """Handle user logout"""
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')


@login_required
def user_profile(request):
    """Display user profile and handle profile image uploads"""
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        student = Student.objects.first()
        if not student:
            return render(request, 'school/no_student.html', {'message': 'No student found'})

    if request.method == 'POST':
        profile_picture = request.FILES.get('profile_picture')

        if not profile_picture:
            messages.error(request, 'Please choose an image to upload.')
            return redirect('profile')

        allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        file_extension = profile_picture.name.rsplit('.', 1)[-1].lower()

        if file_extension not in allowed_extensions:
            messages.error(request, 'Only JPG, PNG, GIF, and WebP images are allowed.')
            return redirect('profile')

        if profile_picture.size > 5 * 1024 * 1024:
            messages.error(request, 'Profile image must be 5MB or smaller.')
            return redirect('profile')

        student.profile_picture = profile_picture
        student.save(update_fields=['profile_picture'])
        messages.success(request, 'Profile image updated successfully.')
        return redirect('profile')
    
    # Calculate stats
    total_attendance = Attendance.objects.filter(student=student).count()
    present_count = Attendance.objects.filter(student=student, status='Present').count()
    attendance_percentage = (present_count / total_attendance * 100) if total_attendance > 0 else 0
    
    recent_grades = Grade.objects.filter(student=student).order_by('-date')[:5]
    average_percentage = 0
    if recent_grades.exists():
        average_percentage = sum(g.percentage for g in recent_grades) / len(recent_grades)
    
    total_assignments = AssignmentSubmission.objects.filter(student=student).count()
    
    context = {
        'student': student,
        'attendance_percentage': round(attendance_percentage, 2),
        'average_percentage': round(average_percentage, 2),
        'total_assignments': total_assignments,
    }
    
    return render(request, 'school/profile.html', context)
