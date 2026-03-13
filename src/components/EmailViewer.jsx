import React, { useState } from 'react';

const EmailViewer = ({ email, onBack, onSolve }) => {
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const handleGuess = (guess) => {
    // guess is boolean (true for real, false for fake)
    if (guess === email.isReal) {
      setFeedback('correct');
      if (onSolve) onSolve();
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
      color: '#202124',
      overflow: 'hidden'
    }}>
      {/* Top action bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        height: '48px',
        boxSizing: 'border-box'
      }}>
        <button onClick={onBack} title="Back to Inbox" className="icon-btn" style={{ marginRight: '16px' }}>
          ⬅️
        </button>
        <div style={{ display: 'flex', gap: '8px', borderRight: '1px solid #e0e0e0', paddingRight: '16px', marginRight: '16px' }}>
          <button className="icon-btn" title="Archive">📥</button>
          <button className="icon-btn" title="Report spam">⚠️</button>
          <button className="icon-btn" title="Delete">🗑️</button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="icon-btn" title="Mark as unread">✉️</button>
          <button className="icon-btn" title="Snooze">⏰</button>
          <button className="icon-btn" title="Add to Tasks">✔️</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 64px 72px' }}>
        {/* Subject line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'normal', margin: 0, color: '#202124' }}>
            {email.subject}
            <span style={{ backgroundColor: '#dddddd', fontSize: '12px', padding: '2px 4px', borderRadius: '4px', marginLeft: '12px', color: '#222' }}>Inbox</span>
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="icon-btn" title="Print all">🖨️</button>
            <button className="icon-btn" title="In new window">↗</button>
          </div>
        </div>

        {/* Sender info */}
        <div style={{ display: 'flex', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1a73e8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', marginRight: '12px' }}>
            {email.sender.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '14px', marginRight: '4px' }}>{email.sender}</span>
                <span style={{ color: '#5f6368', fontSize: '12px' }}>&lt;{email.sender.toLowerCase().replace(/\s+/g, '')}@example.com&gt;</span>
              </div>
              <div style={{ color: '#5f6368', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {email.time} (1 hour ago)
                <span className="star-icon" style={{ fontSize: '18px', cursor: 'pointer', color: '#ccc' }}>☆</span>
                <span style={{ cursor: 'pointer' }}>↩️</span>
                <span style={{ cursor: 'pointer' }}>⋮</span>
              </div>
            </div>
            <div style={{ color: '#5f6368', fontSize: '12px', cursor: 'pointer' }}>
              to me <span style={{ fontSize: '10px' }}>▼</span>
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#222', whiteSpace: 'pre-wrap', marginBottom: '40px', paddingLeft: '52px' }}>
          {email.content}
        </div>

        {/* Action Buttons underneath message */}
        <div style={{ paddingLeft: '52px', display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #dadce0', borderRadius: '18px', backgroundColor: '#fff', color: '#5f6368', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }} className="reply-btn">
            ↩️ Reply
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #dadce0', borderRadius: '18px', backgroundColor: '#fff', color: '#5f6368', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }} className="reply-btn">
            ↪️ Forward
          </button>
        </div>

        {/* Fake / Real game mechanic (Cybersecurity aspect) */}
        {!feedback && (
          <div style={{ 
            marginTop: '40px', marginLeft: '52px', padding: '24px', backgroundColor: '#fdf6e3', 
            border: '1px solid #f2e2a4', borderRadius: '8px', maxWidth: '600px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#b56d00' }}>⚠️ Security Check: Is this email safe?</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#555' }}>
              Analyze the sender, subject, and content. Does this look like a legitimate sender or a phishing attempt?
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => handleGuess(true)}
                style={{
                  padding: '10px 24px', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#e6f4ea', 
                  color: '#137333', border: '1px solid #137333', borderRadius: '4px', cursor: 'pointer'
                }}
                className="guess-btn"
              >
                ✅ This is REAL
              </button>
              <button 
                onClick={() => handleGuess(false)}
                style={{
                  padding: '10px 24px', fontSize: '14px', fontWeight: 'bold', backgroundColor: '#fce8e6', 
                  color: '#c5221f', border: '1px solid #c5221f', borderRadius: '4px', cursor: 'pointer'
                }}
                className="guess-btn"
              >
                🚨 This is a SCAM / FAKE
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div style={{ 
            marginTop: '40px', marginLeft: '52px', padding: '24px', 
            backgroundColor: feedback === 'correct' ? '#e6f4ea' : '#fce8e6',
            border: `1px solid ${feedback === 'correct' ? '#ceead6' : '#fad2cf'}`, 
            borderRadius: '8px', maxWidth: '600px'
          }}>
            <h3 style={{ 
              margin: '0 0 12px 0', fontSize: '16px', 
              color: feedback === 'correct' ? '#137333' : '#c5221f' 
            }}>
              {feedback === 'correct' ? '✅ Correct! Good eye.' : '❌ Incorrect. Be careful!'}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#3c4043', lineHeight: '1.5' }}>
              {email.explanation}
            </p>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #5f6368;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          background-color: rgba(60,64,67,0.08);
        }
        .reply-btn:hover {
          background-color: #f8f9fa !important;
        }
        .guess-btn:hover {
          opacity: 0.9;
        }
        .star-icon:hover {
          color: #f4b400 !important;
        }
      `}} />
    </div>
  );
};

export default EmailViewer;
