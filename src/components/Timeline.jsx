import React from 'react';
import { motion } from 'framer-motion';
import { MessageHeart, Heart, Users, Sparkles } from 'lucide-react';

const timelineData = [
    {
        date: 'Feb 4, 2026',
        title: 'The First Spark',
        description: 'Our very first chat... and the moment I knew. I told you I loved you for the first time.',
        icon: <MessageHeart size={24} className="text-accent-rose" />,
        color: 'from-pink-500 to-rose-500'
    },
    {
        date: 'Feb 14, 2026',
        title: 'A Valentine’s Dream',
        description: 'At 11:52 PM, you said those three magical words back to me. My heart finally found its home.',
        icon: <Heart size={24} className="text-red-500" fill="currentColor" />,
        color: 'from-rose-500 to-red-600'
    },
    {
        date: 'Apr 1, 2026',
        title: 'The First Meet',
        description: 'Finally meeting you in person. Seeing your smile for the first time was more than I ever imagined.',
        icon: <Users size={24} className="text-blue-500" />,
        color: 'from-blue-500 to-indigo-600'
    },
    {
        date: 'Today',
        title: 'Two Months Together',
        description: 'Two months of laughter, love, and beautiful memories. Here’s to many more.',
        icon: <Sparkles size={24} className="text-yellow-500" />,
        color: 'from-yellow-400 to-orange-500'
    }
];

const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center justify-center mb-16 relative w-full lg:max-w-4xl mx-auto`}
        >
            {/* Date Bubble */}
            <div className={`hidden md:flex w-1/2 justify-end pr-10 ${!isEven ? 'md:order-3 md:justify-start md:pl-10' : ''}`}>
                <span className="text-2xl font-serif text-white/50">{item.date}</span>
            </div>

            {/* Central Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border-2 border-accent-rose flex items-center justify-center z-10 bg-black">
                {item.icon}
            </div>

            {/* Content Box */}
            <div className={`w-full md:w-[45%] mt-8 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right md:order-1'}`}>
                <div className="glass p-8 md:p-10 hover:shadow-[0_0_30px_rgba(255,117,143,0.2)] transition-all duration-500">
                    <span className="md:hidden text-accent-pink font-bold uppercase tracking-widest text-xs mb-3 block">{item.date}</span>
                    <h3 className="text-3xl font-serif mb-4 text-white leading-tight">{item.title}</h3>
                    <div className={`h-0.5 w-12 bg-accent-rose mb-4 ${isEven ? '' : 'ml-auto'}`} />
                    <p className="text-white/70 text-lg leading-relaxed font-serif italic">"{item.description}"</p>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <div className="py-10 relative">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-20 text-gradient">Our Journey</h2>
            
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-40 bottom-20 w-0.5 bg-gradient-to-b from-accent-rose/20 via-accent-rose to-accent-rose/20 hidden md:block" />

            <div className="relative">
                {timelineData.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
