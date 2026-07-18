# 📚 Student Management System - Dashboard Frontend

A comprehensive, responsive Student Dashboard built with Django and Bootstrap that displays personalized student information.

## ✨ Features

### 📊 **Attendance Dashboard**
- Real-time attendance percentage with visual progress bar
- Breakdown of Present/Absent/Leave counts
- Recent attendance history
- Subject-wise attendance tracking

### 📖 **Homework Management**
- Pending homework assignments with due dates
- Overdue homework alerts
- Submitted and reviewed assignments tracking
- Assignment status (Pending/Submitted/Reviewed)
- Teacher feedback and marks display

### 📝 **Exam Scheduler**
- Upcoming exams with countdown timer
- Exam details (date, time, duration, room, subject)
- Completed exams history
- Urgency indicators (red badge for exams within 7 days)
- Exam performance tracking

### ⭐ **Grades & Performance**
- Overall average percentage
- Subject-wise grade tracking
- Letter grades (A, B, C, D, F)
- Performance trends
- Term-wise grading

### 📅 **Class Timetable**
- Today's classes highlighted
- Weekly schedule view
- Teacher names and room assignments
- Class timings
- Quick access to daily routine

### 🔔 **Notifications**
- Priority-based notifications (High/Medium/Low)
- Unread notification count
- Mark as read functionality
- Notification types (Homework/Exam/Grade/Attendance/General/Event)
- Notification timestamp

### 🎨 **Responsive Design**
- Mobile-friendly layout
- Bootstrap 5.3.0 for responsive grid
- Smooth animations and transitions
- Dark mode ready
- Touch-friendly UI

---

## 📁 Project Structure

```
Student_Management_System/
├── Home/
│   ├── manage.py                           # Django management script
│   ├── db.sqlite3                          # SQLite database
│   ├── QUICKSTART.md                       # Quick start guide
│   ├── DASHBOARD_SETUP.md                  # Detailed setup guide
│   │
│   ├── Home/                               # Project settings
│   │   ├── settings.py                     # Django configuration
│   │   ├── urls.py                         # Main URL routing
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   └── __init__.py
│   │
│   ├── school/                             # Main app
│   │   ├── models.py                       # Database models
│   │   ├── views.py                        # Dashboard views
│   │   ├── urls.py                         # App URL routing
│   │   ├── admin.py                        # Admin configuration
│   │   ├── apps.py
│   │   ├── tests.py
│   │   ├── migrations/                     # Database migrations
│   │   └── management/
│   │       └── commands/
│   │           └── populate_data.py        # Sample data generator
│   │
│   ├── templates/                          # HTML templates
│   │   └── school/
│   │       ├── base.html                   # Base layout template
│   │       ├── student_dashboard.html      # Main dashboard
│   │       └── no_student.html             # Error page
│   │
│   └── static/                             # Static files
│       ├── css/
│       │   └── style.css                   # Dashboard styling
│       └── js/
│           └── dashboard.js                # Dashboard interactivity
│
└── env/                                    # Python virtual environment
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Django 6.0.5
- pip (Python package manager)

### Step 1: Activate Virtual Environment
```bash
cd "c:\Study\video 1\Student_Managemanet_System"
.\env\Scripts\Activate.ps1
```

### Step 2: Install Dependencies
```bash
cd Home
pip install django==6.0.5
```

### Step 3: Create Database Tables
```bash
python manage.py makemigrations school
python manage.py migrate
```

### Step 4: Create Admin Account
```bash
python manage.py createsuperuser
# Enter username, email, and password
```

### Step 5: Populate Sample Data (Optional)
```bash
python manage.py populate_data
```

### Step 6: Start Development Server
```bash
python manage.py runserver
```

### Step 7: Access the Application

**Dashboard**: `http://localhost:8000/school/dashboard/`
**Admin Panel**: `http://localhost:8000/admin/`

---

## 🗂️ Database Models

### Student Model
Stores comprehensive student information
```python
- name (CharField)
- roll_number (CharField, unique)
- email (EmailField, unique)
- phone (CharField)
- date_of_birth (DateField)
- admission_date (DateField, auto)
- address (TextField)
- guardian_name (CharField)
- guardian_phone (CharField)
- profile_picture (ImageField)
- class_name (CharField)
```

