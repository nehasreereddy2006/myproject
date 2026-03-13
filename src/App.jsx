import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import LevelMap from './components/LevelMap';
import LevelTransition from './components/LevelTransition';
import IconSelector from './components/IconSelector';
import EmailInbox from './components/EmailInbox';
import MessagesApp from './components/MessagesApp';
import MiniGameUnlock from './components/MiniGameUnlock';
import MemoryCardGame from './components/MemoryCardGame';
import BadgeReward from './components/BadgeReward';
import InstagramFeed from './components/InstagramFeed';
import EmojiDecodeGame from './components/EmojiDecodeGame';
import BadgeRewardLevel2 from './components/BadgeRewardLevel2';
import LevelTransition2 from './components/LevelTransition2';
import LevelTransition3 from './components/LevelTransition3';
import QRChallenge from './components/QRChallenge';
import MiniGameCipher from './components/MiniGameCipher';
import Level3Badge from './components/Level3Badge';
import FinalCompletionSequence from './components/FinalCompletionSequence';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); 
  const [emailSolved, setEmailSolved] = useState(false);
  const [messageSolved, setMessageSolved] = useState(false);
  const [miniGameUnlocked, setMiniGameUnlocked] = useState(false);
  
  // Level 2 States
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);

  useEffect(() => {
    if (emailSolved && messageSolved && !miniGameUnlocked) {
      setTimeout(() => {
        setMiniGameUnlocked(true);
        setCurrentScreen('minigame_unlock');
      }, 0);
    }
  }, [emailSolved, messageSolved, miniGameUnlocked]);

  const handleStart = () => setCurrentScreen('map');
  const handleLevelSelect = () => setCurrentScreen('transition');
  const handleLevel2Select = () => setCurrentScreen('transition2');
  const handleTransitionComplete = () => setCurrentScreen('selector');
  const handleTransition2Complete = () => setCurrentScreen('instagram');

  const handleAppSelect = (app) => {
    if (app === 'gmail') setCurrentScreen('email');
    if (app === 'messages') setCurrentScreen('messages');
  };
  const handleBackToMap = () => setCurrentScreen('map');

  return (
    <div className="app-container">
      {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
      {currentScreen === 'map' && <LevelMap onSelectLevel={handleLevelSelect} level1Completed={level1Completed} onSelectLevel2={handleLevel2Select} level2Completed={level2Completed} onSelectLevel3={() => setCurrentScreen('transition3')} />}
      {currentScreen === 'transition' && <LevelTransition onComplete={handleTransitionComplete} />}
      {currentScreen === 'transition2' && <LevelTransition2 onComplete={handleTransition2Complete} />}
      {currentScreen === 'selector' && (
        <IconSelector onSelectApp={handleAppSelect} onBack={handleBackToMap} />
      )}
      {currentScreen === 'email' && (
        <EmailInbox 
          onBack={() => setCurrentScreen('selector')} 
          onSolve={() => setEmailSolved(true)} 
        />
      )}
      {currentScreen === 'messages' && (
        <MessagesApp 
          onBack={() => setCurrentScreen('selector')} 
          onSolve={() => setMessageSolved(true)} 
        />
      )}
      {currentScreen === 'minigame_unlock' && (
        <MiniGameUnlock onPlay={() => setCurrentScreen('minigame')} />
      )}
      {currentScreen === 'minigame' && (
        <MemoryCardGame onWin={() => setCurrentScreen('badge_reward')} />
      )}
      {currentScreen === 'badge_reward' && (
        <BadgeReward 
          onReturnMap={() => setCurrentScreen('map')} 
          onNextLevel={() => {
            setLevel1Completed(true);
            setCurrentScreen('map');
          }} 
        />
      )}
      {currentScreen === 'instagram' && (
        <InstagramFeed onUnlockMiniGame={() => setCurrentScreen('minigame2_unlock')} />
      )}
      {currentScreen === 'minigame2_unlock' && (
        <MiniGameUnlock onPlay={() => setCurrentScreen('emoji_game')} title="🔓 MINI GAME UNLOCKED" />
      )}
      {currentScreen === 'emoji_game' && (
        <EmojiDecodeGame onWin={() => setCurrentScreen('badge_reward2')} onTimeUp={() => setCurrentScreen('emoji_game')} />
      )}
      {currentScreen === 'badge_reward2' && (
        <BadgeRewardLevel2 
          onReturnMap={() => setCurrentScreen('map')} 
          onNextLevel={() => {
            setLevel2Completed(true);
            setCurrentScreen('transition3');
          }} 
        />
      )}
      {currentScreen === 'transition3' && <LevelTransition3 onComplete={() => setCurrentScreen('qr_challenge')} />}
      {currentScreen === 'qr_challenge' && (
        <QRChallenge onComplete={() => setCurrentScreen('minigame3_unlock')} onReturnMap={() => setCurrentScreen('map')} />
      )}
      {currentScreen === 'minigame3_unlock' && (
        <MiniGameUnlock onPlay={() => setCurrentScreen('cipher_game')} title="🔓 MINI GAME UNLOCKED" />
      )}
      {currentScreen === 'cipher_game' && (
        <MiniGameCipher 
          onWin={() => setCurrentScreen('badge_reward3')} 
          onReturnMap={() => setCurrentScreen('map')} 
        />
      )}
      {currentScreen === 'badge_reward3' && (
        <Level3Badge 
          onReturnMap={() => setCurrentScreen('map')} 
          onNextLevel={() => {
            setCurrentScreen('final_completion');
          }} 
        />
      )}
      {currentScreen === 'final_completion' && (
        <FinalCompletionSequence />
      )}
    </div>
  );
}

export default App;
