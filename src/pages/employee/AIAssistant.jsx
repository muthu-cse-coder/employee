import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaRobot,
  FaPaperPlane,
  FaUser,
  FaLightbulb,
  FaCalendar,
  FaMoneyBillWave,
  FaClock,
  FaQuestionCircle
} from 'react-icons/fa';
import './AIAssistant.css';

function AIAssistant() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name}! 👋 I'm your AI HR Assistant. I can help you with:
      
• Leave balance inquiries
• Salary information
• Attendance records
• Leave applications
• Company policies
• And much more!

How can I assist you today?`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Quick action suggestions
  const quickActions = [
    { icon: <FaCalendar />, text: 'Check my leave balance', query: 'What is my leave balance?' },
    { icon: <FaMoneyBillWave />, text: 'View salary details', query: 'Show me my salary details' },
    { icon: <FaClock />, text: 'Attendance report', query: 'Show my attendance for this month' },
    { icon: <FaQuestionCircle />, text: 'Leave policy', query: 'What is the leave policy?' }
  ];

  // AI Response logic (mock - would connect to actual AI API)
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Leave balance queries
    if (lowerMessage.includes('leave balance') || lowerMessage.includes('remaining leaves')) {
      return `Based on your current records:

📅 **Leave Balance**
• Casual Leave: 9 days remaining (out of 12)
• Sick Leave: 8 days remaining (out of 10)
• Earned Leave: 15 days remaining (out of 15)

You've used 3 casual leaves and 2 sick leaves so far this year. Would you like to apply for leave?`;
    }
    
    // Salary queries
    if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
      return `Here's your salary breakdown for this month:

💰 **Salary Details**
• Basic Salary: ₹50,000
• HRA: ₹15,000
• Allowances: ₹5,000
• **Gross Salary**: ₹70,000
• Deductions: ₹8,000
• **Net Salary**: ₹62,000

Your next salary will be credited on the last working day of the month. Need more details?`;
    }
    
    // Attendance queries
    if (lowerMessage.includes('attendance') || lowerMessage.includes('present')) {
      return `Here's your attendance summary:

⏰ **This Month's Attendance**
• Working Days: 22
• Present: 20 days (91%)
• Absent: 0 days
• Late: 2 days
• Total Hours: 176 hours

Great attendance record! Keep it up! 🌟`;
    }
    
    // Leave policy
    if (lowerMessage.includes('leave policy') || lowerMessage.includes('policy')) {
      return `Here's our leave policy:

📋 **Leave Policy**

**Casual Leave (CL):**
• 12 days per year
• Can be carried forward
• Requires 1 day advance notice

**Sick Leave (SL):**
• 10 days per year
• Cannot be carried forward
• Medical certificate required for 3+ days

**Earned Leave (EL):**
• 15 days per year
• Can be carried forward up to 45 days
• Requires manager approval

Would you like to know more about any specific leave type?`;
    }
    
    // Apply leave
    if (lowerMessage.includes('apply leave') || lowerMessage.includes('apply for leave')) {
      return `I can help you apply for leave! 📝

To apply for leave, please:
1. Go to the **Leave Management** page
2. Click on **"Apply Leave"** button
3. Select leave type, dates, and reason
4. Submit your application

Your manager will be notified and you'll receive an update once it's reviewed. 

Would you like me to guide you through anything else?`;
    }
    
    // Working hours
    if (lowerMessage.includes('working hours') || lowerMessage.includes('office hours')) {
      return `⏰ **Working Hours**

Standard working hours are:
• Monday - Friday: 9:00 AM - 6:00 PM
• Saturday: 9:00 AM - 1:00 PM (Half day)
• Sunday: Holiday

Lunch break: 1:00 PM - 2:00 PM

Flexible timing is available with manager approval. Need more information?`;
    }
    
    // Holiday list
    if (lowerMessage.includes('holiday') || lowerMessage.includes('holidays')) {
      return `🎉 **Upcoming Holidays 2024**

• January 26 - Republic Day
• March 25 - Holi
• August 15 - Independence Day
• November 1 - Diwali
• December 25 - Christmas

Plus all Sundays and second Saturdays are holidays. Would you like the complete calendar?`;
    }
    
    // Default response
    return `I'm here to help! 🤖

I can assist you with:
• Leave balance and applications
• Salary information
• Attendance records
• Company policies
• Working hours
• Holiday list

Could you please rephrase your question or choose from the quick actions below?`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsTyping(true);
      
      // Simulate AI thinking and response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          text: generateAIResponse(message),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickAction = (query) => {
    setMessage(query);
    // Auto-submit the query
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: generateAIResponse(query),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout>
      <div className="ai-assistant-page">
        <div className="page-header">
          <div>
            <h1>AI HR Assistant</h1>
            <p>Get instant answers to your HR questions</p>
          </div>
        </div>

        <div className="assistant-container">
          {/* Chat Area */}
          <Card className="chat-card">
            {/* Messages */}
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-avatar">
                    {msg.sender === 'ai' ? <FaRobot /> : <FaUser />}
                  </div>
                  <div className="message-content">
                    <div className="message-bubble">
                      <p>{msg.text}</p>
                    </div>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai">
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                  <div className="message-content">
                    <div className="message-bubble typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="quick-actions-label">
                <FaLightbulb /> Quick Actions:
              </div>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="input-area">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about HR, leave, salary, policies..."
                  className="message-input"
                />
                <button type="submit" className="send-btn" disabled={!message.trim()}>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </Card>

          {/* Info Panel */}
          <Card className="info-panel" title="How to Use" icon={<FaRobot />}>
            <div className="info-content">
              <h4>💡 Tips for Better Results</h4>
              <ul>
                <li>Ask clear, specific questions</li>
                <li>Use keywords like "leave", "salary", "attendance"</li>
                <li>Try the quick action buttons for common queries</li>
                <li>Ask follow-up questions for more details</li>
              </ul>

              <h4>📋 What I Can Help With</h4>
              <ul>
                <li>Leave balance and applications</li>
                <li>Salary breakdowns and details</li>
                <li>Attendance records and reports</li>
                <li>Company policies and procedures</li>
                <li>Working hours and holidays</li>
                <li>General HR inquiries</li>
              </ul>

              <div className="info-note">
                <strong>Note:</strong> This is an AI assistant. For complex issues or official requests, please contact HR directly.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default AIAssistant;