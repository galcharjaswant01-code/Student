"""
AI Chatbot - Simple rule-based response engine for student queries.
Provides answers to FAQs, coding concept explanations, and study recommendations.
"""

import random
import re

# FAQ responses - organized by topic
FAQ_RESPONSES = {
    # ===== DJANGO QUESTIONS =====
    r'\bwhat\s+is\s+django\b': (
        "Django is a high-level Python web framework that enables rapid development "
        "of secure and maintainable websites. It follows the Model-View-Template (MVT) "
        "architecture pattern and includes built-in features like ORM, authentication, "
        "admin panel, and more."
    ),
    r'\bwhat\s+is\s+a\s+(model|view|template)\b': (
        "In Django's MVT architecture:\n\n"
        "• **Model** - Defines the data structure (database tables). It's a Python class that maps to a database table.\n"
        "• **View** - Handles the business logic. It receives HTTP requests and returns HTTP responses.\n"
        "• **Template** - Handles the presentation layer. It's an HTML file with Django template language for dynamic content."
    ),
    r'\bhow\s+to\s+(create|make)\s+a\s+model\b': (
        "To create a Django model:\n\n"
        "1. Open `models.py` in your app folder\n"
        "2. Define a class that inherits from `models.Model`\n"
        "3. Add fields like `CharField`, `IntegerField`, `DateTimeField`, etc.\n"
        "4. Run `python manage.py makemigrations`\n"
        "5. Run `python manage.py migrate`\n\n"
        "Example:\n"
        "```python\n"
        "class Student(models.Model):\n"
        "    name = models.CharField(max_length=100)\n"
        "    roll_number = models.IntegerField(unique=True)\n"
        "    email = models.EmailField()\n"
        "```"
    ),
    r'\b(django.*urls?|urls?.*django)\b': (
        "Django URL patterns map URLs to views. Defined in `urls.py`:\n\n"
        "```python\n"
        "from django.urls import path\n"
        "from . import views\n\n"
        "urlpatterns = [\n"
        "    path('', views.index, name='index'),\n"
        "    path('about/', views.about, name='about'),\n"
        "]\n"
        "```\n\n"
        "Use `name` parameter for reverse URL lookups in templates and views."
    ),
    r'\b(django.*admin|admin.*django)\b': (
        "Django admin panel is a built-in feature for managing data:\n\n"
        "1. Create a superuser: `python manage.py createsuperuser`\n"
        "2. Register models in `admin.py`:\n"
        "```python\n"
        "from django.contrib import admin\n"
        "from .models import Student\n"
        "admin.site.register(Student)\n"
        "```\n"
        "3. Access at `/admin/`"
    ),
    r'\bwhat\s+is\s+(django.*orm|orm)\b': (
        "Django ORM (Object-Relational Mapping) lets you interact with databases "
        "using Python instead of raw SQL. Examples:\n\n"
        "```python\n"
        "# Get all students\n"
        "students = Student.objects.all()\n\n"
        "# Filter records\n"
        "present = Attendance.objects.filter(status='Present')\n\n"
        "# Create new record\n"
        "Student.objects.create(name='Raj', roll_number='001')\n"
        "```\n\n"
        "It supports all major databases: SQLite, PostgreSQL, MySQL, Oracle."
    ),

    # ===== PYTHON QUESTIONS =====
    r'\bwhat\s+is\s+python\b|\babout\s+python\b|\bpython\s+(language|programming)\b': (
        "Python is a high-level, interpreted programming language known for its "
        "readability and simplicity. It's widely used for web development, data science, "
        "AI/ML, automation, and more.\n\n"
        "**Key Features:**\n"
        "• Easy-to-read syntax with indentation\n"
        "• Dynamic typing - no need to declare variable types\n"
        "• Extensive standard library ('batteries included')\n"
        "• Cross-platform (Windows, Mac, Linux)\n"
        "• Large community support\n\n"
        "**Popular uses:** Web (Django, Flask), Data Science (Pandas, NumPy), AI/ML, Automation."
    ),
    r'\bpython\s*vs?\s*(java|c\+\+|javascript)\b|\b(compare|difference).*python\b': (
        "Python is often compared to other languages:\n\n"
        "**vs Java:** Python is more concise, dynamically typed, and easier to learn. Java is faster, statically typed, and used for enterprise apps.\n\n"
        "**vs C++:** Python is simpler with automatic memory management. C++ offers more control and better performance for systems programming.\n\n"
        "**vs JavaScript:** Python is used for backend, data science, AI. JavaScript is for frontend web and Node.js backend.\n\n"
        "For beginners, Python is the best starting point!"
    ),
    r'\bpython\s+(list|tuple|set|dictionary)\b|\b(data\s*types)\b': (
        "Python has several built-in data types:\n\n"
        "• **Lists** `[1, 2, 3]` - Ordered, mutable, allows duplicates\n"
        "• **Tuples** `(1, 2, 3)` - Ordered, immutable, allows duplicates\n"
        "• **Sets** `{1, 2, 3}` - Unordered, mutable, no duplicates\n"
        "• **Dictionaries** `{'key': 'value'}` - Key-value pairs, unordered, mutable\n\n"
        "```python\n"
        "fruits = ['apple', 'banana', 'cherry']  # list\n"
        "person = {'name': 'Raj', 'age': 15}      # dict\n"
        "```"
    ),
    r'\bwhat\s+is\s+oop\b|\bobject\s*oriented\b': (
        "OOP (Object-Oriented Programming) is a programming paradigm that organizes "
        "code around objects rather than functions. Key concepts:\n\n"
        "• **Classes** - Blueprints for creating objects\n"
        "• **Objects** - Instances of classes\n"
        "• **Inheritance** - One class inherits properties from another\n"
        "• **Polymorphism** - Same interface for different data types\n"
        "• **Encapsulation** - Bundling data and methods together\n"
        "• **Abstraction** - Hiding complex implementation details\n\n"
        "```python\n"
        "class Student:\n"
        "    def __init__(self, name):\n"
        "        self.name = name\n"
        "    def study(self):\n"
        "        print(f'{self.name} is studying')\n"
        "```"
    ),
    r'\bwhat\s+is\s+(sql|database)\b': (
        "A database is an organized collection of data stored electronically. "
        "SQL (Structured Query Language) is used to communicate with relational databases.\n\n"
        "**Common databases:** MySQL, PostgreSQL, SQLite, Oracle\n\n"
        "**Basic SQL commands:**\n"
        "```sql\n"
        "SELECT * FROM students;\n"
        "INSERT INTO students (name, age) VALUES ('Raj', 15);\n"
        "UPDATE students SET age = 16 WHERE name = 'Raj';\n"
        "DELETE FROM students WHERE name = 'Raj';\n"
        "```\n\n"
        "Django's ORM allows you to do all this with Python instead of SQL."
    ),
    r'\bhow\s+to\s+(learn|study)\s+(python|programming|code)\b': (
        "Here's a study plan for learning programming:\n\n"
        "1. **Start with basics** - Variables, loops, conditionals, functions\n"
        "2. **Build small projects** - Calculator, to-do app, quiz game\n"
        "3. **Learn data structures** - Lists, dictionaries, sets, tuples\n"
        "4. **Practice daily** - Consistency is key (at least 30 min/day)\n"
        "5. **Use online resources** - freeCodeCamp, CodeWithHarry, CS50\n"
        "6. **Join coding communities** - Stack Overflow, GitHub, Discord\n"
        "7. **Build a portfolio project** - Apply what you've learned\n\n"
        "Recommended: Start with Python basics (1 month), then pick web dev or data science."
    ),
    r'\bwhat\s+is\s+(rest\s*api|api)\b': (
        "An API (Application Programming Interface) allows different software applications "
        "to communicate. REST API is a popular architectural style for web APIs that uses "
        "HTTP methods:\n\n"
        "• **GET** - Retrieve data\n"
        "• **POST** - Create new data\n"
        "• **PUT/PATCH** - Update existing data\n"
        "• **DELETE** - Remove data\n\n"
        "Django REST Framework (DRF) makes building APIs in Django easy."
    ),
    r'\bhow\s+to\s+debug\b|\bfix\s+error\b|\berror\s+message\b': (
        "Debugging tips for Python/Django:\n\n"
        "1. **Read the traceback** - It shows exact line where error occurs\n"
        "2. **Print statements** - Use `print()` to check variable values\n"
        "3. **Python debugger** - Use `import pdb; pdb.set_trace()`\n"
        "4. **Django debug toolbar** - Install django-debug-toolbar\n"
        "5. **Check terminal output** - Error messages show in the running server\n"
        "6. **Use IDE features** - VS Code has an excellent debugger\n"
        "7. **Google the error** - Someone likely had the same issue on Stack Overflow"
    ),
    r'\bwhat\s+(is|are)\s+(data\s*structures|algorithm)\b|\bdsa\b': (
        "**Data Structures** organize and store data:\n"
        "• Arrays/Lists, Stacks, Queues, Trees, Graphs, Hash Tables\n\n"
        "**Algorithms** solve problems step-by-step:\n"
        "• Sorting (Bubble, Quick, Merge), Searching (Binary, Linear)\n"
        "• Graph algorithms (BFS, DFS), Dynamic Programming\n\n"
        "**Recommended channels:** Apna College (Java + DSA), CS50 (Harvard)\n\n"
        "Practice on: LeetCode, HackerRank, CodeChef, GeeksforGeeks"
    ),
    r'\bhow\s+to\s+use\s+git\b|\bgit\s+commands?\b|\bversion\s+control\b': (
        "Essential Git commands:\n\n"
        "```bash\n"
        "git init              # Initialize a repository\n"
        "git add .             # Stage all changes\n"
        "git commit -m 'msg'   # Commit changes\n"
        "git push              # Push to remote\n"
        "git pull              # Pull latest changes\n"
        "git branch            # List branches\n"
        "git checkout -b new   # Create and switch to new branch\n"
        "git merge branch      # Merge a branch\n"
        "```\n\n"
        "**GitHub, GitLab, Bitbucket** are popular platforms for hosting Git repositories."
    ),
    r'\b(recommend|suggestion|study|resource|channel)\b.*\b(cs|computer\s*science|programming)\b|\bbest\s+channel\b': (
        "🎯 **Recommended Resources for Computer Science:**\n\n"
        "1. **freeCodeCamp.org** - Full programming courses (free)\n"
        "2. **CodeWithHarry** - Python, Django (Hindi/English)\n"
        "3. **Apna College** - Java & DSA (structured courses)\n"
        "4. **Programming with Mosh** - Web & Python (high quality)\n"
        "5. **CS50 (Harvard)** - Computer Science fundamentals\n\n"
        "Start with CS50 for fundamentals, then pick a language and build projects!"
    ),
    r'\bhello\b|\bhi\b|\bhey\b|\bgood\s+morn(ing|ing)\b|\bgood\s+evening\b': (
        "Hello! 👋 I'm the AI Study Assistant. I can help you with:\n\n"
        "🐍 **Python** - Basics, OOP, data types, libraries\n"
        "🌐 **Django** - Models, views, templates, URLs, ORM\n"
        "📚 **Study Tips** - How to learn programming effectively\n"
        "🔧 **Debugging** - Fix common errors and issues\n\n"
        "Try asking: 'What is Django?', 'Python vs Java', 'How to debug?'"
    ),
    r'\bhelp\b|\bwhat\s+can\s+you\s+do\b|\bcommands?\b': (
        "🤖 **AI Assistant Help**\n\n"
        "You can ask me about:\n\n"
        "💻 **Django** - 'What is Django?', 'Django ORM', 'How to create models?'\n"
        "🐍 **Python** - 'What is Python?', 'Python lists vs tuples', 'OOP concepts'\n"
        "📖 **Study Tips** - 'How to learn programming?', 'Best resources for CS'\n"
        "🔧 **Debugging** - 'How to fix errors?', 'Debugging tips'\n"
        "🧮 **DSA** - 'What are data structures?', 'DSA resources'\n"
        "🔄 **Git** - 'Git commands', 'How to use GitHub?'\n\n"
        "Just type your question naturally!"
    ),
    r'\bthanks?\b|\bthank\s+you\b|\bty\b|\bthx\b': (
        "You're welcome! 😊 Keep learning and coding! If you have more questions, "
        "I'm here to help. Remember: every expert was once a beginner. 🚀"
    ),
    r'\bbye\b|\bgoodbye\b|\bsee\s+you\b': (
        "Goodbye! 👋 Keep practicing and you'll master programming in no time! "
        "Come back anytime you need help. Happy coding! 🚀"
    ),
    r'\bwhat\s+you\s+name\b|\byour\s+name\b': (
        "I'm the **AI Study Assistant** 🤖, your personal learning companion! "
        "I'm here to help you with programming concepts, Django, Python, and study tips. "
        "What would you like to learn today?"
    ),
    r'\b(homework|assignment)\s*(help|due|overdue)\b': (
        "For homework and assignments, check the **Assignments** page from the navigation menu! "
        "You can view upcoming, overdue, and completed assignments there. "
        "If you're stuck on a programming concept, just ask me and I'll explain it! 🚀"
    ),
    r'\b(exam|test|quiz)\s*(prep|tips|study|prepare)\b': (
        "**Exam Preparation Tips:**\n\n"
        "1. **Review class notes** - Focus on key concepts and formulas\n"
        "2. **Practice problems** - Solve previous year question papers\n"
        "3. **Create summaries** - Write short notes for quick revision\n"
        "4. **Study in groups** - Discuss and explain concepts to peers\n"
        "5. **Take breaks** - Study for 45 min, break for 15 min\n"
        "6. **Use resources** - Check the Learning Resources page for study materials\n\n"
        "Good luck! 🍀"
    ),
}

