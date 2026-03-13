import React, { useState, useMemo } from 'react';
import MessageViewer from './MessageViewer';
import { contacts, shuffleArray } from '../GameLogic';

const MessagesApp = ({ onBack, onSolve }) => {
  const [shuffledContacts] = useState(() => shuffleArray(contacts));
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    return shuffledContacts.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.history[contact.history.length - 1].text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [shuffledContacts, searchQuery]);

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      backgroundColor: '#111b21',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#e9edef',
      overflow: 'hidden'
    }} className="whatsapp-container">
      
      {/* Sidebar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        minWidth: '350px',
        borderRight: '1px solid #222d34',
        backgroundColor: '#111b21'
      }}>
        {/* Sidebar Header */}
        <div style={{
          height: '59px', backgroundColor: '#202c33', display: 'flex', alignItems: 'center',
          padding: '10px 16px', boxSizing: 'border-box', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={onBack} title="Back to Map" style={{
              background: 'none', border: 'none', color: '#aebac1', fontSize: '20px', cursor: 'pointer'
            }}>⬅️</button>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#6b7c85',
              backgroundImage: 'url("https://ui-avatars.com/api/?name=You&background=random")', backgroundSize: 'cover'
            }}></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#aebac1', fontSize: '20px' }}>
            <button style={{ background: 'none', border: 'none', color: '#aebac1', fontSize: '20px', cursor: 'pointer' }}>👥</button>
            <button style={{ background: 'none', border: 'none', color: '#aebac1', fontSize: '20px', cursor: 'pointer' }}>Donut</button>
            <button style={{ background: 'none', border: 'none', color: '#aebac1', fontSize: '20px', cursor: 'pointer' }}>💬</button>
            <button style={{ background: 'none', border: 'none', color: '#aebac1', fontSize: '20px', cursor: 'pointer' }}>⋮</button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #222d34' }}>
          <div style={{
            backgroundColor: '#202c33', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 12px', height: '35px'
          }}>
            <span style={{ color: '#aebac1', marginRight: '16px', fontSize: '14px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search or start new chat" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: 'transparent', border: 'none', color: '#d1d7db', width: '100%', outline: 'none', fontSize: '15px'
              }}
            />
          </div>
        </div>

        {/* Contact List */}
        <div style={{ flex: 1, overflowY: 'auto' }} className="contact-list">
          {filteredContacts.map((contact, index) => {
            const isSelected = selectedContact && selectedContact.id === contact.id;
            // random online status just for UI visually
            const isOnline = index % 3 === 0;
            const unreadCount = index % 4 === 1 ? 1 : 0;
            
            return (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                style={{
                  display: 'flex', alignItems: 'center', padding: '10px 12px', cursor: 'pointer',
                  backgroundColor: isSelected ? '#2a3942' : 'transparent',
                }}
                className="contact-item"
              >
                <div style={{ position: 'relative', width: '49px', height: '49px', marginRight: '15px', flexShrink: 0 }}>
                  <div style={{ 
                    width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#00a884',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px'
                  }}>
                    {contact.avatar}
                  </div>
                  {isOnline && (
                    <div style={{
                      position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px',
                      backgroundColor: '#00a884', borderRadius: '50%', border: '2px solid #111b21'
                    }}></div>
                  )}
                </div>
                
                <div style={{ flex: 1, borderBottom: isSelected ? 'none' : '1px solid #222d34', paddingBottom: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '17px', color: '#e9edef', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.name}
                    </span>
                    <span style={{ fontSize: '12px', color: unreadCount ? '#00a884' : '#8696a0' }}>
                      11:30 AM
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#8696a0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                      {contact.history[contact.history.length - 1].text}
                    </span>
                    {unreadCount > 0 && (
                      <span style={{
                        backgroundColor: '#00a884', color: '#111b21', borderRadius: '10px', minWidth: '20px',
                        height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '12px', fontWeight: 'bold', marginLeft: '6px'
                      }}>
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#222e35',
        position: 'relative'
      }}>
        {selectedContact ? (
          <MessageViewer 
            contact={selectedContact} 
            onSolve={onSolve}
          />
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '6px solid #00a884' }}>
            <div style={{ fontSize: '100px', marginBottom: '32px' }}>📱</div>
            <h1 style={{ fontSize: '32px', color: '#e9edef', fontWeight: '300', marginBottom: '16px' }}>WhatsApp Web</h1>
            <p style={{ color: '#8696a0', fontSize: '14px', lineHeight: '20px', textAlign: 'center', maxWidth: '400px' }}>
              Send and receive messages without keeping your phone online.<br/>
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-item:hover {
          background-color: #202c33;
        }
        .contact-list::-webkit-scrollbar {
          width: 6px;
        }
        .contact-list::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.16);
        }
      `}} />
    </div>
  );
};

export default MessagesApp;
