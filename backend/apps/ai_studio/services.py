import json
import logging
import re
import ast
from api.gemini_client import chat_with_gemini as _chat_with_gemini
from api.openai_client import chat_with_openai as _chat_with_openai
from api.groq_client import chat_with_groq as _chat_with_groq
from config.env.ai_config import AIConfig

logger = logging.getLogger(__name__)

def chat_with_gemini(messages, model_name=None):
    if not model_name or 'gemini' in model_name:
        model_name = 'gemini-3.6-flash'
    return _chat_with_gemini(messages, model_name=model_name)

def chat_with_ai(messages: list, model: str = 'gemini-3.6-flash') -> str:
    """
    Send a list of messages strictly to Gemini API and return response text.
    """
    ai_text = _chat_with_gemini(messages, model_name=model)
    if ai_text.startswith("Error"):
        logger.error(f"Gemini API returned error: {ai_text}")
        return (
            f"I'm having trouble connecting to the AI service right now. "
            f"Please try again in a moment. "
            f"(Error detail: {ai_text})"
        )
    return ai_text


def _clean_and_parse_json(response_text: str) -> dict:
    response_text = response_text.strip()
    if '```json' in response_text:
        response_text = response_text.split('```json')[1].split('```')[0].strip()
    elif '```' in response_text:
        response_text = response_text.split('```')[1].split('```')[0].strip()

    try:
        return json.loads(response_text, strict=False)
    except Exception:
        pass

    # Fix unclosed quotes before delimiters like , ] }
    fixed = re.sub(r'(":[ \t]*")([^"\n]*?)(?=[,\]\}])', r'\1\2"', response_text)
    try:
        return json.loads(fixed, strict=False)
    except Exception:
        pass

    import ast
    try:
        val = ast.literal_eval(response_text)
        if isinstance(val, dict):
            return val
    except Exception:
        pass

    return json.loads(response_text)


def _generate_json_with_ai(prompt: str, model: str = 'gemini-3.6-flash') -> dict:
    """Helper to query AI (with fallback) and extract JSON."""
    messages = [
        {'role': 'user', 'parts': [f'You are a helpful AI that outputs only valid JSON. Strictly format valid JSON keys and values. Do not include markdown code blocks like ```json, just output the raw JSON object.\n\n{prompt}']}
    ]
    response_text = chat_with_ai(messages, model=model)
    
    if "Error" in response_text or "missing" in response_text.lower():
        return {"error": "AI API Key missing or error", "raw_response": response_text}

    try:
        return _clean_and_parse_json(response_text)
    except Exception as e:
        logger.error(f"Failed to parse JSON from AI: {response_text}. Error: {e}")
        return {"error": str(e), "raw_response": response_text}

def generate_quiz(topic: str, difficulty: str = 'Medium', count: int = 5) -> dict:
    """Generate a multiple-choice quiz using AI."""
    prompt = f"""Generate a {difficulty} difficulty quiz on '{topic}' with {count} multiple choice questions.
Return ONLY valid JSON in this format:
{{"questions": [{{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..."}}]}}"""
    
    result = _generate_json_with_ai(prompt)
    if "error" in result:
        # Fallback Mock Data
        return {
            "questions": [
                {
                    "question": f"What is the core concept of {topic}?",
                    "options": ["A detail", "The main idea", "Something unrelated", "None of the above"],
                    "correctAnswer": 1,
                    "explanation": f"The main idea represents {topic} best."
                },
                {
                    "question": f"Which of the following is associated with {topic}?",
                    "options": ["Red", "Green", "Blue", "All of the above"],
                    "correctAnswer": 3,
                    "explanation": f"All colors can be associated with {topic} in this mock."
                }
            ]
        }
    return result

def generate_study_plan(subject: str, days: int = 7) -> dict:
    """Generate a daily study plan using AI."""
    prompt = f"""Create a {days}-day study plan for '{subject}'.
Return ONLY valid JSON in this format:
{{"plan": [{{"day": 1, "title": "...", "tasks": ["task1", "task2"]}}], "advice": "general study tip"}}"""
    
    result = _generate_json_with_ai(prompt)
    if "error" in result:
        return {
            "plan": [
                {"day": 1, "title": f"Intro to {subject}", "tasks": ["Read chapter 1", "Watch intro video"]},
                {"day": 2, "title": f"Practice {subject}", "tasks": ["Do exercises", "Review concepts"]}
            ],
            "advice": "This is a mock study plan because the AI API is currently rate-limited. Stay consistent!"
        }
    return result

def analyze_code(prompt: str, language: str = 'python') -> dict:
    """Generate code and explanation using AI."""
    full_prompt = f"""Write {language} code for: {prompt}
Return ONLY valid JSON: {{"code": "...", "explanation": "..."}}"""
    
    result = _generate_json_with_ai(full_prompt)
    if "error" in result:
        return {
            "code": f"// Mock {language} code for: {prompt}\nprint('Hello World')\n",
            "explanation": "This is a mocked response because the AI API exceeded its quota."
        }
    return result

def summarize_notes(text: str) -> dict:
    """Summarize notes using AI."""
    prompt = f"""Summarize these notes and extract key takeaway points.
Notes: {text[:3000]}
Return ONLY valid JSON: {{"summary": "...", "keyPoints": ["..."]}}"""
    
    result = _generate_json_with_ai(prompt)
    if "error" in result:
        return {
            "summary": "This is a mock summary due to AI rate limits. Your notes covered important topics.",
            "keyPoints": ["Mock key point 1", "Mock key point 2"]
        }
    return result

def generate_performance_summary(stats_data: dict) -> str:
    """Generate a performance overview summary using AI."""
    prompt = f"""You are an encouraging academic advisor. Based on the following student performance data, write a short, one-paragraph summary highlighting their strengths, areas for improvement, and a positive tip for the future. Keep it concise (3-4 sentences max). Do not use JSON, just return plain text.

Data:
{json.dumps(stats_data, indent=2)}"""
    
    messages = [{'role': 'user', 'parts': [prompt]}]
    ai_text = chat_with_gemini(messages, model_name='gemini-3.6-flash')
    if "Error connecting to AI" in ai_text or "429" in ai_text:
        return "You're doing great! This is a mock summary since the AI API is rate-limited. Keep up the good work on your assignments and focus on reviewing subjects you find challenging."
    return ai_text

def generate_assignment_feedback(assignment_title: str, assignment_description: str, submission_text: str) -> dict:
    """Generate constructive feedback for a student assignment submission."""
    prompt = f"""You are a helpful teaching assistant grading an assignment.
Please review the student's submission against the assignment details and provide constructive feedback.
Keep your feedback structured with:
1. Score (out of 100)
2. Summary (overall impression)
3. Strengths (what they did well)
4. Improvements (what they can do better)

Return the response strictly as valid JSON like this:
{{
  "score": 85,
  "summary": "Good effort but needs more detail.",
  "strengths": ["Clear introduction", "Good use of sources"],
  "improvements": ["Expand on conclusion", "Fix minor typos"]
}}

Assignment Title: {assignment_title}
Assignment Description: {assignment_description}

Student Submission:
{submission_text}
"""
    result = _generate_json_with_ai(prompt)
    if "error" in result:
        return {
            "score": 88, 
            "summary": "This is a mock feedback response due to AI rate limits. Good effort overall!", 
            "strengths": ["You submitted something", "Looks well formatted"], 
            "improvements": ["Try again when the API is not rate limited"]
        }
    return result
