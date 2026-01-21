import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "doulamajuu@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" data-theme="dark" className="relative py-32 bg-primary-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.85] font-serif font-bold tracking-tighter mix-blend-difference"
                    >
                        Vamos <br />
                        <span className="text-secondary-400 italic">Conversar?</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-20 items-end">

                    <div className="space-y-8">
                        <p className="text-primary-200 text-lg max-w-md font-light">
                            Sua história merece ser ouvida com atenção e carinho. Estou aqui para acolher suas dúvidas e sonhos.
                        </p>

                        <div
                            onClick={handleCopy}
                            className="group cursor-pointer max-w-fit"
                        >
                            <span className="block text-sm text-gray-400 mb-2 uppercase tracking-widest">Email</span>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl md:text-5xl font-serif hover:text-secondary-400 transition-colors duration-300 border-b border-white/20 pb-2 group-hover:border-secondary-400">
                                    {email}
                                </span>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-secondary-400 group-hover:border-secondary-400 group-hover:text-primary-950 transition-all duration-300">
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </div>
                            </div>
                            {copied && <span className="text-secondary-400 text-sm mt-2 block">Copiado para área de transferência!</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 items-start md:items-end">
                        <MagneticButton>
                            <a
                                href="https://wa.me/message/OY5GZ44QYS4AL1"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between w-64 md:w-80 px-8 py-6 bg-white text-primary-950 rounded-full hover:bg-secondary-400 transition-colors duration-300"
                            >
                                <span className="text-xl font-bold">WhatsApp</span>
                                <ArrowUpRight className="w-6 h-6" />
                            </a>
                        </MagneticButton>

                        <MagneticButton>
                            <a
                                href="https://instagram.com/doulamaju"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between w-64 md:w-80 px-8 py-6 border border-white/20 rounded-full hover:bg-primary-900 transition-colors duration-300 backdrop-blur-sm"
                            >
                                <span className="text-xl font-bold">Instagram</span>
                                <ArrowUpRight className="w-6 h-6" />
                            </a>
                        </MagneticButton>
                    </div>

                </div>

                <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-primary-300/50 text-sm">
                    <p>© {new Date().getFullYear()} Doula Maju</p>
                    <p>Feito com amor</p>
                </div>

            </div>

            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary-800/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </section>
    );
};

export default Contact;
