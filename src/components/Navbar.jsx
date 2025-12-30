import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar after scrolling 100vh
            setIsVisible(window.scrollY > window.innerHeight * 0.8);

            // Detection Logic: Find all sections with data-theme
            const sections = document.querySelectorAll('[data-theme]');
            let currentIsDark = false;
            const scrollPos = window.scrollY + 80;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;

                if (scrollPos >= top && scrollPos <= bottom) {
                    if (section.getAttribute('data-theme') === 'dark') {
                        currentIsDark = true;
                    }
                }
            });
            setIsDarkSection(currentIsDark);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: "Início", href: "#hero" },
        { title: "Quem Sou", href: "#about" },
        { title: "O que é Doula", href: "#doula-info" },
        { title: "Serviços", href: "#services" },
        { title: "Contatos", href: "#contact" },
    ];

    // Dynamic classes based on background
    const textColor = isDarkSection ? 'text-white' : 'text-gray-900';
    const logoBg = isDarkSection ? 'bg-white/20 backdrop-blur-md' : 'bg-primary-100';
    const logoIcon = isDarkSection ? 'text-white' : 'text-primary-600';
    const buttonClass = isDarkSection
        ? 'bg-white text-primary-950 hover:bg-gray-100'
        : 'bg-primary-950 text-white hover:bg-primary-900';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 py-6 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className={`p-2 rounded-full transition-colors duration-300 ${logoBg}`}>
                            <Heart className={`w-6 h-6 fill-current transition-colors duration-300 ${logoIcon}`} />
                        </div>
                        <span className={`font-serif text-2xl font-bold transition-colors duration-300 ${textColor}`}>
                            Doula Maju
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors duration-300 uppercase tracking-widest hover:opacity-70 ${textColor}`}
                                >
                                    {link.title}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 shadow-lg ${buttonClass}`}
                            >
                                Fale Comigo
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 inline-flex items-center justify-center rounded-md focus:outline-none transition-colors duration-300 ${textColor}`}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden absolute top-full left-0 w-full shadow-xl"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-900 hover:text-primary-600 block px-3 py-4 rounded-md text-base font-bold uppercase tracking-wider border-b border-gray-100 last:border-0"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
