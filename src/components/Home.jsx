import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Home = () => {
    const startDate = new Date('2026-02-04T00:00:00');
    const [duration, setDuration] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setDuration({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleHearts = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mb-8"
            >
                <div className="relative inline-block">
                    <Heart size={120} className="text-accent-rose fill-accent-rose/20 animate-pulse" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl"
                    >
                        2
                    </motion.div>
                </div>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-8xl mb-2 text-gradient font-serif font-bold italic"
            >
                My Princess
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-10"
            >
                <div className="flex items-center gap-3 text-white/50 text-sm uppercase tracking-[0.3em] font-semibold">
                    <div className="h-[1px] w-8 bg-white/20" />
                    Our Forever Since Feb 4, 2026
                    <div className="h-[1px] w-8 bg-white/20" />
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-serif italic leading-relaxed"
            >
                "Every single day with you is a gift I never knew I deserved. These first two months are just the beginning of our beautiful forever."
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl"
            >
                {[
                    { label: 'Days', value: duration.days },
                    { label: 'Hours', value: duration.hours },
                    { label: 'Minutes', value: duration.minutes },
                    { label: 'Seconds', value: duration.seconds }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        className="glass p-8 flex flex-col items-center justify-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-rose scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                        <span className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">{item.value}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-accent-pink font-bold">{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHearts}
                className="mt-12 px-8 py-4 glass text-lg font-bold text-white border-none cursor-pointer flex items-center gap-2 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Celebrate Us <Heart size={20} fill="currentColor" />
            </motion.button>
        </div>
    );
};

export default Home;
