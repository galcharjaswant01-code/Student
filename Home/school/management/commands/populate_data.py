from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from school.models import Student, Attendance, Homework, Exam, Grade, TimeTable, Notification, Assignment, AssignmentSubmission, LearningResource
import random

class Command(BaseCommand):
    help = 'Populate the database with sample data for testing'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to populate database...'))

        # Clear existing data
        Student.objects.all().delete()
        Attendance.objects.all().delete()
        Homework.objects.all().delete()
        Exam.objects.all().delete()
        Grade.objects.all().delete()
        TimeTable.objects.all().delete()
        Notification.objects.all().delete()

        # Create Students
        students_data = [
            {
                'name': 'Raj Kumar',
                'roll_number': '001',
                'email': 'raj@school.com',
                'phone': '9876543210',
                'class_name': '10A',
                'guardian_name': 'Mr. Kumar',
                'guardian_phone': '9876543211',
            },
            {
                'name': 'Priya Singh',
                'roll_number': '002',
                'email': 'priya@school.com',
                'phone': '9876543212',
                'class_name': '10A',
                'guardian_name': 'Mrs. Singh',
                'guardian_phone': '9876543213',
            },
            {
                'name': 'Arjun Patel',
                'roll_number': '003',
                'email': 'arjun@school.com',
                'phone': '9876543214',
                'class_name': '10B',
                'guardian_name': 'Mr. Patel',
                'guardian_phone': '9876543215',
            },
        ]

        students = []
        for student_data in students_data:
            student = Student.objects.create(**student_data)
            students.append(student)
            self.stdout.write(self.style.SUCCESS(f'Created student: {student.name}'))

        # Create Attendance Records
        today = datetime.now().date()
        attendance_statuses = ['Present', 'Absent', 'Leave']
        subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography']

        for student in students:
            for i in range(30):
                date = today - timedelta(days=i)
                for subject in random.sample(subjects, 3):
                    Attendance.objects.create(
                        student=student,
                        date=date,
                        status=random.choice(attendance_statuses),
                        subject=subject,
                        remarks='' if random.random() > 0.3 else 'Good participation'
                    )
        self.stdout.write(self.style.SUCCESS('Created attendance records'))

        # Create Homework Assignments
        for student in students:
            for subject in subjects:
                # Pending homework
                Homework.objects.create(
                    student=student,
                    subject=subject,
                    title=f'{subject} Assignment {random.randint(1, 5)}',
                    description='Complete the assignment from chapters 5-7',
                    due_date=timezone.now() + timedelta(days=random.randint(1, 7)),
                    status='Pending',
                    assigned_date=timezone.now() - timedelta(days=2)
                )
                
                # Submitted homework
                submission_date = timezone.now() - timedelta(days=random.randint(1, 5))
                Homework.objects.create(
                    student=student,
                    subject=subject,
                    title=f'{subject} Worksheet {random.randint(1, 10)}',
                    description='Complete the worksheet exercises',
                    due_date=submission_date + timedelta(days=1),
                    status='Submitted',
                    submission_date=submission_date,
                    assigned_date=submission_date - timedelta(days=3)
                )
                
                # Reviewed homework
                review_date = timezone.now() - timedelta(days=random.randint(5, 10))
                Homework.objects.create(
                    student=student,
                    subject=subject,
                    title=f'{subject} Project {random.randint(1, 3)}',
                    description='Complete the project and submit',
                    due_date=review_date,
                    status='Reviewed',
                    submission_date=review_date,
                    marks=random.randint(70, 95),
                    feedback='Good work! Keep it up.',
                    assigned_date=review_date - timedelta(days=10)
                )
        self.stdout.write(self.style.SUCCESS('Created homework assignments'))

        # Create Exams
        for student in students:
            for i, subject in enumerate(subjects):
                exam_date = timezone.now() + timedelta(days=random.randint(1, 14))
                Exam.objects.create(
                    student=student,
                    subject=subject,
                    exam_name=f'{subject} Unit Test',
                    exam_type='Unit Test',
                    date=exam_date,
                    duration_minutes=60,
                    room_number=f'{101 + i}',
                    total_marks=100,
                    status='Scheduled'
                )
                
                # Add some completed exams
                completed_date = timezone.now() - timedelta(days=random.randint(5, 30))
                Exam.objects.create(
                    student=student,
                    subject=subject,
                    exam_name=f'{subject} Mid-term',
                    exam_type='Mid-term',
                    date=completed_date,
                    duration_minutes=120,
                    room_number=f'{201 + i}',
                    total_marks=100,
                    obtained_marks=random.randint(60, 95),
                    status='Completed'
                )
        self.stdout.write(self.style.SUCCESS('Created exams'))

        # Create Grades
        grade_choices = ['A', 'B', 'C', 'D', 'F']
        terms = ['Term 1', 'Term 2']
        
        for student in students:
            for subject in subjects:
                for term in terms:
                    marks = random.randint(60, 95)
                    percentage = (marks / 100) * 100
                    grade = 'A' if percentage >= 90 else 'B' if percentage >= 80 else 'C' if percentage >= 70 else 'D' if percentage >= 60 else 'F'
                    
                    Grade.objects.create(
                        student=student,
                        subject=subject,
                        marks_obtained=marks,
                        total_marks=100,
                        percentage=percentage,
                        grade=grade,
                        term=term,
                        teacher_name=f'Prof. {subject}',
                        remarks='Good performance' if grade in ['A', 'B'] else 'Needs improvement'
                    )
        self.stdout.write(self.style.SUCCESS('Created grades'))

        # Create Timetable
        day_choices = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        class_names = ['10A', '10B']
        start_times = ['09:00', '10:00', '11:00', '13:00', '14:00']
        
        for class_name in class_names:
            for day_idx, day in enumerate(day_choices):
                for time_idx, (start_time, subject) in enumerate(zip(start_times, subjects)):
                    start_hour, start_minute = map(int, start_time.split(':'))
                    end_hour = start_hour + 1
                    end_time = f'{end_hour:02d}:{start_minute:02d}'
                    
                    TimeTable.objects.create(
                        class_name=class_name,
                        day=day,
                        subject=subject,
                        teacher_name=f'Prof. {subject}',
                        start_time=start_time,
                        end_time=end_time,
                        room_number=f'{101 + time_idx}'
                    )
        self.stdout.write(self.style.SUCCESS('Created timetable'))

        # Create Notifications
        notification_types = ['Homework', 'Exam', 'Grade', 'Attendance', 'General', 'Event']
        priorities = ['High', 'Medium', 'Low']
        
        for student in students:
            notifications = [
                {
                    'title': 'New Homework Assignment',
                    'message': 'You have a new assignment in Mathematics due tomorrow.',
                    'notification_type': 'Homework',
                    'priority': 'High',
                },
                {
                    'title': 'Exam Scheduled',
                    'message': 'Your Science exam is scheduled for next week.',
                    'notification_type': 'Exam',
                    'priority': 'High',
                },
                {
                    'title': 'Grade Posted',
                    'message': 'Your grades for the latest test have been posted.',
                    'notification_type': 'Grade',
                    'priority': 'Medium',
                },
                {
                    'title': 'Attendance Update',
                    'message': 'Your attendance record has been updated.',
                    'notification_type': 'Attendance',
                    'priority': 'Low',
                },
                {
                    'title': 'School Event',
                    'message': 'Annual sports day is coming next month.',
                    'notification_type': 'Event',
                    'priority': 'Medium',
                },
            ]
            
            for notif_data in notifications:
                Notification.objects.create(
                    student=student,
                    **notif_data,
                    is_read=random.choice([True, False]),
                    created_at=timezone.now() - timedelta(days=random.randint(0, 5))
                )
        self.stdout.write(self.style.SUCCESS('Created notifications'))

        # ============== ALL SUBJECT LEARNING RESOURCES ==============
        all_subject_resources = {
            'Mathematics': [
                {
                    'title': 'Khan Academy - Mathematics',
                    'description': 'Comprehensive math lessons from basic arithmetic to calculus. Includes Algebra, Geometry, Trigonometry, and Calculus with step-by-step video explanations.',
                    'resource_type': 'Video', 'subject': 'Mathematics',
                    'video_url': 'https://www.youtube.com/@khanacademy',
                    'teacher_name': 'Khan Academy', 'class_name': '10A,10B',
                    'tags': 'algebra, calculus, geometry, trigonometry, math',
                },
                {
                    'title': 'Mathematics Formula Handbook',
                    'description': 'Complete formula reference for Algebra, Geometry, Trigonometry, and Calculus. Perfect for exam preparation and quick revision.',
                    'resource_type': 'Notes', 'subject': 'Mathematics',
                    'teacher_name': 'Prof. Mathematics', 'class_name': '10A,10B',
                    'tags': 'formulas, algebra, geometry, revision',
                },
                {
                    'title': '3Blue1Brown - Math Visualized',
                    'description': 'Beautiful visual explanations of mathematical concepts including linear algebra, calculus, and neural networks. Makes complex math intuitive.',
                    'resource_type': 'Video', 'subject': 'Mathematics',
                    'video_url': 'https://www.youtube.com/@3blue1brown',
                    'teacher_name': '3Blue1Brown', 'class_name': '10A,10B',
                    'tags': 'visual math, calculus, linear algebra, animations',
                },
            ],
            'Physics': [
                {
                    'title': 'Physics Wallah - Physics Lectures',
                    'description': 'Complete physics lectures covering Mechanics, Thermodynamics, Optics, and Modern Physics. Hindi/English bilingual teaching for better understanding.',
                    'resource_type': 'Video', 'subject': 'Physics',
                    'video_url': 'https://www.youtube.com/@PhysicsWallah',
                    'teacher_name': 'Physics Wallah', 'class_name': '10A,10B',
                    'tags': 'mechanics, physics, alakh pandey, IIT, NEET',
                },
                {
                    'title': 'Physics Practical Lab Manual',
                    'description': 'Step-by-step guide for all physics practical experiments with diagrams, observations, and calculations.',
                    'resource_type': 'PDF', 'subject': 'Physics',
                    'teacher_name': 'Prof. Physics', 'class_name': '10A,10B',
                    'tags': 'practical, lab, experiments, observations',
                },
                {
                    'title': 'Veritasium - Science Experiments',
                    'description': 'Fascinating physics experiments and science demonstrations that explain real-world phenomena in an engaging way.',
                    'resource_type': 'Video', 'subject': 'Physics',
                    'video_url': 'https://www.youtube.com/@veritasium',
                    'teacher_name': 'Veritasium', 'class_name': '10A,10B',
                    'tags': 'science, experiments, demonstrations, real-world',
                },
            ],
            'Chemistry': [
                {
                    'title': 'Organic Chemistry Tutor',
                    'description': 'Comprehensive chemistry tutorials covering organic chemistry, general chemistry, and biochemistry with practice problems.',
                    'resource_type': 'Video', 'subject': 'Chemistry',
                    'video_url': 'https://www.youtube.com/@TheOrganicChemistryTutor',
                    'teacher_name': 'Organic Chemistry Tutor', 'class_name': '10A,10B',
                    'tags': 'organic chemistry, reactions, biochemistry',
                },
                {
                    'title': 'Periodic Table Study Guide',
                    'description': 'Interactive periodic table with element properties, electron configurations, and common reactions for each element group.',
                    'resource_type': 'Notes', 'subject': 'Chemistry',
                    'teacher_name': 'Prof. Chemistry', 'class_name': '10A,10B',
                    'tags': 'periodic table, elements, reactions, study guide',
                },
                {
                    'title': 'Chemical Reactions & Equations',
                    'description': 'Comprehensive notes on types of chemical reactions, balancing equations, and stoichiometry with solved examples.',
                    'resource_type': 'Notes', 'subject': 'Chemistry',
                    'teacher_name': 'Prof. Chemistry', 'class_name': '10A,10B',
                    'tags': 'reactions, equations, stoichiometry, balancing',
                },
            ],
            'Biology': [
                {
                    'title': 'Amoeba Sisters - Biology',
                    'description': 'Engaging biology animations explaining complex topics like cell biology, genetics, evolution, and ecology in a fun, easy-to-understand way.',
                    'resource_type': 'Video', 'subject': 'Biology',
                    'video_url': 'https://www.youtube.com/@AmoebaSisters',
                    'teacher_name': 'Amoeba Sisters', 'class_name': '10A,10B',
                    'tags': 'cell biology, genetics, evolution, ecology',
                },
                {
                    'title': 'Human Anatomy Diagrams',
                    'description': 'Detailed labeled diagrams of human body systems - circulatory, respiratory, digestive, nervous, and skeletal systems.',
                    'resource_type': 'PDF', 'subject': 'Biology',
                    'teacher_name': 'Prof. Biology', 'class_name': '10A,10B',
                    'tags': 'anatomy, human body, diagrams, systems',
                },
                {
                    'title': 'Crash Course Biology',
                    'description': 'Fast-paced biology course covering everything from basic cell structure to ecology and evolution. Perfect for exam review.',
                    'resource_type': 'Video', 'subject': 'Biology',
                    'video_url': 'https://www.youtube.com/@crashcourse',
                    'teacher_name': 'Crash Course', 'class_name': '10A,10B',
                    'tags': 'biology, crash course, quick learning, exam prep',
                },
            ],
            'English': [
                {
                    'title': 'English Grammar Complete Guide',
                    'description': 'Comprehensive grammar guide covering tenses, parts of speech, sentence structure, punctuation, and common writing mistakes.',
                    'resource_type': 'Notes', 'subject': 'English',
                    'teacher_name': 'Prof. English', 'class_name': '10A,10B',
                    'tags': 'grammar, tenses, writing, punctuation',
                },
                {
                    'title': 'EngVid - Learn English',
                    'description': 'Free English lessons covering grammar, vocabulary, pronunciation, IELTS preparation, and business English from expert teachers.',
                    'resource_type': 'Video', 'subject': 'English',
                    'video_url': 'https://www.youtube.com/@engvid',
                    'teacher_name': 'EngVid', 'class_name': '10A,10B',
                    'tags': 'english, grammar, vocabulary, IELTS, communication',
                },
                {
                    'title': 'Poetry & Prose Analysis Guide',
                    'description': 'Step-by-step guide to analyzing poems, short stories, and plays. Includes literary devices, themes, and sample analyses.',
                    'resource_type': 'Notes', 'subject': 'English',
                    'teacher_name': 'Prof. English', 'class_name': '10A,10B',
                    'tags': 'poetry, prose, literature, analysis, literary devices',
                },
            ],
            'History': [
                {
                    'title': 'World History Crash Course',
                    'description': 'Fast-paced journey through world history from ancient civilizations to modern times. Covers major events, wars, and cultural developments.',
                    'resource_type': 'Video', 'subject': 'History',
                    'video_url': 'https://www.youtube.com/@crashcourse',
                    'teacher_name': 'Crash Course', 'class_name': '10A,10B',
                    'tags': 'world history, civilizations, wars, cultures',
                },
                {
                    'title': 'Indian History Timeline',
                    'description': 'Complete timeline of Indian history from Indus Valley Civilization to Modern India. Includes important dates, dynasties, and movements.',
                    'resource_type': 'Notes', 'subject': 'History',
                    'teacher_name': 'Prof. History', 'class_name': '10A,10B',
                    'tags': 'indian history, timeline, dynasties, freedom struggle',
                },
                {
                    'title': 'Nationalism in India Notes',
                    'description': 'Detailed study notes on the rise of nationalism in India, key freedom fighters, movements, and the path to independence.',
                    'resource_type': 'Notes', 'subject': 'History',
                    'teacher_name': 'Prof. History', 'class_name': '10A,10B',
                    'tags': 'nationalism, india, freedom fighters, independence',
                },
            ],
            'Geography': [
                {
                    'title': 'Physical Geography Notes',
                    'description': 'Complete notes on physical geography including landforms, climate patterns, ocean currents, and vegetation zones with colorful diagrams.',
                    'resource_type': 'Notes', 'subject': 'Geography',
                    'teacher_name': 'Prof. Geography', 'class_name': '10A,10B',
                    'tags': 'physical geography, landforms, climate, diagrams',
                },
                {
                    'title': 'Map Reading & Interpretation',
                    'description': 'Learn to read topographic maps, understand contours, scales, symbols, and geographic coordinates. Includes practice exercises.',
                    'resource_type': 'PDF', 'subject': 'Geography',
                    'teacher_name': 'Prof. Geography', 'class_name': '10A,10B',
                    'tags': 'maps, topography, coordinates, navigation',
                },
                {
                    'title': 'Geography Now - Country Profiles',
                    'description': 'Fun and informative video profiles of every country covering geography, culture, history, and interesting facts.',
                    'resource_type': 'Video', 'subject': 'Geography',
                    'video_url': 'https://www.youtube.com/@GeographyNow',
                    'teacher_name': 'Geography Now', 'class_name': '10A,10B',
                    'tags': 'countries, geography, culture, world facts',
                },
            ],
            'Economics': [
                {
                    'title': 'Basic Economics Concepts',
                    'description': 'Introduction to economics covering supply and demand, market structures, GDP, inflation, and fiscal policy with real-world examples.',
                    'resource_type': 'Notes', 'subject': 'Economics',
                    'teacher_name': 'Prof. Economics', 'class_name': '10A,10B',
                    'tags': 'economics, supply demand, GDP, inflation, markets',
                },
                {
                    'title': 'Indian Economy Overview',
                    'description': 'Comprehensive overview of the Indian economy including sectors, budget, five-year plans, and economic reforms since 1991.',
                    'resource_type': 'Notes', 'subject': 'Economics',
                    'teacher_name': 'Prof. Economics', 'class_name': '10A,10B',
                    'tags': 'indian economy, budget, reforms, sectors',
                },
                {
                    'title': 'Money & Banking Explained',
                    'description': 'Understand how money works, banking systems, RBI functions, digital payments, and the stock market basics.',
                    'resource_type': 'Video', 'subject': 'Economics',
                    'teacher_name': 'Prof. Economics', 'class_name': '10A,10B',
                    'tags': 'money, banking, RBI, digital payments, stock market',
                },
            ],
            'Computer Science': [
                {
                    'title': 'freeCodeCamp.org - Full Programming Courses',
                    'description': 'Comprehensive full-length programming courses covering web development, data science, machine learning, Python, JavaScript, and more.',
                    'resource_type': 'Video', 'subject': 'Computer Science',
                    'video_url': 'https://www.youtube.com/@freecodecamp',
                    'teacher_name': 'freeCodeCamp', 'class_name': '10A,10B',
                    'tags': 'programming, web development, python, javascript',
                },
                {
                    'title': 'CodeWithHarry - Python, Django & Web Development',
                    'description': 'Hindi/English tutorials covering Python, Django, web development, JavaScript, and more. Great for beginners and intermediate learners.',
                    'resource_type': 'Video', 'subject': 'Computer Science',
                    'video_url': 'https://www.youtube.com/@CodeWithHarry',
                    'teacher_name': 'CodeWithHarry', 'class_name': '10A,10B',
                    'tags': 'python, django, web development, hindi tutorials',
                },
                {
                    'title': 'Apna College - Java & DSA',
                    'description': 'Structured courses on Java programming, Data Structures and Algorithms (DSA), and computer science fundamentals.',
                    'resource_type': 'Video', 'subject': 'Computer Science',
                    'video_url': 'https://www.youtube.com/@ApnaCollegeOfficial',
                    'teacher_name': 'Apna College', 'class_name': '10A,10B',
                    'tags': 'java, dsa, data structures, algorithms',
                },
                {
                    'title': 'Programming with Mosh - Web & Python',
                    'description': 'High-quality, concise programming tutorials on Python, JavaScript, React, Node.js, and web development.',
                    'resource_type': 'Video', 'subject': 'Computer Science',
                    'video_url': 'https://www.youtube.com/@programmingwithmosh',
                    'teacher_name': 'Programming with Mosh', 'class_name': '10A,10B',
                    'tags': 'python, javascript, react, node.js, web dev',
                },
                {
                    'title': 'CS50 - Computer Science Fundamentals',
                    'description': 'Harvard University\'s renowned CS50 course on computer science fundamentals, algorithms, data structures, and more.',
                    'resource_type': 'Video', 'subject': 'Computer Science',
                    'video_url': 'https://www.youtube.com/@cs50',
                    'teacher_name': 'CS50 (Harvard)', 'class_name': '10A,10B',
                    'tags': 'computer science, algorithms, harvard, cs50',
                },
                {
                    'title': 'Python Programming Basics',
                    'description': 'Introduction to Python programming covering variables, data types, loops, functions, and object-oriented programming with examples.',
                    'resource_type': 'Notes', 'subject': 'Computer Science',
                    'teacher_name': 'Prof. CS', 'class_name': '10A,10B',
                    'tags': 'python, programming, beginners, coding basics',
                },
            ],
        }

        all_resources = []
        for subject, resources in all_subject_resources.items():
            for resource in resources:
                # Add file extension for non-video resources
                if resource.get('resource_type') == 'PDF':
                    resource['file_extension'] = 'pdf'
                elif resource.get('resource_type') == 'Notes':
                    resource['file_extension'] = 'txt'
                all_resources.append(resource)

        for resource in all_resources:
            LearningResource.objects.create(
                **resource,
                is_active=True,
                view_count=random.randint(50, 500),
                download_count=random.randint(10, 100),
            )
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_resources)} learning resources across all subjects'))

        self.stdout.write(self.style.SUCCESS('✅ Database successfully populated with sample data!'))
        self.stdout.write(self.style.WARNING('\nYou can now access the dashboard at:'))
        self.stdout.write(self.style.WARNING(f'http://localhost:8000/school/dashboard/'))