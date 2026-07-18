import logging
import google.generativeai as genai
from decouple import config

logger = logging.getLogger(__name__)

# Initialize the Gemini client
api_key = config('GEMINI_API_KEY', default='')

if api_key:
    genai.configure(api_key=api_key)
else:
    logger.warning("GEMINI_API_KEY is not set in the environment variables.")

def chat_with_gemini(messages, model_name='gemini-3.5-flash'):
    """
    Interact with the Gemini API.
    
    Args:
        messages (list): A list of dictionaries with 'role' and 'parts'.
                         Example: [{'role': 'user', 'parts': ['Hello']}]
        model_name (str): The name of the Gemini model to use.
        
    Returns:
        str: The AI's response text.
    """
    if not api_key:
        return "Error: Gemini API Key is missing. Please configure it in the .env file."
        
    try:
        model = genai.GenerativeModel(model_name)
        
        # Ensure the roles are correctly mapped ('model' and 'user')
        formatted_messages = []
        for msg in messages:
            role = msg.get('role', 'user')
            parts = msg.get('parts', [''])
            
            # The python SDK expects "model" instead of "assistant"
            if role not in ['user', 'model']:
                role = 'model' if role == 'assistant' else 'user'
                
            # If parts is a string, wrap it in a list
            if isinstance(parts, str):
                parts = [parts]
                
            formatted_messages.append({'role': role, 'parts': parts})
            
        response = model.generate_content(formatted_messages)
        return response.text
    except Exception as e:
        logger.error(f"Gemini API Error: {str(e)}")
        return f"Error connecting to AI: {str(e)}"
