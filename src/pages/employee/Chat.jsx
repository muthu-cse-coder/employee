import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaComments,
  FaPaperPlane,
  FaUserCircle,
  FaSearch,
  FaPaperclip,
  FaSmile,
  FaCircle
} from 'react-icons/fa';
import './Chat.css';

function Chat() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock contacts
  const contacts = [
    {
      id: 1,
      name: 'HR Manager',
      role: 'Admin',
      avatar: null,
      online: true,
      lastMessage: 'Sure, I will review it',
      lastMessageTime: '2 min ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Team Lead',
      role: 'Admin',
      avatar: null,
      online: true,
      lastMessage: 'Meeting at 3 PM',
      lastMessageTime: '1 hour ago',
      unread: 0
    },
    {
      id: 3,
      name: 'IT Support',
      role: 'Admin',
      avatar: null,
      online: false,
      lastMessage: 'Issue resolved',
      lastMessageTime: '2 hours ago',
      unread: 0
    }
  ];

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  // Mock messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'other',
      senderName: 'HR Manager',
      text: 'Hello! How can I help you today?',
      time: '10:30 AM',
      date: 'Today'
    },
    {
      id: 2,
      sender: 'me',
      senderName: user?.name,
      text: 'Hi, I wanted to ask about my leave application',
      time: '10:32 AM',
      date: 'Today'
    },
    {
      id: 3,
      sender: 'other',
      senderName: 'HR Manager',
      text: 'Let me check your application',
      time: '10:33 AM',
      date: 'Today'
    },
    {
      id: 4,
      sender: 'other',
      senderName: 'HR Manager',
      text: 'Your leave for Feb 20-22 has been approved!',
      time: '10:35 AM',
      date: 'Today'
    },
    {
      id: 5,
      sender: 'me',
      senderName: user?.name,
      text: 'Great! Thank you so much',
      time: '10:36 AM',
      date: 'Today'
    },
    {
      id: 6,
      sender: 'other',
      senderName: 'HR Manager',
      text: 'You\'re welcome! Let me know if you need anything else',
      time: '10:37 AM',
      date: 'Today'
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        senderName: user?.name,
        text: message,
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        date: 'Today'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="chat-page">
        <Card className="chat-container">
          <div className="chat-layout">
            {/* Contacts Sidebar */}
            <div className="chat-sidebar">
              <div className="chat-sidebar-header">
                <h3>Messages</h3>
                <div className="search-box">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="contacts-list">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`contact-item ${selectedContact.id === contact.id ? 'active' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="contact-avatar">
                      <FaUserCircle />
                      <span className={`status-dot ${contact.online ? 'online' : 'offline'}`}>
                        <FaCircle />
                      </span>
                    </div>
                    <div className="contact-info">
                      <div className="contact-header">
                        <h4>{contact.name}</h4>
                        <span className="message-time">{contact.lastMessageTime}</span>
                      </div>
                      <div className="contact-footer">
                        <p className="last-message">{contact.lastMessage}</p>
                        {contact.unread > 0 && (
                          <span className="unread-badge">{contact.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="chat-main">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-left">
                  <div className="contact-avatar large">
                    <FaUserCircle />
                    <span className={`status-dot ${selectedContact.online ? 'online' : 'offline'}`}>
                      <FaCircle />
                    </span>
                  </div>
                  <div className="contact-details">
                    <h3>{selectedContact.name}</h3>
                    <span className={`status-text ${selectedContact.online ? 'online' : 'offline'}`}>
                      {selectedContact.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
                  >
                    {msg.sender === 'other' && (
                      <div className="message-avatar">
                        <FaUserCircle />
                      </div>
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                      </div>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <form onSubmit={handleSendMessage} className="message-input-form">
                  <button type="button" className="input-action-btn" title="Attach file">
                    <FaPaperclip />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="message-input"
                  />
                  <button type="button" className="input-action-btn" title="Emoji">
                    <FaSmile />
                  </button>
                  <button 
                    type="submit" 
                    className="send-btn"
                    disabled={!message.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Tips */}
        <Card title="Chat Guidelines" icon={<FaComments />} className="chat-tips">
          <ul className="tips-list">
            <li>Be professional and respectful in all communications</li>
            <li>Response time: Usually within 1-2 hours during business hours</li>
            <li>For urgent matters, contact HR directly via phone</li>
            <li>Keep conversations relevant to work-related topics</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}

export default Chat;