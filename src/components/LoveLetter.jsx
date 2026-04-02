import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, HeartHandshake } from 'lucide-react';

const LoveLetter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const letterContent = {
        title: "My Dearest Love,",
        paragraphs: [
            "These past two months have been the most incredible chapter of my life. From our very first chat on Feb 4th to finally seeing your smile on Apr 1st, every second with you has been a gift.",
            "I remember exactly how my heart skipped a beat when you first said 'I love you' back to me on Valentine's Day. It's a moment I'll carry with me forever.",
            "You are my happiness, my peace, and my greatest adventure. Thank you for being you, and for choosing me every single day.",
            "I love you more than words can ever say. Happy Two Months, Princess."
        ],
        signature: "Yours Forever,"
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-gradient">A Message For You</h2>
            
            <div className="relative w-full max-w-2xl flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="envelope"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0, y: -100 }}
                            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                            onClick={() => setIsOpen(true)}
                            className="w-full h-64 md:h-80 glass flex flex-col items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(255,77,109,0.3)] relative group border-2 border-accent-rose/30"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            
                            {/* Envelope Flap Detail */}
                            <div className="absolute top-0 left-0 w-full h-1/2 border-b border-white/10 origin-top bg-white/5" />
                            
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="z-10"
                            >
                                <Heart size={60} fill="#ff4d6d" className="text-accent-rose" />
                            </motion.div>
                            
                            <p className="mt-6 text-white font-serif text-xl italic z-10 group-hover:text-accent-pink transition-colors">
                                From My Heart to Yours
                            </p>
                            
                            <div className="mt-4 flex gap-2 text-white/40 text-xs tracking-[0.2em] uppercase z-10">
                                <Send size={14} /> Open Me
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="letter"
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                            className="w-full glass p-8 md:p-12 shadow-2xl relative overflow-hidden bg-white/10"
                        >
                            {/* Paper Texture Effect */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-serif text-accent-pink mb-8 italic">{letterContent.title}</h3>
                                
                                {letterContent.paragraphs.map((p, i) => (
                                    <p key={i} className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 font-serif italic">
                                        {p}
                                    </p>
                                ))}
                                
                                <div className="mt-12 text-right">
                                    <p className="text-white/60 font-serif text-lg">{letterContent.signature}</p>
                                    <p className="text-2xl font-serif text-accent-rose font-bold">Your Love</p>
                                    <div className="flex justify-end gap-2 mt-4 text-accent-rose">
                                        <HeartHandshake size={24} />
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-sm uppercase tracking-widest"
                            >
                                Close
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoveLetter;