# Default response when no pattern matches
DEFAULT_RESPONSES = [
    "That's a great question! I'm still learning too. Could you try rephrasing it?\n\n"
    "You can ask me about:\n"
    "• **Django** - 'What is Django?', 'How to create models?'\n"
    "• **Python** - 'Explain lists vs tuples', 'What is OOP?'\n"
    "• **Study tips** - 'How to learn programming?'\n"
    "• **Resources** - 'Best YouTube channels for CS'",
    
    "I'm not sure I understand. Try one of these:\n\n"
    "💻 'What is Django?'\n"
    "🐍 'Python vs Java'\n"
    "📚 'How to learn Python?'\n"
    "🔧 'How to debug my code?'\n"
    "🎯 'Best resources for CS'",
    
    "Here are some things I can help with:\n\n"
    "• 'What is Django?'\n"
    "• 'How to learn Python?'\n"
    "• 'Explain OOP concepts'\n"
    "• 'Study resources for CS'\n"
    "• 'How to debug my code?'\n"
    "• 'Django ORM explained'",
    
    "I'd love to help! I can answer questions about:\n\n"
    "✅ Python & Django\n"
    "✅ Data Structures & Algorithms\n"
    "✅ Study plans & resources\n"
    "✅ Web development concepts\n"
    "✅ Debugging & best practices\n\n"
    "Type your question and I'll help! 🚀",
]


