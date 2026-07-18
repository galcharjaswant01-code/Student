import os
import re
app_dirs = ['assignments', 'attendance', 'courses', 'dashboard', 'messages', 'notifications', 'users']
for app in app_dirs:
    app_path = f'apps/{app}/apps.py'
    if os.path.exists(app_path):
        with open(app_path, 'r') as f:
            content = f.read()
        
        content = re.sub(r"name\s*=\s*['\"].*?['\"]", f"name = 'apps.{app}'", content)
        
        with open(app_path, 'w') as f:
            f.write(content)
