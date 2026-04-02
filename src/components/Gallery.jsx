import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
    { url: '/WhatsApp Image 2026-04-02 at 6.29.46 PM.jpeg', title: 'Sweet Moments' },
    { url: '/WhatsApp Image 2026-04-02 at 6.34.14 PM.jpeg', title: 'Our Happiness' },
    { url: '/WhatsApp Image 2026-04-02 at 6.39.01 PM.jpeg', title: 'Together Always' },
    { url: '/WhatsApp Image 2026-04-02 at 7.20.57 PM.jpeg', title: 'Beautiful Memories' },
    { url: '/WhatsApp Image 2026-04-02 at 7.23.58 PM.jpeg', title: 'My Everything' }
];

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div className="px-4 py-10">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-12 text-gradient">Our Gallery</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -12 }}
                        onClick={() => setSelectedImg(img)}
                        className="glass overflow-hidden cursor-pointer group relative aspect-[4/5] border-none"
                    >
                        <img 
                            src={img.url} 
                            alt={img.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                className="text-white font-serif text-2xl italic mb-2"
                            >
                                {img.title}
                            </motion.p>
                            <div className="h-1 w-12 bg-accent-rose rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                        
                        {/* Glass Border Glow */}
                        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-colors duration-500 rounded-[24px] pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-accent-rose transition-colors">
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            src={selectedImg.url}
                            alt={selectedImg.title}
                            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