### Attendance Model
Tracks daily attendance records
```python
- student (ForeignKey → Student)
- date (DateField)
- status (CharField: Present/Absent/Leave)
- subject (CharField)
- remarks (TextField)
```

### Homework Model
Manages homework assignments
```python
- student (ForeignKey → Student)
- subject (CharField)
- title (CharField)
- description (TextField)
- due_date (DateTimeField)
- assigned_date (DateTimeField)
- status (CharField: Pending/Submitted/Reviewed)
- submission_date (DateTimeField)
- marks (IntegerField: 0-100)
- feedback (TextField)
```

### Exam Model
Schedules and tracks exams
```python
- student (ForeignKey → Student)
- subject (CharField)
- exam_name (CharField)
- exam_type (CharField: Unit Test/Mid-term/Final/Quiz)
- date (DateTimeField)
- duration_minutes (IntegerField)
- room_number (CharField)
- total_marks (IntegerField)
- obtained_marks (IntegerField)
- status (CharField: Scheduled/Completed/Cancelled)
```

### Grade Model
Records student grades
```python
- student (ForeignKey → Student)
- subject (CharField)
- marks_obtained (FloatField)
- total_marks (FloatField)
- percentage (FloatField)
- grade (CharField: A/B/C/D/F)
- term (CharField: Term 1/Term 2/Annual)
- date (DateField)
- teacher_name (CharField)
- remarks (TextField)
```

### TimeTable Model
Manages class schedule
```python
- class_name (CharField)
- day (CharField: Monday-Saturday)
- subject (CharField)
- teacher_name (CharField)
- start_time (TimeField)
- end_time (TimeField)
- room_number (CharField)
```

### Notification Model
Sends notifications to students
```python
- student (ForeignKey → Student)
- title (CharField)
- message (TextField)
- notification_type (CharField)
- priority (CharField: High/Medium/Low)
- is_read (BooleanField)
- created_at (DateTimeField)
- related_url (CharField)
```

---

## 🔌 API Endpoints

### Dashboard View
```
GET /school/dashboard/
- View personalized student dashboard
- Shows all dashboard sections for the default student
- Returns: student_dashboard.html with context data
```

### Student-Specific Dashboard
```
GET /school/dashboard/<student_id>/
- View dashboard for specific student
- Parameters: student_id (integer)
- Returns: student_dashboard.html with student data
```

### Mark Notification as Read
```
POST /school/notification/<notification_id>/read/
- Mark single notification as read
- Parameters: notification_id (integer)
- Returns: 200 OK
```

### Mark All Notifications as Read
```
POST /school/notifications/read-all/
- Mark all notifications as read for current student
- Returns: 200 OK
```

---

## 🎨 UI Components

### Dashboard Sections

#### Stat Cards
```html
<div class="stat-card">
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
    <div class="attendance-progress">
        <div class="attendance-progress-bar"></div>
    </div>
</div>
```

#### Notification Items
```html
<div class="notification-item unread">
    <strong>{{ notification.title }}</strong>
    <span class="notification-badge badge-{{ priority|lower }}">
        {{ priority }}
    </span>
    <p>{{ notification.message }}</p>
    <div>📅 {{ notification.created_at|date:"M d, H:i" }}</div>
</div>
```

#### Homework Items
```html
<div class="homework-item overdue">
    <strong>{{ homework.title }}</strong>
    <span class="badge bg-info">{{ homework.status }}</span>
    <div>📅 Due: {{ homework.due_date|date:"M d, Y H:i" }}</div>
</div>
```

#### Exam Items
```html
<div class="exam-item">
    <h6>{{ exam.exam_name }}</h6>
    <div>📚 {{ exam.subject }}</div>
    <span class="exam-days-badge">{{ exam.days_until_exam }} days</span>
    <div>🕐 {{ exam.date|date:"M d, Y H:i" }}</div>
</div>
```

---

## 🎨 Styling & Colors

### Color Scheme
```css
--primary: #667eea              /* Main brand color - Purple */
--primary-dark: #764ba2         /* Dark purple for accents */
--success: #27ae60              /* Green for positive states */
--danger: #e74c3c               /* Red for alerts */
--warning: #f39c12              /* Yellow for warnings */
--info: #3498db                 /* Blue for information */
--light: #f8f9fa                /* Light gray background */
--dark: #2c3e50                 /* Dark text */
```

