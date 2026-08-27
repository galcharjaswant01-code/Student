from .api_keys import get_gemini_api_key, get_openai_api_key, get_ollama_url

class AIConfig:
    """Centralized configuration for AI Services."""
    
    # Provider Settings
    DEFAULT_PROVIDER = 'gemini'
    
    # Models mapping
    MODELS = {
        'gemini': 'gemini-3.6-flash',
        'openai': 'gpt-4o-mini',
        'ollama': 'llama3'
    }

    @classmethod
    def get_provider_credentials(cls, provider: str) -> str:
        """Returns the necessary credential/URL for the given provider."""
        if provider == 'gemini':
            return get_gemini_api_key()
        elif provider == 'openai':
            return get_openai_api_key()
        elif provider == 'ollama':
            return get_ollama_url()
        raise ValueError(f"Unknown AI Provider: {provider}")
