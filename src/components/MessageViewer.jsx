import React, { useState, useRef, useEffect } from 'react';

const MessageViewer = ({ contact, onSolve }) => {
  const [feedback, setFeedback] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(contact.history.map(m => ({...m, time: '11:29 AM'})));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Reset feedback and input when contact changes
    setFeedback(null);
    setMessages(contact.history.map(m => ({...m, time: '11:29 AM'})));
    setInputText('');
  }, [contact.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  const handleGuess = (guess) => {
    if (guess === contact.isReal) {
      setFeedback('correct');
      if (onSolve) onSolve();
    } else {
      setFeedback('incorrect');
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([...messages, { sender: 'me', text: inputText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setInputText('');
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
      // Using an implicit image url or just a dark background
      backgroundColor: '#0b141a',
      backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
      backgroundRepeat: 'repeat', backgroundBlendMode: 'overlay'
    }}>
      {/* Chat Header */}
      <div style={{
        height: '59px', backgroundColor: '#202c33', display: 'flex', alignItems: 'center',
        padding: '10px 16px', boxSizing: 'border-box', justifyContent: 'space-between', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#00a884',
            display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', marginRight: '15px'
          }}>
            {contact.avatar}
          </div>
          <div>
            <h2 style={{ fontSize: '16px', color: '#e9edef', margin: '0 0 2px 0', fontWeight: 'normal' }}>{contact.name}</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#8696a0' }}>click here for contact info</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', color: '#aebac1', fontSize: '20px' }}>
          <span style={{ cursor: 'pointer' }}>🔍</span>
          <span style={{ cursor: 'pointer' }}>⋮</span>
        </div>
      </div>

      {/* Cyber Security Game Overlay */}
      {!feedback && (
        <div style={{ 
          backgroundColor: '#1f2c33', 
          color: '#e9edef', 
          padding: '12px 16px', 
          textAlign: 'center', 
          borderBottom: '1px solid #2a3942',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10
        }}>
          <span style={{ color: '#00a884', fontWeight: 'bold' }}>GUESS IF THIS MESSAGE IS REAL OR A SCAM</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => handleGuess(true)}
              style={{
                backgroundColor: '#00a884', color: '#111b21', border: 'none', borderRadius: '4px',
                padding: '6px 24px', fontWeight: 'bold', cursor: 'pointer', transition: 'box-shadow 0.2s'
              }}
              className="action-btn"
            >
              REAL
            </button>
            <button 
              onClick={() => handleGuess(false)}
              style={{
                backgroundColor: '#ef5350', color: '#fff', border: 'none', borderRadius: '4px',
                padding: '6px 24px', fontWeight: 'bold', cursor: 'pointer', transition: 'box-shadow 0.2s'
              }}
              className="action-btn"
            >
              SCAM
            </button>
          </div>
        </div>
      )}

      {feedback && (
        <div style={{ 
          backgroundColor: feedback === 'correct' ? '#005c4b' : '#3f1d22', 
          padding: '12px 16px', 
          borderBottom: `2px solid ${feedback === 'correct' ? '#00a884' : '#ef5350'}`,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h3 style={{ 
              color: feedback === 'correct' ? '#00a884' : '#ff8a80', margin: 0, fontSize: '15px' 
            }}>
              {feedback === 'correct' ? '✔️ CORRECT!' : '❌ INCORRECT!'}
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#e9edef', lineHeight: '1.4' }}>{contact.explanation}</p>
        </div>
      )}

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 5%', display: 'flex', flexDirection: 'column' }} className="chat-scroll">
        <div style={{ alignSelf: 'center', backgroundColor: '#182229', color: '#8696a0', padding: '6px 12px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '16px', textTransform: 'uppercase' }}>
          Today
        </div>
        
        <div style={{ alignSelf: 'center', backgroundColor: '#182229', color: '#ffd279', padding: '6px 12px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '16px', textAlign: 'center', maxWidth: '85%' }}>
          <span style={{ marginRight: '4px' }}>🔒</span> Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          return (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start',
                marginBottom: '4px',
                marginTop: index > 0 && messages[index-1].sender !== msg.sender ? '8px' : 0
              }}
              className="msg-bubble-container"
            >
              <div style={{
                backgroundColor: isMe ? '#005c4b' : '#202c33',
                color: '#e9edef',
                borderRadius: '8px',
                borderTopLeftRadius: !isMe && (index === 0 || messages[index-1].sender === 'me') ? '0px' : '8px',
                borderTopRightRadius: isMe && (index === 0 || messages[index-1].sender === 'them') ? '0px' : '8px',
                padding: '6px 7px 8px 9px',
                maxWidth: '75%',
                fontSize: '14.2px',
                lineHeight: '19px',
                position: 'relative',
                boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
              }} className="msg-bubble">
                <div style={{ paddingRight: '50px' }}>
                  {msg.text}
                </div>
                <div style={{ 
                  position: 'absolute', right: '7px', bottom: '4px', 
                  fontSize: '11px', color: isMe ? '#85b9b1' : '#8696a0',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  {msg.time}
                  {isMe && <span style={{ color: '#53bdeb', fontSize: '14px', lineHeight: '11px' }}>✓✓</span>}
                </div>
                <div className="msg-reaction" style={{
                  position: 'absolute', top: '50%', transform: 'translateY(-50%)', [isMe ? 'left' : 'right']: '-40px',
                  backgroundColor: '#202c33', padding: '4px 8px', borderRadius: '16px', display: 'none', cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}>
                  😊
                </div>
              </div>
            </div>
          );
        })}
        {/* Typing indicator simulation */}
        {!feedback && (messages.length === 0 || messages[messages.length-1].sender === 'me') && (
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '8px' }}>
            <div style={{
              backgroundColor: '#202c33', color: '#e9edef', borderRadius: '8px', borderTopLeftRadius: '0px',
              padding: '10px 14px', maxWidth: '75%', fontSize: '14.2px', display: 'flex', alignItems: 'center', gap: '4px'
            }} className="typing-indicator">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        backgroundColor: '#202c33', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', gap: '16px', color: '#8696a0', fontSize: '24px' }}>
          <span style={{ cursor: 'pointer' }}>😊</span>
          <span style={{ cursor: 'pointer' }}>📎</span>
        </div>
        <form onSubmit={handleSend} style={{ flex: 1, display: 'flex' }}>
          <input 
            type="text" 
            placeholder="Type a message" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1, padding: '9px 12px', border: 'none', borderRadius: '8px',
              backgroundColor: '#2a3942', color: '#d1d7db', fontSize: '15px', outline: 'none'
            }}
          />
        </form>
        <div style={{ color: '#8696a0', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {inputText.trim() ? <button onClick={handleSend} style={{ background: 'none', border: 'none', color: '#00a884', fontSize: '24px', cursor: 'pointer' }}>➤</button> : <span>🎤</span>}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .action-btn:hover {
          opacity: 0.9;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.16);
        }
        .msg-bubble-container:hover .msg-reaction {
          display: block !important;
        }
        .dot {
          width: 6px; height: 6px; background-color: #8696a0; border-radius: 50%; display: inline-block;
          animation: typing 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default MessageViewer;