### Key Styles
- **Stat Cards**: Hover lift effect, shadow on hover
- **Progress Bars**: Gradient from primary to primary-dark
- **Badges**: Rounded with appropriate colors
- **Buttons**: Primary buttons with gradient and hover effects
- **Cards**: White background with subtle shadows
- **Alerts**: Left border with color-coded information

---

## 💻 Technologies Used

- **Backend**: Django 6.0.5
- **Frontend**: HTML5, CSS3, Bootstrap 5.3.0
- **Charts**: Chart.js 3.9.1
- **Icons**: Font Awesome 6.4.0
- **Database**: SQLite3
- **Server**: Django Development Server (or Apache/Nginx for production)

---

## 🔐 Security Features

- CSRF protection with Django middleware
- SQL injection prevention through ORM
- XSS protection with template escaping
- User authentication ready (decorator placed)
- Input validation on models
- Safe JSON encoding for AJAX responses

---

## 📱 Responsive Design

### Breakpoints
- **Large screens** (992px+): Full layout with sidebar
- **Tablets** (768px-991px): Adjusted grid layout
- **Mobile** (< 768px): Single column, full width components

### Mobile Features
- Touch-friendly buttons (44px+ tap targets)
- Optimized navigation
- Flexible grid system
- Readable font sizes
- Proper spacing on small screens

---

## 🔧 Customization Guide

### Change Dashboard Colors
1. Edit `static/css/style.css`
2. Modify CSS variables under `:root`
3. Refresh browser

### Add New Dashboard Section
1. Create model in `school/models.py`
2. Add view logic in `school/views.py`
3. Pass data in context dictionary
4. Update `templates/school/student_dashboard.html`

### Modify Dashboard Layout
1. Edit `templates/school/student_dashboard.html`
2. Change Bootstrap grid classes
3. Adjust column widths and arrangements

### Add Dashboard Functionality
1. Add JavaScript functions in `static/js/dashboard.js`
2. Add AJAX endpoints in `school/views.py`
3. Create corresponding URL routes in `school/urls.py`

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Dashboard not loading | Run `python manage.py migrate` |
| Static files not loading | Run `python manage.py collectstatic` |
| Templates not found | Check `TEMPLATES` in settings.py |
| No student data | Run `python manage.py populate_data` |
| Notifications not showing | Verify notifications exist in admin |
| Page styling broken | Clear browser cache (Ctrl+Shift+R) |

---

## 📚 Documentation Files

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[DASHBOARD_SETUP.md](DASHBOARD_SETUP.md)** - Comprehensive setup documentation
- **[README.md](README.md)** - This file

---

## 🚀 Production Deployment

### Before Deploying
1. Set `DEBUG = False` in settings.py
2. Configure `ALLOWED_HOSTS`
3. Set a strong `SECRET_KEY`
4. Use environment variables for sensitive data
5. Configure static file serving (nginx/Apache)
6. Set up HTTPS/SSL
7. Use production database (PostgreSQL recommended)
8. Enable security headers

### Deployment Checklist
- [ ] Run tests
- [ ] Update requirements.txt
- [ ] Collect static files
- [ ] Configure database
- [ ] Set up error logging
- [ ] Configure backups
- [ ] Set up monitoring
- [ ] Test all features

---

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Parent/Guardian dashboard
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native/Flutter)
- [ ] API for third-party integrations
- [ ] Performance analytics
- [ ] Study material upload
- [ ] Online assignment submission

---

## 📄 License

This project is part of the Student Management System.

---

## 👥 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

---

## 📞 Support & Contact

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review documentation files
3. Check Django documentation: https://docs.djangoproject.com/
4. Bootstrap documentation: https://getbootstrap.com/docs/

---

## 📝 Version History

### Version 1.0 (May 18, 2026)
- Initial dashboard implementation
- Attendance tracking
- Homework management
- Exam scheduler
- Grades & performance
- Timetable view
- Notifications system
- Responsive design
- Admin panel configuration

---

**Built with ❤️ for better student management**

Last Updated: May 18, 2026
