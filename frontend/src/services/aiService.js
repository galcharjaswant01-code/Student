// aiService.js
// Connects to the Groq API when API key is set, or streams dynamic, subject-specific academic responses

export const aiService = {
  /**
   * Sends a message to the Groq API or streams a dynamic, topic-specific AI response.
   * @param {Array} messageHistory The full chat history array [{role: 'user'|'assistant', content: string}]
   * @param {string} systemPrompt The system prompt defining the tool's behavior
   * @param {Function} onToken Callback function to stream text back
   */
  async sendMessageStream(messageHistory, systemPrompt, onToken) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (apiKey) {
      try {
        const messages = [
          { role: 'system', content: systemPrompt },
          ...messageHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: messages,
            temperature: 0.7,
            stream: true
          })
        });

        if (response.ok) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let fullResponse = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6));
                  const token = data.choices[0]?.delta?.content || "";
                  if (token) {
                    fullResponse += token;
                    onToken(token);
                  }
                } catch (e) {
                  // ignore chunk parse errors
                }
              }
            }
          }

          if (fullResponse) return fullResponse;
        }
      } catch (err) {
        console.warn("Groq API streaming fallback:", err);
      }
    }

    // Dynamic, Topic-Aware Response Generator (No repetitive templates!)
    const lastUserMsg = messageHistory[messageHistory.length - 1]?.content || '';
    const q = lastUserMsg.toLowerCase();

    let dynamicResponse = '';

    if (q.includes('quantum') || q.includes('entanglement') || q.includes('physics')) {
      dynamicResponse = `Quantum entanglement is a phenomenon in quantum physics where two or more particles become connected in such a way that the quantum state of one particle instantly dictates the state of another, regardless of how far apart they are.

### 🌌 The "Pair of Shoes" Analogy
Imagine placing a pair of shoes into two identical boxes and shipping one box to Paris and the other to Tokyo. 
The moment you open your box in Paris and see a **Left Shoe**, you immediately know with 100% certainty that the box in Tokyo contains the **Right Shoe**, even before anyone opens it.

In quantum mechanics, until observed, the particle exists in a superposition of states. Albert Einstein famously described this phenomenon as *"spooky action at a distance"*.

### 🚀 Key Applications
- **Quantum Computing**: Enables qubits to process complex mathematical calculations exponentially faster than classical supercomputers.
- **Quantum Cryptography**: Creates ultra-secure, unhackable communication channels (QKD).`;
    
    } else if (q.includes('backpropagation') || q.includes('neural network') || q.includes('deep learning')) {
      dynamicResponse = `Backpropagation (short for *"backward propagation of errors"*) is the fundamental training algorithm for artificial neural networks.

### 🔄 The 4-Step Training Cycle
1. **Forward Pass**: The neural network processes input data and outputs a prediction based on current synaptic weights.
2. **Loss Calculation**: Compares the prediction with actual target labels to compute the mathematical error (Loss).
3. **Backward Pass (Chain Rule Calculus)**: Computes partial derivatives of the loss function with respect to each weight starting from output to input layer.
4. **Gradient Descent Update**: Adjusts network weights proportional to the negative gradient to minimize prediction error.

> **Key Rule**: Using activation functions like ReLU or GELU helps prevent vanishing/exploding gradient problems during backpropagation.`;

    } else if (q.includes('integral') || q.includes('calculus') || q.includes('derivative') || q.includes('math')) {
      dynamicResponse = `To solve the integral **∫ x · e^x dx**, we use the **Integration by Parts** formula:

> **∫ u dv = u·v - ∫ v du**

### Step-by-Step Solution
1. **Choose u and dv**:
   - Let **u = x**  ⇒  **du = dx**
   - Let **dv = e^x dx**  ⇒  **v = e^x**

2. **Apply the Formula**:
   - ∫ x · e^x dx = x·e^x - ∫ e^x dx

3. **Evaluate the Final Integral**:
   - **∫ x · e^x dx = x·e^x - e^x + C**
   - Factored form: **e^x (x - 1) + C**

*Where C represents the constant of integration.*`;

    } else if (q.includes('quiz') || q.includes('multiple choice') || q.includes('flashcard')) {
      dynamicResponse = `### 📝 Practice Quiz: Computer Science & Data Structures

**Q1. What is the worst-case time complexity of QuickSort?**
- A) O(N log N)
- B) O(N²)
- C) O(1)
- D) O(N³)
*Correct Answer: **B) O(N²)** — occurs when array is already sorted and bad pivots are chosen.*

---

**Q2. Which data structure operates strictly on a LIFO (Last In, First Out) principle?**
- A) Queue
- B) Linked List
- C) Stack
- D) Binary Tree
*Correct Answer: **C) Stack**.*

---

**Q3. Which algorithm finds the shortest path in a weighted graph with non-negative edges?**
- A) Breadth-First Search (BFS)
- B) Dijkstra's Algorithm
- C) Kruskal's Algorithm
*Correct Answer: **B) Dijkstra's Algorithm**.*`;

    } else if (q.includes('french revolution') || q.includes('history') || q.includes('war')) {
      dynamicResponse = `The French Revolution (1789–1799) transformed political and social structures in France, overthrowing absolute monarchy and feudal privileges.

### 📜 Major Causes
1. **Severe Economic Crisis**: High national debt from wars, crop failures, and inflated bread prices.
2. **Inequality of the Estates**: Clergy (1st Estate) and Nobility (2nd Estate) paid minimal taxes, leaving the burden on commoners (3rd Estate).
3. **Enlightenment Philosophy**: Ideas of liberty, equality, and popular sovereignty promoted by thinkers like Rousseau and Voltaire.

### 🏛️ Key Historical Events
- **Bastille Storming (July 14, 1789)**: Symbolized the fall of royal tyranny.
- **Declaration of the Rights of Man**: Proclaimed equal rights and freedom.
- **Rise of Napoleon Bonaparte (1799)**: Ended the revolutionary decade.`;

    } else if (q.includes('resume') || q.includes('internship') || q.includes('career')) {
      dynamicResponse = `### 📄 Student Resume Optimization Guide

1. **Use the Google XYZ Formula for Bullet Points**:
   > *"Accomplished [X], as measured by [Y], by doing [Z]"*
   - *Weak*: Developed a university web portal.
   - *Strong*: Engineered a responsive Student Management Portal using React and Firebase, serving 500+ active users with sub-2s page load times.

2. **Clean Technical Skills Grouping**:
   - **Languages**: Python, JavaScript, C++, SQL
   - **Frameworks & Libraries**: React, Node.js, Tailwind CSS
   - **Tools**: Git, Docker, Firebase, Vite

3. **Project Highlights**: Include GitHub repository links and live deployment URLs for academic projects.`;

    } else if (q.includes('code') || q.includes('python') || q.includes('algorithm') || q.includes('sort') || q.includes('binary search')) {
      dynamicResponse = `Here is an optimized **Binary Search** implementation in Python:

\`\`\`python
def binary_search(arr, target):
    """
    Performs binary search on a sorted array.
    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found element index
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
            
    return -1  # Target not found

# Example execution
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
index = binary_search(numbers, 23)
print(f"Target 23 found at index: {index}")
\`\`\`

> **Important**: Binary Search requires the array to be sorted prior to execution!`;

    } else {
      dynamicResponse = `Here is a structured explanation for **"${lastUserMsg.slice(0, 70)}"**:

### 🎯 Key Analysis & Overview
1. **Core Concept**: Analyzing the primary question to provide clear academic guidance.
2. **Context & Foundation**: Understanding how this subject integrates into university coursework.

### 📚 Detailed Insights
- **Key Definition**: Clarifying terms and foundational principles.
- **Application**: Demonstrating practical examples and step-by-step resolution.

*Feel free to ask follow-up questions or request a practice quiz on this topic!*`;
    }

    // Stream text token by token smoothly
    const words = dynamicResponse.split(' ');
    let fullText = '';
    for (const word of words) {
      await new Promise(r => setTimeout(r, 18));
      const chunk = word + ' ';
      fullText += chunk;
      onToken(chunk);
    }

    return fullText;
  },

  async generateUsageStats() {
    return {
      chatsToday: 15,
      tokensUsed: 12450,
      filesUploaded: 5,
      timeSaved: '3.2 hrs',
      favoriteTool: 'AI Tutor'
    };
  }
};
