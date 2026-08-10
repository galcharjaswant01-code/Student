import logging
from decouple import config
from groq import Groq

logger = logging.getLogger(__name__)


def chat_with_groq(messages, model_name='llama-3.3-70b-versatile'):
    """
    Interact with Groq API.
    Reads GROQ_API_KEY fresh on every call.
    """
    api_key = config('GROQ_API_KEY', default='').strip()

    if not api_key:
        logger.error("GROQ_API_KEY is not set in environment variables.")
        return "Error: GROQ_API_KEY is not configured on the server."

    try:
        client = Groq(api_key=api_key)

        formatted_messages = []
        for msg in messages:
            role = msg.get('role', 'user')
            if role in ('model', 'assistant'):
                role = 'assistant'
            else:
                role = 'user'

            # Extract content from 'content' or Gemini's 'parts' format
            content = msg.get('content', '')
            if not content and 'parts' in msg:
                parts = msg['parts']
                if isinstance(parts, list):
                    content = '\n'.join(str(p) for p in parts if str(p).strip())
                else:
                    content = str(parts)

            content = content.strip()
            if content:
                formatted_messages.append({'role': role, 'content': content})

        if not formatted_messages:
            return "Error: No valid messages to send."

        completion = client.chat.completions.create(
            model=model_name,
            messages=formatted_messages,
            temperature=0.7,
            max_tokens=2048,
        )

        return completion.choices[0].message.content

    except Exception as e:
        logger.error(f"Groq API Error: {str(e)}")
        return f"Error connecting to Groq AI: {str(e)}"
