import logging
import requests
from decouple import config

logger = logging.getLogger(__name__)

api_key = config('OPENAI_API_KEY', default='')

if not api_key:
    logger.warning("OPENAI_API_KEY is not set in the environment variables.")

def chat_with_openai(messages, model_name='gpt-4-turbo'):
    """
    Interact with the OpenAI API.
    
    Args:
        messages (list): A list of dictionaries with 'role' and 'parts'.
                         Example: [{'role': 'user', 'parts': ['Hello']}]
        model_name (str): The name of the OpenAI model to use.
        
    Returns:
        str: The AI's response text.
    """
    if not api_key:
        return "Error: OpenAI API Key is missing. Please configure it in the .env file."
        
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    formatted_messages = []
    for msg in messages:
        # Convert roles from gemini format to openai if necessary
        role = msg.get('role', 'user')
        if role == 'model':
            role = 'assistant'
            
        parts = msg.get('parts', [''])
        content = parts[0] if isinstance(parts, list) and len(parts) > 0 else str(parts)
            
        formatted_messages.append({"role": role, "content": content})
        
    data = {
        "model": model_name,
        "messages": formatted_messages
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except requests.exceptions.HTTPError as e:
        logger.error(f"OpenAI API Error: {response.text}")
        return f"Error connecting to AI: {response.status_code} - {response.text}"
    except Exception as e:
        logger.error(f"OpenAI API Error: {str(e)}")
        return f"Error connecting to AI: {str(e)}"
