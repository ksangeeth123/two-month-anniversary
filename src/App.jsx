import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Calendar, Image as ImageIcon, MessageCircle, Music, Menu, X } from 'lucide-react'
import Home from './components/Home'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import LoveLetter from './components/LoveLetter'
import HeartBackground from './components/HeartBackground'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3')) // Romantic-ish piano loop

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: <Heart size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar size={20} /> },
    { id: 'letter', label: 'Letter', icon: <MessageCircle size={20} /> },
  ]

  return (
    <div className="relative min-height-screen">
      <HeartBackground />
      
      {/* Navigation - Mobile Optimized */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass m-4 border-none shadow-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Heart className="text-accent-rose animate-pulse" fill="#ff4d6d" />
            <span className="font-serif font-bold text-xl tracking-wide">Our Story</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'text-accent-rose' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="flex flex-col gap-4 p-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center gap-4 text-lg font-medium transition-colors ${
                      activeTab === tab.id ? 'text-accent-rose' : 'text-white/60'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-10 container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <Home />}
            {activeTab === 'gallery' && <Gallery />}
            {activeTab === 'timeline' && <Timeline />}
            {activeTab === 'letter' && <LoveLetter />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Music Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMusic}
          className={`p-4 rounded-full glass border-none shadow-lg transition-all duration-500 hover:scale-110 ${
            isPlaying ? 'text-accent-rose bg-white/10 ring-2 ring-accent-rose/50' : 'text-white/40'
          }`}
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Music size={24} />
          </motion.div>
          
          {isPlaying && (
            <motion.div
              layoutId="playing-indicator"
              className="absolute -top-1 -right-1 w-3 h-3 bg-accent-rose rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default App
