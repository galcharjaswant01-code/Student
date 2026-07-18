/**
 * AI Service integrated with @heyputer/puter.js
 * Bypasses the backend and hits Puter's free AI chat directly.
 */
import { puter } from '@heyputer/puter.js';

export const aiChatbot = async function(messages) {
  try {
    let hasVideo = false;
    let hasImage = false;
    
    const systemPrompt = `You are an expert AI assistant for the University Student Management System (SMS).
UNIVERSITY OVERVIEW:
We are a premier educational institution serving over 15,000 students. The SMS is the central portal where students, faculty, and administration manage academic life.

ACADEMIC POLICIES:
Policy 1 - Grading Scale: A (90-100, 4.0), B (80-89, 3.0), C (70-79, 2.0), D (60-69, 1.0), F (Below 60, 0.0). Students must maintain a cumulative GPA of 2.0 to remain in good academic standing.
Policy 2 - Registration & Add/Drop: Students can add or drop courses without penalty during the first two weeks of the semester. Dropping a course between weeks 3 and 8 results in a 'W' (Withdrawal) on the transcript. No drops are permitted after week 8.
Policy 3 - Graduation Requirements: Bachelor's degrees require 120 credit hours, including 40 hours of upper-division courses, completion of the core curriculum, and a major. A minimum 2.0 GPA in the major is required.
Policy 4 - Attendance: Attendance policies are set by individual instructors, but university policy dictates that missing more than 20% of scheduled classes may result in automatic failure.
Policy 5 - Financial Aid: To maintain financial aid eligibility (Satisfactory Academic Progress), students must complete 67% of attempted credits and maintain a 2.0 GPA. FAFSA renewal is due by March 1st each year.

SUPPORT RESOURCES:
- IT Helpdesk: For password resets and portal issues, email helpdesk@university.edu or call 555-0199.
- Academic Advising: Located in the Student Success Center, open Mon-Fri 8 AM - 5 PM.
- Financial Aid Office: Located in the Administration Building, Room 101.
`;

    // We need to resolve file uploads asynchronously before constructing the payload
    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    for (const msg of messages) {
      if (msg.sender === 'ai' && msg.images && msg.images.length > 0) {
        hasImage = true;
        formattedMessages.push({
          role: 'assistant',
          content: [
            { type: "text", text: msg.text },
            ...msg.images.map(img => ({
              type: "image_url",
              image_url: { url: img.image_url?.url || img.url },
              thoughtSignature: img.thoughtSignature
            }))
          ]
        });
      } else if (msg.sender === 'user') {
        if (msg.file) {
          let contentArray = [];
          const puterFile = await puter.fs.write(msg.file.name, msg.file);
          contentArray.push({
            type: "file",
            puter_path: puterFile.path || `~/${msg.file.name}`
          });
          if (msg.text) {
            contentArray.push({ type: "text", text: msg.text });
          }
          formattedMessages.push({
            role: 'user',
            content: contentArray
          });
        } else {
          formattedMessages.push({
            role: 'user',
            content: msg.text || ''
          });
        }
      } else {
        formattedMessages.push({
          role: 'assistant',
          content: msg.text
        });
      }
    }

    // Use Groq API instead of Puter
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    // Choose model based on whether there's an image
    const model = hasImage ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";
    
    const requestBody = {
      model: model,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1024
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    

  } catch (error) {
    console.error("Puter AI Error:", error);
    return { message: { text: `\n\n[SYSTEM ERROR]: ${error.message || JSON.stringify(error)}` } };
  }
};

export const notesSummarizer = async (text, file = null) => {
  try {
    let content = [];
    
    if (file) {
      const puterFile = await puter.fs.write(file.name, file);
      content.push({
        type: "file",
        puter_path: puterFile.path || `~/${file.name}`,
      });
    }

    content.push({
      type: "text",
      text: text
    });

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    const requestBody = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a highly efficient Notes Summarizer. Distill the following class notes into bullet points emphasizing the most critical concepts, formulas, or dates."
        },
        {
          role: "user",
          content: JSON.stringify(content)
        }
      ],
      temperature: 0.5
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error("Failed to summarize notes.");
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Puter AI Error:", error);
    throw error;
  }
};

export const codingAssistant = async (query) => {
  try {
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    const requestBody = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert Coding Assistant. Provide clear, optimized, and heavily commented code solutions. Format all code blocks properly using markdown."
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.2
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error("Failed to get coding help.");
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Puter AI Error:", error);
    throw error;
  }
};

export const analyzeResume = async function*(file) {
  try {
    const tempName = `temp_resume_${Date.now()}.${file.name.split('.').pop()}`;
    const puterFile = await puter.fs.write(tempName, file);
    const uploadedPath = puterFile.path || `~/${tempName}`;

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    const requestBody = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: 'user',
          content: `Please analyze the uploaded resume text. Extract the main skills, experience level, and suggest 3 areas of improvement: File Path: ${uploadedPath}`
        }
      ],
      temperature: 0.5
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error("Failed to analyze resume.");
    const data = await response.json();
    
    const words = data.choices[0].message.content.split(' ');
    for (const word of words) {
      yield { text: word + ' ' };
      await new Promise(resolve => setTimeout(resolve, 50)); // fake streaming effect
    }

    // Clean up temporary file after analysis is complete
    try {
      await puter.fs.delete(uploadedPath);
    } catch (cleanupError) {
      console.warn("Failed to clean up temp resume:", cleanupError);
    }
  } catch (error) {
    console.error("Puter AI Error:", error);
    throw error;
  }
};
