import os
import sys
import django

sys.path.append('C:\\Study\\video 1\\Student_Managemanet_System\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from api.gemini_client import chat_with_gemini
from apps.ai_studio.services import chat_with_ai

messages = [{'role': 'user', 'parts': ['Hello']}]
print("Direct Client:", chat_with_gemini(messages, model_name='gemini-3.5-flash'))
print("Services Helper:", chat_with_ai([{'role': 'user', 'content': 'Hello'}]))
