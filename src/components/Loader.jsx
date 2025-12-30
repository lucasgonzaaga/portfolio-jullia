import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500); // reduced slightly for better UX
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[10000] bg-gray-900 flex items-center justify-center text-white"
        >
            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-serif font-bold italic"
                >
                    Doula Maju
                </motion.h1>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-2 bg-primary-500"
            />
        </motion.div>
    );
};

export default Loader;
