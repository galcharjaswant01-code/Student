# Student Management System - Dashboard Setup Guide

## 📋 Overview

This Student Dashboard is a comprehensive frontend feature that displays personalized student information including:

- ✅ **Attendance** - Attendance status, percentage, and recent records
- 📚 **Homework** - Pending, submitted, and reviewed homework assignments
- 📝 **Upcoming Exams** - Exam schedules and countdown timers
- ⭐ **Grades & Performance** - Subject-wise grades and performance analytics
- 📅 **Timetable** - Weekly class schedule and today's classes
- 🔔 **Notifications** - Real-time notifications for important updates

---

## 🚀 Quick Start Guide

### 1. **Run Migrations**

First, create the database tables for all models:

```bash
python manage.py migrate
```

If this is your first time, you may need to create migrations:

```bash
python manage.py makemigrations school
python manage.py migrate
```

### 2. **Create a Superuser (Admin Account)**

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 3. **Create Sample Data**

Start the development server:

```bash
python manage.py runserver
```

Open your browser and go to: `http://localhost:8000/admin/`

Log in with your superuser credentials and add sample data:

1. **Create a Student**
   - Go to Students section
   - Click "Add Student"
   - Fill in required fields:
     - Name
     - Roll Number (unique)
     - Email
     - Class Name (e.g., "10A")
   - Save

2. **Add Attendance Records**
   - Go to Attendance section
   - Add multiple attendance records for the student
   - Include dates, status (Present/Absent/Leave), and subject

3. **Add Homework Assignments**
   - Go to Homework section
   - Create assignments with due dates
   - Set status to "Pending" for current assignments

4. **Add Exams**
   - Go to Exams section
   - Create exam entries with dates in the future
   - Set status to "Scheduled"

5. **Add Grades**
   - Go to Grades section
   - Add grade records with marks and percentages

6. **Add Timetable**
   - Go to TimeTable section
   - Add classes for each day and time slot
   - Make sure class_name matches the student's class

7. **Add Notifications**
   - Go to Notifications section
   - Create notifications for the student

### 4. **Access the Dashboard**

Navigate to: `http://localhost:8000/school/dashboard/`

Or with a specific student ID:
`http://localhost:8000/school/dashboard/1/`

---

## 📁 Project Structure

```
Home/
├── templates/
│   └── school/
│       ├── base.html                 # Base template with navigation
│       ├── student_dashboard.html    # Main dashboard template
│       └── no_student.html           # Error page
├── static/
│   ├── css/
│   │   └── style.css                 # Dashboard styling
│   └── js/
│       └── dashboard.js              # Dashboard functionality
├── school/
│   ├── models.py                     # Database models
│   ├── views.py                      # Dashboard views
│   ├── urls.py                       # URL routing
│   ├── admin.py                      # Admin configuration
│   └── migrations/                   # Database migrations
└── manage.py
```

---

## 🎨 Features

### Dashboard Sections

#### 1. **Attendance**
- Overall attendance percentage with progress bar
- Breakdown of Present/Absent/Leave counts
- Recent attendance records

#### 2. **Homework**
- Count of pending, submitted, and reviewed homework
- Warning for overdue assignments
- Upcoming assignments list with due dates

#### 3. **Exams**
- Number of upcoming and completed exams
- Exam countdown timer (days until exam)
- Exam details (date, time, duration, room number)
- Color-coded urgency indicators (red for exams within 7 days)

#### 4. **Grades & Performance**
- Overall average percentage
- Recent grades with letter grades
- Subject-wise performance tracking
- Grade distribution

#### 5. **Timetable**
- Today's classes highlighted
- Weekly schedule view
- Class details (subject, teacher, time, room)

#### 6. **Notifications**
- Unread notification badge
- Priority-based color coding
- Mark as read functionality
- Quick notification clearing

---

## 🔧 Configuration

### Settings (settings.py)

Templates and static files are already configured:

```python
TEMPLATES = [
    {
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
    },
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
```

### URL Configuration (urls.py)

Main URLs are configured in `Home/urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('school/', include('school.urls')),
]
```

---

## 📊 Database Models

### Student
- Name, Roll Number, Email, Phone
- Date of Birth, Admission Date
- Class Name, Address
- Guardian Information
- Profile Picture

