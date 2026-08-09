from decouple import config

def get_gemini_api_key() -> str:
    """Returns the Gemini API key securely from the environment."""
    return config('GEMINI_API_KEY', default='')

def get_openai_api_key() -> str:
    """Returns the OpenAI API key securely from the environment."""
    return config('OPENAI_API_KEY', default='')

def get_ollama_url() -> str:
    """Returns the local Ollama API URL."""
    return config('OLLAMA_API_URL', default='http://localhost:11434')
