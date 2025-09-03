
        const OPENAI_CONFIG = {
            apiKey: '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',
            model: 'gpt-3.5-turbo', 
            maxTokens: 500,
            temperature: 0.7
        };

        let studentProfile = {
            interests: [],
            strengths: [],
            careerGoals: [],
            currentGrade: '',
            schedule: [],
            conversationHistory: []
        };

        const chatMessages = document.getElementById('chatMessages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        // Sample student data for demo
        const sampleStudents = {
            'computer science': {
                interests: ['programming', 'AI', 'robotics', 'gaming'],
                strengths: ['logical thinking', 'problem solving', 'mathematics'],
                careerGoals: ['software developer', 'AI researcher', 'tech entrepreneur']
            },
            'biology': {
                interests: ['medicine', 'research', 'environmental science'],
                strengths: ['analytical skills', 'attention to detail', 'scientific method'],
                careerGoals: ['doctor', 'researcher', 'biotechnologist']
            },
            'arts': {
                interests: ['painting', 'music', 'literature', 'design'],
                strengths: ['creativity', 'visual thinking', 'communication'],
                careerGoals: ['graphic designer', 'artist', 'creative director']
            }
        };

        const responses = {
            'career guidance': {
                message: "Let me help you explore career opportunities! Based on your interests and strengths, here are some personalized suggestions:",
                suggestions: [
                    {
                        title: "Software Development",
                        content: "With your logical thinking and problem-solving skills, consider roles like Full-Stack Developer, Mobile App Developer, or DevOps Engineer. Growth rate: 22% annually."
                    },
                    {
                        title: "AI & Machine Learning",
                        content: "Emerging field with high demand. Consider Data Scientist, ML Engineer, or AI Researcher roles. Average salary: $120k-180k."
                    },
                    {
                        title: "Recommended Actions",
                        content: "1. Build a portfolio on GitHub\n2. Learn Python/JavaScript\n3. Complete online certifications\n4. Join coding communities"
                    }
                ]
            },
            'hobby suggestions': {
                message: "Here are some hobby recommendations that align with your interests and can boost your career prospects:",
                suggestions: [
                    {
                        title: "Tech Hobbies",
                        content: "• Arduino projects & IoT development\n• 3D printing and design\n• Cybersecurity challenges (CTFs)\n• Open source contributions"
                    },
                    {
                        title: "Creative Hobbies",
                        content: "• Digital art and graphic design\n• Video editing and content creation\n• Photography with AI enhancement\n• Music production with software"
                    },
                    {
                        title: "Skill-Building Hobbies",
                        content: "• Public speaking (Toastmasters)\n• Language learning (coding languages too!)\n• Writing technical blogs\n• Mentoring younger students"
                    }
                ]
            },
            'study plan': {
                message: "Let me create a personalized study plan for your academic success:",
                suggestions: [
                    {
                        title: "Daily Study Schedule",
                        content: "Morning (7-9 AM): Core subjects review\nAfternoon (2-4 PM): Problem-solving practice\nEvening (7-9 PM): Project work & assignments"
                    },
                    {
                        title: "Weekly Goals",
                        content: "• Complete 3 coding challenges\n• Read 2 technical articles\n• Work on personal project (2 hours)\n• Practice presentation skills"
                    },
                    {
                        title: "Study Techniques",
                        content: "• Pomodoro Technique (25 min focused study)\n• Active recall with flashcards\n• Teach-back method with peers\n• Regular mock tests and assessments"
                    }
                ]
            },
            'free period activities': {
                message: "Here are productive activities for your free periods based on your goals:",
                suggestions: [
                    {
                        title: "Skill Development (30-45 min)",
                        content: "• Complete coding tutorials on platforms like Codecademy\n• Practice typing speed and shortcuts\n• Learn new software tools (Figma, Blender, etc.)\n• Watch educational YouTube channels"
                    },
                    {
                        title: "Academic Enhancement (20-30 min)",
                        content: "• Review previous day's notes\n• Solve practice problems\n• Create mind maps for complex topics\n• Prepare questions for next class"
                    },
                    {
                        title: "Career Preparation (15-20 min)",
                        content: "• Update LinkedIn profile and resume\n• Research companies and job roles\n• Network with professionals online\n• Read industry news and trends"
                    }
                ]
            },
            'daily routine': {
                message: "Here's your optimized daily routine combining academics and personal growth:",
                schedule: [
                    { time: "6:00-7:00 AM", activity: "Morning routine & light exercise" },
                    { time: "7:00-8:00 AM", activity: "Review notes & plan the day" },
                    { time: "8:00-12:00 PM", activity: "Core academic classes" },
                    { time: "12:00-1:00 PM", activity: "Lunch & networking" },
                    { time: "1:00-3:00 PM", activity: "Specialized subjects/labs" },
                    { time: "3:00-4:00 PM", activity: "Free period: Skill development" },
                    { time: "4:00-6:00 PM", activity: "Project work & assignments" },
                    { time: "6:00-7:00 PM", activity: "Physical activity/hobbies" },
                    { time: "7:00-8:30 PM", activity: "Dinner & family time" },
                    { time: "8:30-10:00 PM", activity: "Study/revision" },
                    { time: "10:00-11:00 PM", activity: "Reading & reflection" }
                ]
            }
        };

        function addMessage(content, isUser = false, isTyping = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            if (isTyping) {
                messageDiv.innerHTML = `
                    <div class="message-avatar bot-avatar-msg">🤖</div>
                    <div class="typing-indicator">
                        <span>Quantum Solver is preparing your response</span>
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                `;
            } else {
                const avatar = isUser ? '👨‍🦰' : '🤖';
                const avatarClass = isUser ? 'user-avatar-msg' : 'bot-avatar-msg';
                
                messageDiv.innerHTML = `
                    <div class="message-avatar ${avatarClass}">${avatar}</div>
                    <div class="message-content">${content}</div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            return messageDiv;
        }

        // OpenAI API Integration
        async function callOpenAI(userMessage, conversationHistory) {
            if (!OPENAI_CONFIG.apiKey) {
                console.warn('OpenAI API key not configured, using fallback responses');
                return generateFallbackResponse(userMessage);
            }

            const systemPrompt = `You are EduBot, a smart curriculum assistant for students. You specialize in:

1. Career Guidance - Provide personalized career advice based on interests, skills, and market trends
2. Hobby Development - Suggest hobbies that align with career goals and personal growth
3. Academic Planning - Create study plans, suggest courses, and educational pathways
4. Free Period Activities - Recommend productive activities during breaks
5. Daily Routine Optimization - Help students balance academics, skills, and personal time

Student Profile: ${JSON.stringify(studentProfile)}

Guidelines:
- Be encouraging and supportive
- Provide actionable, specific advice
- Include relevant statistics or trends when helpful
- Ask follow-up questions to better understand student needs
- Format responses with clear structure (use bullet points, numbered lists)
- Keep responses concise but comprehensive (300-500 words max)
- Always consider the student's current academic level and goals

Current conversation context: The student is seeking guidance about their academic and career journey.`;

            const messages = [
                { role: 'system', content: systemPrompt },
                ...conversationHistory,
                { role: 'user', content: userMessage }
            ];

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`
                    },
                    body: JSON.stringify({
                        model: OPENAI_CONFIG.model,
                        messages: messages,
                        max_tokens: OPENAI_CONFIG.maxTokens,
                        temperature: OPENAI_CONFIG.temperature,
                        presence_penalty: 0.1,
                        frequency_penalty: 0.1
                    })
                });

                if (!response.ok) {
                    throw new Error(`OpenAI API error: ${response.status}`);
                }

                const data = await response.json();
                const botResponse = data.choices[0].message.content;

                // Update conversation history
                studentProfile.conversationHistory.push(
                    { role: 'user', content: userMessage },
                    { role: 'assistant', content: botResponse }
                );

                // Keep only last 10 messages to manage token limits
                if (studentProfile.conversationHistory.length > 20) {
                    studentProfile.conversationHistory = studentProfile.conversationHistory.slice(-20);
                }

                return { message: botResponse, isOpenAI: true };

            } catch (error) {
                console.error('OpenAI API error:', error);
                return generateFallbackResponse(userMessage);
            }
        }

        function generateFallbackResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Check for specific keywords
            for (const key in responses) {
                if (lowerMessage.includes(key.replace(' ', '')) || lowerMessage.includes(key)) {
                    return responses[key];
                }
            }

            // Handle specific questions
            if (lowerMessage.includes('what') && lowerMessage.includes('career')) {
                return responses['career guidance'];
            }
            
            if (lowerMessage.includes('hobby') || lowerMessage.includes('interest')) {
                return responses['hobby suggestions'];
            }

            if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
                return responses['study plan'];
            }

            if (lowerMessage.includes('free') && lowerMessage.includes('time')) {
                return responses['free period activities'];
            }

            if (lowerMessage.includes('schedule') || lowerMessage.includes('routine')) {
                return responses['daily routine'];
            }

            // Default intelligent responses
            const defaultResponses = [
                {
                    message: "I understand you're looking for guidance! Could you tell me more about your current academic focus or interests? I can provide personalized suggestions for:",
                    suggestions: [
                        {
                            title: "Academic Planning",
                            content: "Help you create study schedules and set academic goals based on your strengths."
                        },
                        {
                            title: "Career Exploration", 
                            content: "Discover career paths that match your interests and skills with market insights."
                        },
                        {
                            title: "Skill Development",
                            content: "Recommend activities and resources to build valuable skills during free time."
                        }
                    ]
                }
            ];

            return defaultResponses[0];
        }

        function formatResponse(response) {
            if (response.isOpenAI) {
                // Format OpenAI response - convert markdown-like formatting to HTML
                let formattedMessage = response.message
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
                    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
                    .replace(/^\d+\.\s/gm, '') // Remove numbered list markers
                    .replace(/^-\s/gm, '• ') // Convert dashes to bullets
                    .replace(/\n\n/g, '</p><p>') // Double line breaks to paragraphs
                    .replace(/\n/g, '<br>'); // Single line breaks to BR tags
                
                // Wrap in paragraph tags if not already wrapped
                if (!formattedMessage.startsWith('<p>')) {
                    formattedMessage = '<p>' + formattedMessage + '</p>';
                }
                
                return formattedMessage;
            }

            // Original formatting for fallback responses
            let formattedMessage = `<p>${response.message}</p>`;
            
            if (response.suggestions) {
                response.suggestions.forEach(suggestion => {
                    formattedMessage += `
                        <div class="suggestion-card">
                            <div class="suggestion-title">${suggestion.title}</div>
                            <div class="suggestion-content">${suggestion.content.replace(/\n/g, '<br>')}</div>
                        </div>
                    `;
                });
            }

            if (response.schedule) {
                formattedMessage += '<div style="margin-top: 15px;">';
                response.schedule.forEach(item => {
                    formattedMessage += `
                        <div class="schedule-item">
                            <div class="time-slot">${item.time}</div>
                            <div class="activity">${item.activity}</div>
                        </div>
                    `;
                });
                formattedMessage += '</div>';
            }

            return formattedMessage;
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            messageInput.value = '';
            sendBtn.disabled = true;

            // Show typing indicator
            const typingMessage = addMessage('', false, true);

            try {
                // Call OpenAI API or fallback to predefined responses
                const response = await callOpenAI(message, studentProfile.conversationHistory);
                
                // Remove typing indicator
                typingMessage.remove();
                
                // Format and add bot response
                const formattedResponse = formatResponse(response);
                addMessage(formattedResponse);
                
            } catch (error) {
                console.error('Error generating response:', error);
                typingMessage.remove();
                addMessage('Sorry, I encountered an error. Please try again!');
            } finally {
                sendBtn.disabled = false;
            }
        }

        function sendQuickMessage(message) {
            messageInput.value = message;
            sendMessage();
        }

        // Event listeners
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        messageInput.addEventListener('input', () => {
            sendBtn.disabled = messageInput.value.trim() === '';
        });

        // Initialize
        sendBtn.disabled = true;
    