def get_bot_response(user_message: str) -> str:
    """
    Get AI response based on user message.
    Uses pattern matching to find the most relevant response.
    """
    user_message = user_message.lower().strip()
    
    # Check for exact keyword matches first for better accuracy
    keyword_responses = {
        'django': r'\bwhat\s+is\s+django\b',
        'python': r'\bwhat\s+is\s+python\b|\babout\s+python\b|\bpython\s+(language|programming)\b',
        'oop': r'\bwhat\s+is\s+oop\b|\bobject\s*oriented\b',
        'api': r'\bwhat\s+is\s+(rest\s*api|api)\b',
        'git': r'\bhow\s+to\s+use\s+git\b|\bgit\s+commands?\b|\bversion\s+control\b',
        'database': r'\bwhat\s+is\s+(sql|database)\b',
        'debug': r'\bhow\s+to\s+debug\b|\bfix\s+error\b|\berror\s+message\b',
        'dsa': r'\bwhat\s+(is|are)\s+(data\s*structures|algorithm)\b|\bdsa\b',
        'resource': r'\b(recommend|suggestion|study|resource|channel)\b',
        'help': r'\bhelp\b|\bwhat\s+can\s+you\s+do\b',
        'hello': r'\bhello\b|\bhi\b|\bhey\b',
        'bye': r'\bbye\b|\bgoodbye\b|\bsee\s+you\b',
        'thanks': r'\bthanks?\b|\bthank\s+you\b|\bty\b|\bthx\b',
        'name': r'\bwhat\s+you\s+name\b|\byour\s+name\b',
        'exam': r'\b(exam|test|quiz)\s*(prep|tips|study|prepare)\b',
    }
    
    # First pass: check all patterns in FAQ_RESPONSES
    for pattern, response in FAQ_RESPONSES.items():
        if re.search(pattern, user_message, re.IGNORECASE):
            return response
    
    # Second pass: handle "tell me about X" patterns
    if re.search(r'(tell|about|explain|what\s+is)\s+(me\s+)?(about\s+)?django', user_message, re.IGNORECASE):
        return FAQ_RESPONSES[r'\bwhat\s+is\s+django\b']
    
    if re.search(r'(tell|about|explain|what\s+is)\s+(me\s+)?(about\s+)?python', user_message, re.IGNORECASE):
        return FAQ_RESPONSES[r'\bwhat\s+is\s+python\b|\babout\s+python\b|\bpython\s+(language|programming)\b']
    
    # Check if user is asking about Django-related topics specifically
    if re.search(r'django', user_message, re.IGNORECASE):
        if re.search(r'url', user_message, re.IGNORECASE):
            return FAQ_RESPONSES[r'\b(django.*urls?|urls?.*django)\b']
        if re.search(r'admin', user_message, re.IGNORECASE):
            return FAQ_RESPONSES[r'\b(django.*admin|admin.*django)\b']
        if re.search(r'orm|model|database', user_message, re.IGNORECASE):
            return FAQ_RESPONSES[r'\bwhat\s+is\s+(django.*orm|orm)\b']
        return FAQ_RESPONSES[r'\bwhat\s+is\s+django\b']
    
    # Check for Python-related topics
    if re.search(r'python', user_message, re.IGNORECASE):
        if re.search(r'(list|tuple|set|dictionary|data\s*type)', user_message, re.IGNORECASE):
            return FAQ_RESPONSES[r'\bpython\s+(list|tuple|set|dictionary)\b|\b(data\s*types)\b']
        if re.search(r'(vs|compare|difference|java|c\+\+|javascript)', user_message, re.IGNORECASE):
            return FAQ_RESPONSES[r'\bpython\s*vs?\s*(java|c\+\+|javascript)\b|\b(compare|difference).*python\b']
        return FAQ_RESPONSES[r'\bwhat\s+is\s+python\b|\babout\s+python\b|\bpython\s+(language|programming)\b']
    
    # Return a random default response
    return random.choice(DEFAULT_RESPONSES)