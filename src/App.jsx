import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import AnimatedBackground from './components/AnimatedBackground';
import CinematicLanding from './components/CinematicLanding';
import ChatPage from './components/ChatPage';
import { useChat } from './hooks/useChat';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const { messages, isStreaming, sendMessage, stopStreaming, clearMessages } = useChat();

  const handleStartChat = useCallback((initialMessage) => {
    setCurrentView('chat');
    setTimeout(() => {
      sendMessage(initialMessage);
    }, 200);
  }, [sendMessage]);

  const handleNewChat = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

  const handleBackToLanding = useCallback(() => {
    setCurrentView('landing');
  }, []);

  return (
    <div className={`relative w-full min-h-[100dvh] bg-black text-white ${
      currentView === 'landing' ? 'min-h-[100dvh] overflow-y-auto overflow-x-hidden' : 'h-[100dvh] overflow-hidden'
    }`}>
      {/* Living Cinematic Moving Background */}
      <AnimatedBackground />

      {/* Main View Transition: Cinematic Landing <-> Conversation Thread */}
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <CinematicLanding
            key="landing"
            onStartChat={handleStartChat}
          />
        ) : (
          <ChatPage
            key="chat"
            messages={messages}
            isStreaming={isStreaming}
            onSendMessage={sendMessage}
            onStopStreaming={stopStreaming}
            onNewChat={handleNewChat}
            onBackToDashboard={handleBackToLanding}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
