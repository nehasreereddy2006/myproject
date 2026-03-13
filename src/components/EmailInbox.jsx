import React, { useState, useMemo } from 'react';
import EmailViewer from './EmailViewer';
import { sampleEmails, shuffleArray } from '../GameLogic';

const EmailInbox = ({ onBack, onSolve }) => {
  const [emails, setEmails] = useState(() => shuffleArray(sampleEmails));
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sidebarActive, setSidebarActive] = useState('inbox');
  const searchInputRef = React.useRef(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'c') {
        e.preventDefault();
        setIsComposeOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'e' && selectedIds.size > 0) {
        e.preventDefault();
        handleBulkAction('archive');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds]);

  const filteredEmails = useMemo(() => {
    return emails.filter(email => 
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [emails, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEmails.length && filteredEmails.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEmails.map(e => e.id)));
    }
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    const newDocs = new Set(selectedIds);
    if (newDocs.has(id)) newDocs.delete(id);
    else newDocs.add(id);
    setSelectedIds(newDocs);
  };

  const handleBulkAction = (action) => {
    // Just a visual feature for visual simulation
    if (action === 'delete') {
      setEmails(emails.filter(e => !selectedIds.has(e.id)));
      setSelectedIds(new Set());
    }
  };

  const menuItems = [
    { id: 'inbox', icon: '📥', label: 'Inbox' },
    { id: 'starred', icon: '⭐', label: 'Starred' },
    { id: 'snoozed', icon: '⏰', label: 'Snoozed' },
    { id: 'sent', icon: '📤', label: 'Sent' },
    { id: 'drafts', icon: '📝', label: 'Drafts' },
    { id: 'spam', icon: '⚠️', label: 'Spam' },
    { id: 'trash', icon: '🗑️', label: 'Trash' }
  ];

  if (selectedEmail) {
    return (
      <EmailViewer 
        email={selectedEmail} 
        onBack={() => {
          setSelectedEmail(null);
          // if they complete minigame context here, perhaps onSolve handles it
        }} 
        onSolve={onSolve}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: '#f6f8fc',
      fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
      color: '#202124',
      overflow: 'hidden'
    }}>
      {/* Top Navbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        height: '64px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '238px', paddingLeft: '12px' }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '12px', borderRadius: '50%', color: '#5f6368', marginRight: '4px'
          }} className="hover-circle">
            ⬅️
          </button>
          <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="Gmail" style={{ height: '40px' }}/>
        </div>

        <div style={{
          flex: 1,
          maxWidth: '720px',
          backgroundColor: '#f1f3f4',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          height: '48px',
          transition: 'background-color 0.2s, box-shadow 0.2s',
          border: '1px solid transparent'
        }} className="search-box">
          <span style={{ color: '#5f6368', fontSize: '20px', marginRight: '12px' }}>🔍</span>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search mail (press / to focus)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '16px',
              width: '100%',
              color: '#202124'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, paddingRight: '12px', gap: '8px' }}>
          <button className="icon-btn">⚙️</button>
          <button className="icon-btn">▦</button>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1a73e8', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginLeft: '8px', cursor: 'pointer'
          }}>
            U
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: '256px', display: 'flex', flexDirection: 'column', backgroundColor: '#f6f8fc', paddingRight: '16px', boxSizing: 'border-box' }}>
          <div style={{ padding: '16px 8px 16px 16px' }}>
            <button 
              onClick={() => setIsComposeOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#c2e7ff', color: '#001d35',
                border: 'none', borderRadius: '16px', padding: '16px 24px', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)', transition: 'box-shadow 0.2s'
              }}
              className="compose-btn"
            >
              <span style={{ fontSize: '20px' }}>✏️</span> Compose
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {menuItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSidebarActive(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', padding: '0 12px 0 26px', height: '32px', cursor: 'pointer',
                  backgroundColor: sidebarActive === item.id ? '#d3e3fd' : 'transparent',
                  color: sidebarActive === item.id ? '#041e49' : '#202124',
                  borderTopRightRadius: '16px', borderBottomRightRadius: '16px', marginRight: '16px', fontSize: '14px',
                  fontWeight: sidebarActive === item.id ? 'bold' : 'normal'
                }}
                className={`sidebar-item ${sidebarActive === item.id ? 'active' : ''}`}
              >
                <span style={{ width: '24px', marginRight: '18px', textAlign: 'center', fontSize: '16px', color: sidebarActive === item.id ? '#041e49' : '#5f6368' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
            
            <div style={{ margin: '16px 0', borderTop: '1px solid #dadce0' }}></div>
            <div style={{ padding: '0 26px', color: '#5f6368', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Labels</div>
            <div className="sidebar-item" style={{ display: 'flex', alignItems: 'center', padding: '0 12px 0 26px', height: '32px', cursor: 'pointer', color: '#202124', fontSize: '14px' }}>
              <span style={{ width: '24px', marginRight: '18px', color: '#5f6368' }}>🏷️</span> Work
            </div>
            <div className="sidebar-item" style={{ display: 'flex', alignItems: 'center', padding: '0 12px 0 26px', height: '32px', cursor: 'pointer', color: '#202124', fontSize: '14px' }}>
              <span style={{ width: '24px', marginRight: '18px', color: '#5f6368' }}>🏷️</span> Personal
            </div>
          </div>
        </div>

        {/* Email List Panel */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '16px', margin: '0 16px 16px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3)' }}>
          {/* List Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #e0e0e0', height: '48px', boxSizing: 'border-box' }}>
            <input 
              type="checkbox" 
              checked={selectedIds.size === filteredEmails.length && filteredEmails.length > 0}
              onChange={toggleSelectAll}
              style={{ marginRight: '16px', cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <button className="icon-btn" style={{ fontSize: '14px', marginRight: '8px' }}>↻</button>
            <button className="icon-btn" style={{ fontSize: '14px' }}>⋮</button>
            
            {selectedIds.size > 0 && (
              <div style={{ display: 'flex', marginLeft: '16px', paddingLeft: '16px', borderLeft: '1px solid #e0e0e0', gap: '8px' }}>
                <button className="icon-btn" title="Archive" onClick={() => handleBulkAction('archive')}>📥</button>
                <button className="icon-btn" title="Report spam">⚠️</button>
                <button className="icon-btn" title="Delete" onClick={() => handleBulkAction('delete')}>🗑️</button>
                <button className="icon-btn" title="Mark as read">✉️</button>
              </div>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredEmails.map((email, index) => {
              const checked = selectedIds.has(email.id);
              return (
                <div 
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '0 16px', height: '40px', borderBottom: '1px solid #e0e0e0',
                    backgroundColor: checked ? '#c2e7ff' : '#fff',
                    cursor: 'pointer', fontSize: '14px',
                    boxShadow: checked ? 'inset 1px 0 0 #0b57d0' : 'none'
                  }}
                  className="email-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '64px', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={checked}
                      onChange={(e) => toggleSelect(email.id, e)}
                      style={{ marginRight: '16px', cursor: 'pointer', width: '16px', height: '16px' }}
                    />
                    <span style={{ color: '#ccc', cursor: 'pointer', fontSize: '18px' }} className="star-icon">☆</span>
                  </div>
                  
                  <div style={{ width: '168px', fontWeight: 'bold', color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '16px' }}>
                    {email.sender}
                  </div>
                  
                  <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#202124', display: 'flex' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{email.subject}</span>
                    <span style={{ color: '#5f6368' }}>- {email.preview}</span>
                  </div>
                  
                  <div style={{ width: '80px', textAlign: 'right', color: '#5f6368', fontSize: '12px', fontWeight: 'bold' }} className="email-time">
                    {email.time}
                  </div>
                  
                  <div className="email-actions" style={{ display: 'none', width: '80px', justifyContent: 'flex-end', gap: '8px' }}>
                    <span title="Archive" onClick={(e) => { e.stopPropagation(); handleBulkAction('archive'); }} style={{ cursor: 'pointer' }}>📥</span>
                    <span title="Delete" onClick={(e) => { e.stopPropagation(); handleBulkAction('delete'); }} style={{ cursor: 'pointer' }}>🗑️</span>
                    <span title="Mark as read" style={{ cursor: 'pointer' }}>✉️</span>
                  </div>
                </div>
              );
            })}
            
            {filteredEmails.length === 0 && (
              <div style={{ padding: '32px', textAlign: 'center', color: '#5f6368' }}>
                No emails found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
        <div style={{
          position: 'fixed', bottom: 0, right: '72px', width: '500px', height: '500px', backgroundColor: '#fff',
          borderTopLeftRadius: '8px', borderTopRightRadius: '8px', boxShadow: '0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12), 0px 5px 5px -3px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: '#f2f6fc', padding: '10px 16px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#041e49', fontWeight: 'bold', fontSize: '14px'
          }}>
            <span>New Message</span>
            <div style={{ display: 'flex', gap: '16px', color: '#444' }}>
              <span style={{ cursor: 'pointer' }}>_</span>
              <span style={{ cursor: 'pointer' }}>↗</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsComposeOpen(false)}>✖</span>
            </div>
          </div>
          
          <div style={{ padding: '0', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ borderBottom: '1px solid #f1f3f4', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <span style={{ color: '#5f6368', fontSize: '14px', marginRight: '8px' }}>To</span>
              <input type="text" style={{ flex: 1, border: 'none', outline: 'none', height: '36px', fontSize: '14px' }} />
              <span style={{ color: '#5f6368', fontSize: '12px', cursor: 'pointer', padding: '4px' }}>Cc Bcc</span>
            </div>
            <div style={{ borderBottom: '1px solid #f1f3f4', padding: '0 16px' }}>
              <input type="text" placeholder="Subject" style={{ width: '100%', border: 'none', outline: 'none', height: '36px', fontSize: '14px' }} />
            </div>
            <textarea style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', padding: '16px', fontSize: '14px', fontFamily: '"Google Sans", Roboto, Arial, sans-serif' }}></textarea>
          </div>
          
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #f1f3f4' }}>
            <button
              onClick={() => setIsComposeOpen(false)}
              style={{ 
                backgroundColor: '#0b57d0', color: '#fff', border: 'none', borderRadius: '18px', padding: '8px 24px', 
                fontSize: '14px', fontWeight: '500', cursor: 'pointer'
              }}
            >
              Send
            </button>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Formatting options">A_</span>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Attach files">📎</span>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Insert link">🔗</span>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Insert emoji">😀</span>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Insert files using Drive">📁</span>
            
            <div style={{ flex: 1 }}></div>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }}>⋮</span>
            <span style={{ cursor: 'pointer', fontSize: '16px', color: '#444' }} title="Discard draft" onClick={() => setIsComposeOpen(false)}>🗑️</span>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .search-box:focus-within {
          background-color: #fff !important;
          box-shadow: 0 1px 1px 0 rgba(65,69,73,0.3), 0 1px 3px 1px rgba(65,69,73,0.15);
        }
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #5f6368;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          background-color: rgba(60,64,67,0.08);
        }
        .hover-circle:hover {
          background-color: rgba(60,64,67,0.08);
        }
        .compose-btn:hover {
          box-shadow: 0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15) !important;
        }
        .sidebar-item:not(.active):hover {
          background-color: rgba(60,64,67,0.08) !important;
        }
        .email-row:hover {
          box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15) !important;
          z-index: 1;
        }
        .email-row:hover .email-time {
          display: none !important;
        }
        .email-row:hover .email-actions {
          display: flex !important;
        }
        .star-icon:hover {
          color: #f4b400 !important;
        }
      `}} />
    </div>
  );
};

export default EmailInbox;
