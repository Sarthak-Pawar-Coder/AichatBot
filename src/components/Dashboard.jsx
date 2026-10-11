import React, { useState } from 'react';
import { motion } from 'motion/react';
import Sidebar from './Sidebar';
import HeroSection from './HeroSection';
import ChatComposer from './ChatComposer';
import QuickActions from './QuickActions';
import FeatureCards from './FeatureCards';
import Footer from './Footer';

export default function Dashboard({
  onStartChat,
  onOpenFeatureModal,
  onNewChat
}) {
  const [activeNav, setActiveNav] = useState('home');
  const [composerPrompt, setComposerPrompt] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavSelect = (id) => {
    setActiveNav(id);
    if (id === 'home') {
      // already on home
    } else if (id === 'chat') {
      onStartChat("Hello Zeal AI! What capabilities can you assist me with today?");
    } else {
      onOpenFeatureModal(id);
    }
  };

  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'new-chat':
        onNewChat();
        setComposerPrompt('');
        break;
      case 'python':
        setComposerPrompt('Write a clean, optimized Python implementation with benchmark tests for: ');
        break;
      case 'research':
        setComposerPrompt('Summarize the recent academic state-of-the-art literature on: ');
        break;
      case 'dataset':
        onOpenFeatureModal('datasets');
        break;
      case 'agent':
        onOpenFeatureModal('agents');
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      className="relative z-10 w-full min-h-screen flex flex-col md:flex-row p-3 sm:p-5 lg:p-6 gap-4 lg:gap-6 max-w-[1600px] mx-auto overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={handleNavSelect}
        onOpenFaculty={() => onOpenFeatureModal('faculty')}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Dashboard Container */}
      <main className="flex-1 min-w-0 max-w-5xl mx-auto w-full flex flex-col justify-between py-1">
        <div className="space-y-3 sm:space-y-3.5">
          {/* Section 1: Hero Section & Top Status Controls */}
          <HeroSection
            onOpenAiStatus={() => onOpenFeatureModal('status')}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          {/* Section 2: AI Chat Composer */}
          <ChatComposer
            initialPrompt={composerPrompt}
            onSubmit={(msg) => onStartChat(msg)}
          />

          {/* Section 3: Quick Action Buttons */}
          <QuickActions
            onNewChat={() => handleQuickAction('new-chat')}
            onPythonOptimizer={() => handleQuickAction('python')}
            onResearchPaperHelper={() => handleQuickAction('research')}
            onDatasetExplorer={() => handleQuickAction('dataset')}
            onAgentBuilder={() => handleQuickAction('agent')}
          />

          {/* Section 4: Compact Feature Cards */}
          <FeatureCards
            onSelectFeature={(featureId) => onOpenFeatureModal(featureId)}
          />
        </div>

        {/* Global Footer */}
        <Footer onOpenFaculty={() => onOpenFeatureModal('faculty')} />
      </main>
    </motion.div>
  );
}
