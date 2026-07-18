import os
import sys
import django

sys.path.append('C:\\Study\\video 1\\Student_Managemanet_System\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.dev')
django.setup()

from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()
user, created = User.objects.get_or_create(username='testai2', email='testai2@example.com')
if created:
    user.set_password('testpassword2')
    user.is_active = True
    user.save()
else:
    user.set_password('testpassword2')
    user.save()

client = Client(SERVER_NAME='localhost')

# 1. Login to get token
login_res = client.post('/api/v1/auth/login/', {'username': 'testai2', 'password': 'testpassword2'}, content_type='application/json')
print("Login:", login_res.status_code, login_res.content)
if login_res.status_code == 200:
    token = login_res.json().get('tokens', {}).get('access')
    headers = {'HTTP_AUTHORIZATION': f'Bearer {token}'}
    
    # 2. Create conversation
    res = client.post('/api/v1/ai-studio/conversations/', {'title': 'Test Chat'}, content_type='application/json', **headers)
    print("Create Conv:", res.status_code, res.content)
    
    if res.status_code == 201:
        conv_id = res.json()['id']
        # 3. Send chat message
        res2 = client.post(f'/api/v1/ai-studio/conversations/{conv_id}/chat/', {'message': 'Hello Gemini!'}, content_type='application/json', **headers)
        print("Chat Resp:", res2.status_code, res2.content)
