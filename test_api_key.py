import requests

api_key = "sk_5d944fd4de1706212ecea27b9c1239963529b8bfa641689f8e52b3d87d5616f8"

# Test OpenAI
print("Testing OpenAI...")
resp = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "hi"}]}
)
print("OpenAI Status:", resp.status_code)
if resp.status_code != 200:
    print(resp.text)

# Test DeepSeek
print("\nTesting DeepSeek...")
resp = requests.post(
    "https://api.deepseek.com/chat/completions",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "hi"}]}
)
print("DeepSeek Status:", resp.status_code)
if resp.status_code != 200:
    print(resp.text)

# Test Groq
print("\nTesting Groq...")
resp = requests.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"model": "llama3-8b-8192", "messages": [{"role": "user", "content": "hi"}]}
)
print("Groq Status:", resp.status_code)
if resp.status_code != 200:
    print(resp.text)