### Attendance
- Student (ForeignKey)
- Date, Status (Present/Absent/Leave)
- Subject, Remarks

### Homework
- Student (ForeignKey)
- Subject, Title, Description
- Due Date, Assigned Date
- Status (Pending/Submitted/Reviewed)
- Submission Date, Marks, Feedback

### Exam
- Student (ForeignKey)
- Subject, Exam Name, Exam Type
- Date, Duration (minutes)
- Room Number, Total Marks, Obtained Marks
- Status (Scheduled/Completed/Cancelled)

### Grade
- Student (ForeignKey)
- Subject, Marks Obtained, Total Marks
- Percentage, Grade (A/B/C/D/F)
- Term (Term 1/Term 2/Annual)
- Teacher Name, Remarks

### TimeTable
- Class Name, Day of Week
- Subject, Teacher Name
- Start Time, End Time
- Room Number

### Notification
- Student (ForeignKey)
- Title, Message
- Notification Type (Homework/Exam/Grade/Attendance/General/Event)
- Priority (High/Medium/Low)
- Is Read Flag, Created At Timestamp
- Related URL (optional)

---

## 🎯 API Endpoints

### Dashboard
- **GET** `/school/dashboard/` - View student dashboard
- **GET** `/school/dashboard/<int:student_id>/` - View specific student dashboard

### Notifications
- **POST** `/school/notification/<int:notification_id>/read/` - Mark notification as read
- **POST** `/school/notifications/read-all/` - Mark all notifications as read

---

## 🔐 Authentication

Currently, the dashboard uses:
```python
@login_required
```

To enable login, implement a login view and URL. For testing without authentication, remove the decorator or create a test login flow.

---

## 🎨 Customization

### Colors
Edit the CSS variables in [static/css/style.css](static/css/style.css):

```css
:root {
    --primary: #667eea;
    --primary-dark: #764ba2;
    --success: #27ae60;
    --danger: #e74c3c;
    --warning: #f39c12;
}
```

### Layout
Modify the dashboard template in [templates/school/student_dashboard.html](templates/school/student_dashboard.html)

### Functionality
Add new features in [static/js/dashboard.js](static/js/dashboard.js)

---

## 🐛 Troubleshooting

### Dashboard not loading
1. Check if migrations are applied: `python manage.py migrate`
2. Verify student exists in database
3. Check browser console for JavaScript errors

### Static files not loading
1. Run: `python manage.py collectstatic --noinput`
2. Check STATIC_URL and STATICFILES_DIRS in settings.py
3. Restart development server

### Notifications not appearing
1. Verify notification records exist in database
2. Check if student_id is correct
3. Ensure Notification model is registered in admin.py

### Templates not found
1. Verify templates directory structure
2. Check TEMPLATES configuration in settings.py
3. Ensure app name is in INSTALLED_APPS

---

## 📚 Technologies Used

- **Backend**: Django 6.0.5
- **Frontend**: Bootstrap 5.3.0, HTML5, CSS3
- **Charts**: Chart.js 3.9.1
- **Icons**: Font Awesome 6.4.0
- **Database**: SQLite3

---

## 🚀 Production Deployment

Before deploying to production:

1. Set `DEBUG = False` in settings.py
2. Add allowed hosts: `ALLOWED_HOSTS = ['yourdomain.com']`
3. Set a strong SECRET_KEY
4. Use environment variables for sensitive data
5. Configure static files serving (nginx/Apache)
6. Set up HTTPS
7. Use a production database (PostgreSQL recommended)
8. Set up proper logging

---

## 📝 Future Enhancements

- User authentication system
- Parent/Guardian dashboard
- Performance analytics with charts
- Assignment submission upload
- Exam score analysis
- GPA calculation
- Email notifications
- Mobile app
- Dark mode toggle
- Search functionality
- Export reports (PDF/Excel)
- Real-time notifications with WebSockets
- Multi-language support

---

## 📞 Support

For issues or questions:
1. Check the Django documentation: https://docs.djangoproject.com/
2. Bootstrap documentation: https://getbootstrap.com/docs/
3. Chart.js documentation: https://www.chartjs.org/docs/latest/

---

## 📄 License

This project is part of the Student Management System.

---

**Last Updated**: May 18, 2026
**Version**: 1.0
