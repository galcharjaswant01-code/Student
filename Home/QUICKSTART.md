# 🎓 Student Dashboard - Quick Start

## 🚀 Get Started in 5 Minutes

### Step 1: Run Migrations
```bash
cd "c:\Study\video 1\Student_Managemanet_System\Home"
python manage.py makemigrations
python manage.py migrate
```

### Step 2: Create Admin Account
```bash
python manage.py createsuperuser
# Follow the prompts to create your admin account
```

### Step 3: Populate Sample Data (Optional but Recommended)
```bash
python manage.py populate_data
```

This command will automatically create:
- 3 sample students
- Attendance records for each student
- Homework assignments
- Exam schedules
- Grades and performance data
- Class timetable
- Notifications

### Step 4: Start Development Server
```bash
python manage.py runserver
```

### Step 5: Access Dashboard
Open your browser and visit:
- **Dashboard**: `http://localhost:8000/school/dashboard/`
- **Admin Panel**: `http://localhost:8000/admin/`

---

## 📱 Dashboard Features

Your student dashboard displays:

### 📊 Attendance Section
- Overall attendance percentage
- Breakdown of Present/Absent/Leave
- Progress bar visualization
- Recent attendance records

### 📚 Homework Section
- Pending assignments count
- Submitted vs reviewed assignments
- Overdue homework alerts
- Upcoming assignment list

### 📝 Exams Section
- Upcoming exams with countdown
- Exam details (date, time, room, duration)
- Completed exams count
- Color-coded urgency (red = within 7 days)

### ⭐ Grades & Performance
- Overall average percentage
- Recent grades with letter grades
- Subject-wise performance
- Grade breakdown by term

### 📅 Timetable
- Today's classes highlighted
- Weekly schedule view
- Teacher names and room numbers

### 🔔 Notifications
- Unread notification badge
- Priority-based sorting
- Mark as read functionality
- Quick notification center

---

## 📊 Admin Panel

Add/manage data through Django admin:

1. Go to `http://localhost:8000/admin/`
2. Log in with your superuser credentials
3. Manage:
   - **Students** - Add new students
   - **Attendance** - Record attendance
   - **Homework** - Assign homework
   - **Exams** - Schedule exams
   - **Grades** - Post grades
   - **TimeTable** - Create class schedule
   - **Notifications** - Send notifications

---

## 🎨 Customization

### Change Color Scheme
Edit [static/css/style.css](static/css/style.css):
```css
:root {
    --primary: #667eea;          /* Main color */
    --primary-dark: #764ba2;     /* Dark accent */
    --success: #27ae60;          /* Success green */
    --danger: #e74c3c;           /* Danger red */
    --warning: #f39c12;          /* Warning yellow */
}
```

### Modify Dashboard Layout
Edit [templates/school/student_dashboard.html](templates/school/student_dashboard.html)

### Add Dashboard Functionality
Edit [static/js/dashboard.js](static/js/dashboard.js)

---

## 🔧 Project Structure

```
Home/
├── manage.py
├── db.sqlite3
├── Home/
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL configuration
│   ├── wsgi.py
│   └── asgi.py
├── school/
│   ├── models.py            # Database models
│   ├── views.py             # Dashboard views
│   ├── urls.py              # School URLs
│   ├── admin.py             # Admin configuration
│   ├── apps.py
│   ├── tests.py
│   └── management/
│       └── commands/
│           └── populate_data.py    # Sample data generation
├── templates/
│   └── school/
│       ├── base.html        # Base template
│       ├── student_dashboard.html
│       └── no_student.html
└── static/
    ├── css/
    │   └── style.css        # Dashboard styling
    └── js/
        └── dashboard.js     # Dashboard JavaScript
```

---

## 🐛 Common Issues & Solutions

### **Dashboard Not Loading**
- Run: `python manage.py migrate`
- Ensure student exists in admin panel
- Check console for errors

### **Static Files Not Loading**
- Run: `python manage.py collectstatic --noinput`
- Refresh browser (Ctrl+Shift+R)
- Check STATIC_URL in settings.py

### **Notifications Not Showing**
- Create notifications in admin panel
- Verify student_id is correct
- Check notification is_read flag

### **Templates Not Found**
- Verify `TEMPLATES` in settings.py
- Check directory structure
- Ensure app is in `INSTALLED_APPS`

---

## 📚 Database Models

### Student
```python
name, roll_number, email, phone, date_of_birth
admission_date, address, guardian_name, guardian_phone
profile_picture, class_name
```

### Attendance
```python
student, date, status (Present/Absent/Leave)
subject, remarks
```

### Homework
```python
student, subject, title, description
due_date, assigned_date, status, submission_date
marks (0-100), feedback
```

### Exam
```python
student, subject, exam_name, exam_type
date, duration_minutes, room_number, total_marks
obtained_marks, status (Scheduled/Completed/Cancelled)
```

### Grade
```python
student, subject, marks_obtained, total_marks, percentage
grade (A/B/C/D/F), term (Term 1/Term 2/Annual)
teacher_name, remarks
```

### TimeTable
```python
class_name, day, subject, teacher_name
start_time, end_time, room_number
```

### Notification
```python
student, title, message, notification_type
priority (High/Medium/Low), is_read, created_at
related_url
```

---

## 🚀 Next Steps

1. **Create More Students** - Go to admin panel and add more student records
2. **Add Real Data** - Replace sample data with actual school data
3. **Customize Styling** - Modify CSS to match your school's branding
4. **Set Up Authentication** - Implement user login system
5. **Deploy to Production** - Set up hosting with proper security

---

## 📖 Documentation

For detailed setup guide, see: [DASHBOARD_SETUP.md](DASHBOARD_SETUP.md)

For questions about Django: https://docs.djangoproject.com/

---

## 🎯 Features Coming Soon

- 🔐 Student login system
- 👨‍👩‍👧‍👦 Parent dashboard
- 📊 Advanced analytics
- 📱 Mobile app
- 🌙 Dark mode
- 📧 Email notifications
- 🎓 GPA calculation
- 📈 Performance reports

---

**Happy Learning! 🎉**
