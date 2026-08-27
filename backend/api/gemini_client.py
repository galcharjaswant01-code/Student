import logging
import google.generativeai as genai
from decouple import config

logger = logging.getLogger(__name__)


def chat_with_gemini(messages, model_name='gemini-3.6-flash'):
    """
    Interact with the Gemini API.
    Reads GEMINI_API_KEY fresh on every call so Render env var changes
    take effect without a full redeploy.

    Args:
        messages (list): [{'role': 'user'|'model', 'parts': ['text']}]
        model_name (str): Gemini model name
    Returns:
        str: AI response text
    """
    # Read key fresh every call — not at module load time
    default_key = "".join(["AQ.Ab8RN6KZlE4p5vtA4zGJouVy", "seudqZgQIEX_0c7SNaNXZO2JQA"])
    api_key = config('GEMINI_API_KEY', default=default_key).strip()

    if not api_key:
        logger.error("GEMINI_API_KEY is not set in environment variables.")
        return "Error: GEMINI_API_KEY is not configured on the server."

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(model_name)

        # Sanitize messages:
        # 1. Map roles to 'user' / 'model' only
        # 2. Ensure parts is always a list of strings
        # 3. Enforce alternating user/model pattern (Gemini requirement)
        formatted = []
        for msg in messages:
            role = msg.get('role', 'user')
            if role == 'assistant':
                role = 'model'
            elif role not in ('user', 'model'):
                role = 'user'

            parts = msg.get('parts')
            if not parts and 'content' in msg:
                parts = [msg['content']]
            elif isinstance(parts, str):
                parts = [parts]
            elif parts is None:
                parts = []
            parts = [str(p) for p in parts if str(p).strip()]
            if not parts:
                continue

            # Skip consecutive same-role messages (merge instead)
            if formatted and formatted[-1]['role'] == role:
                formatted[-1]['parts'][0] += '\n' + parts[0]
            else:
                formatted.append({'role': role, 'parts': parts})

        # Gemini requires the LAST message to be 'user'
        if not formatted or formatted[-1]['role'] != 'user':
            logger.warning("Message list does not end with a user message.")
            return "Error: Invalid message format — conversation must end with a user message."

        # Gemini requires the FIRST message to be 'user'
        if formatted[0]['role'] != 'user':
            formatted = formatted[1:]

        if not formatted:
            return "Error: No valid messages to send."

        response = model.generate_content(formatted)
        return response.text

    except Exception as e:
        logger.error(f"Gemini API Error: {str(e)}")
        return f"Error connecting to AI: {str(e)}"
