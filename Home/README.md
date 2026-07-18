# Student Management System

A comprehensive Django-based Student Management System with modern UI, authentication, and advanced features.

## Features

### Core Features
- **Student Dashboard** - Personalized dashboard with attendance, homework, exams, grades, and timetable
- **Online Assignment Submission** - Upload, submit, and receive feedback on assignments
- **Learning Resources** - Access notes, PDFs, videos, presentations, and coding files
- **Authentication System** - Secure login, registration, and profile management

### Advanced Features
- **Futuristic 3D Hero Section** - Modern glassmorphism design with animations
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Real-time Notifications** - Stay updated with important announcements
- **Performance Analytics** - Track student progress with detailed insights

## Tech Stack

- **Backend**: Django 6.0+
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Database**: SQLite (development), PostgreSQL (production)
- **Styling**: Custom CSS with glassmorphism and 3D effects

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Student_Managemanet_System/Home
```

2. Create a virtual environment:
```bash
python -m venv env
```

3. Activate the virtual environment:
```bash
# Windows
env\Scripts\activate

# Linux/Mac
source env/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

8. Access the application:
- Landing Page: http://127.0.0.1:8000/
- Admin Panel: http://127.0.0.1:8000/admin/
- Login: http://127.0.0.1:8000/school/login/
- Register: http://127.0.0.1:8000/school/register/

## Project Structure

```
Home/
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
├── README.md                # This file
│
├── Home/                    # Main project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── school/                  # Main application
│   ├── migrations/
│   ├── templates/
│   ├── static/
│   ├── admin.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── apps.py
│
├── templates/               # Global templates
│   └── school/
│       ├── base.html
│       ├── landing.html
│       ├── login.html
│       ├── register.html
│       ├── profile.html
│       └── ...
│
├── static/                  # CSS, JS, Images
│   ├── css/
│   │   ├── style.css
│   │   └── hero.css
│   └── js/
│       └── dashboard.js
│
└── media/                   # User uploaded files
```

## Default Credentials

For testing purposes:
- **Username**: admin
- **Password**: admin123

## Color Scheme

The application uses a modern color palette:
- **Primary Blue**: #2196F3
- **Primary Yellow**: #FFC107
- **Primary Orange**: #FF9800
- **Primary White**: #FFFFFF
- **Neon Cyan**: #00E5FF

## API Endpoints

The system provides REST API endpoints for:
- User authentication
- Student data
- Attendance records
- Assignments and submissions
- Learning resources

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.