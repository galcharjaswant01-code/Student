import os
import sys
import django

sys.path.append('C:\\Study\\video 1\\Student_Managemanet_System\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

import google.generativeai as genai
from decouple import config

api_key = config('GEMINI_API_KEY')
genai.configure(api_key=api_key)

try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print("Error listing models:", e)
