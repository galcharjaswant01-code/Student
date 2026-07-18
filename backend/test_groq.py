import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.base')
django.setup()

from apps.ai_studio.services import chat_with_ai

messages = [{"role": "user", "content": "Hello, what is 2+2?"}]
try:
    response = chat_with_ai(messages)
    print("SUCCESS")
    print(response)
except Exception as e:
    print("ERROR")
    print(e)
