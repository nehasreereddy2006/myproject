import React, { useEffect, useState } from 'react';

const warnings = [
  { text: '> Misinformation spreading', styles: ['style-yellow', 'style-purple', 'style-green'] },
  { text: '> Security alert critical', styles: ['style-green'] },
  { text: '> Data breach imminent', styles: ['style-blue', 'style-purple'] },
  { text: '> Trust compromised', styles: ['style-yellow'] },
  { text: '> Bot network active', styles: ['style-yellow'] },
  { text: '> Suspicious login detected', styles: ['style-purple'] },
  { text: '> Phishing attempt logged', styles: ['style-purple'] },
  { text: '> Credentials compromised', styles: ['style-blue'] },
  { text: '> Malware injection attempt', styles: ['style-green'] },
  { text: '> Tracking scripts detected', styles: ['style-cyan', 'style-purple'] },
  { text: '> Fake news detected', styles: ['style-blue', 'style-purple'] },
];

const LevelMap = ({ onSelectLevel, level1Completed, onSelectLevel2, level2Completed, onSelectLevel3 }) => {
  const [activeWarnings, setActiveWarnings] = useState(() => {
    const initialWarnings = [];
    for(let i = 0; i < 15; i++) {
        const warningSource = warnings[Math.floor(Math.random() * warnings.length)];
        initialWarnings.push({
            id: `init-${i}`,
            text: warningSource.text,
            styleClass: warningSource.styles[Math.floor(Math.random() * warningSource.styles.length)],
            top: Math.random() * 90 + 5 + '%',
            left: Math.random() * 80 + 5 + '%',
        });
    }
    return initialWarnings;
  });

  useEffect(() => {    const interval = setInterval(() => {
      const warningSource = warnings[Math.floor(Math.random() * warnings.length)];
      const newWarning = {
        id: Date.now(),
        text: warningSource.text,
        styleClass: warningSource.styles[Math.floor(Math.random() * warningSource.styles.length)],
        top: Math.random() * 90 + 5 + '%',
        left: Math.random() * 80 + 5 + '%'
      };
      
      setActiveWarnings(prev => [...prev.slice(-15), newWarning]); // keep max 16
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="level-map">
      {activeWarnings.map(warning => (
        <div 
          key={warning.id} 
          className={`map-background-text ${warning.styleClass}`}
          style={{ top: warning.top, left: warning.left }}
        >
          {warning.text}
        </div>
      ))}

      <div className="level-nodes">
        {/* Level 1 Node */}
        <div 
            className="level-node-container" 
            style={{ top: '35%', left: '30%', animationDelay: '0s' }}
        >
            <div className={`level-node ${level1Completed ? 'completed' : 'unlocked'}`} onClick={onSelectLevel}>
                <span className="number">1</span>
                <span className="label">LEVEL</span>
            </div>
            <div className="node-title">&gt; Algorithmic influence</div>
        </div>

        {/* Level 2 Node */}
        <div 
            className="level-node-container" 
            style={{ top: '25%', left: '60%', animationDelay: '1s' }}
        >
            <div 
                className={`level-node ${level1Completed ? 'unlocked glow-blue' : 'locked'}`} 
                onClick={level1Completed ? onSelectLevel2 : undefined}
                style={{ cursor: level1Completed ? 'pointer' : 'default' }}
            >
                <span className="number">2</span>
                <span className="label">LEVEL</span>
            </div>
            {level1Completed && <div className="node-title">&gt; Social engineering</div>}
        </div>

        {/* Level 3 Node */}
        <div 
            className="level-node-container" 
            style={{ top: '60%', left: '42%', animationDelay: '2s' }}
        >
            <div 
                className={`level-node ${level2Completed ? 'unlocked glow-purple' : 'locked'}`}
                onClick={level2Completed ? onSelectLevel3 : undefined}
                style={{ cursor: level2Completed ? 'pointer' : 'default' }}
            >
                <span className="number">3</span>
                <span className="label">LEVEL</span>
            </div>
            {level2Completed && <div className="node-title">&gt; Malicious QR Codes</div>}
        </div>



      </div>
    </div>
  );
};

export default LevelMap;
