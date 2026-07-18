import os
import sys
import django

sys.path.append('C:\\Study\\video 1\\Student_Managemanet_System\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from apps.ai_studio.services import chat_with_ai

messages = [{'role': 'user', 'parts': ['Hello!']}]
print("Testing chat_with_ai...")
try:
    response = chat_with_ai(messages)
    print("Response:", response)
except Exception as e:
    print("Exception:", str(e))
