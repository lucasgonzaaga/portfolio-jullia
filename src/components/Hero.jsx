import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowDown, Pointer } from 'lucide-react';
import MagneticButton from './MagneticButton';

const ScrollIndicator = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowText(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-20 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {showText ? (
                    <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm font-bold uppercase tracking-[0.3em] text-purple-200"
                    >
                        Role para Entrar
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            key="mouse-desktop"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="hidden md:flex w-6 h-10 border-2 border-purple-200 rounded-full justify-center p-1"
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1 h-1 bg-purple-200 rounded-full"
                            />
                        </motion.div>

                        <motion.div
                            key="hand-mobile"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex md:hidden flex-col items-center gap-2"
                        >
                            <motion.div
                                animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }} // Drag DOWN motion
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Pointer className="w-6 h-6 text-purple-200" />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    const scale = useTransform(smoothProgress, [0, 0.35], [1, 20]);
    const maskOpacity = useTransform(smoothProgress, [0.28, 0.35], [1, 0]);
    const videoOpacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);


    const xLeft = useTransform(smoothProgress, [0.3, 1], ["-10%", "-50%"]);
    const xRight = useTransform(smoothProgress, [0.3, 1], ["10%", "50%"]);

    const ySlow = useTransform(smoothProgress, [0.3, 1], [0, -100]);
    const yMedium = useTransform(smoothProgress, [0.3, 1], [0, -200]);
    const yFast = useTransform(smoothProgress, [0.3, 1], [0, -400]);

    const revealOpacity = useTransform(smoothProgress, [0.35, 0.45], [0, 1]);

    return (
        <section ref={containerRef} id="hero" data-theme="dark" className="relative h-[400vh] bg-primary-950">

            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-contents">

                <motion.div
                    style={{ opacity: videoOpacity }}
                    className="absolute inset-0 z-0 bg-black"
                >
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-black/50 to-transparent"></div>
                </motion.div>

                <motion.div
                    style={{
                        scale,
                        opacity: maskOpacity,
                        pointerEvents: useTransform(smoothProgress, p => p > 0.35 ? 'none' : 'auto'),
                        visibility: useTransform(smoothProgress, p => p > 0.38 ? 'hidden' : 'visible')
                    }}
                    className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-purple-100 origin-center will-change-transform"
                >
                    <div className="text-center">
                        <span className="block text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-serif uppercase tracking-[0.2em] leading-none mb-[-2vw] opacity-80">
                            Doula
                        </span>
                        <span className="block text-[40vw] sm:text-[30vw] md:text-[25vw] lg:text-[20vw] font-script leading-none -ml-4 text-primary-50">
                            Maju
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
                        visibility: useTransform(smoothProgress, p => p > 0.1 ? 'hidden' : 'visible')
                    }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 will-change-opacity"
                >
                    <ScrollIndicator />
                </motion.div>

                <motion.div
                    style={{
                        opacity: revealOpacity,
                        pointerEvents: useTransform(smoothProgress, p => p < 0.35 ? 'none' : 'auto'),
                        visibility: useTransform(smoothProgress, p => p < 0.30 ? 'hidden' : 'visible')
                    }}
                    className="absolute z-20 inset-0 flex flex-col items-center justify-center pointer-events-none will-change-opacity"
                >
                    <div className="relative w-full overflow-hidden py-10">
                        <motion.div style={{ x: xRight }} className="whitespace-nowrap">
                            <span className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-serif italic text-white/10 opacity-50 block leading-none">
                                Transformando Vidas
                            </span>
                        </motion.div>
                        <motion.div style={{ x: xLeft }} className="whitespace-nowrap mt-[-4vw]">
                            <span className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-serif font-bold text-white block leading-none tracking-tighter drop-shadow-2xl">
                                TRANSFORMANDO
                            </span>
                        </motion.div>
                        <motion.div style={{ x: xRight }} className="whitespace-nowrap mt-[-2vw]">
                            <span className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-script text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-primary-300 block leading-none pr-10 md:pr-20">
                                Vidas.
                            </span>
                        </motion.div>
                    </div>

                    <motion.div style={{ y: yFast }} className="absolute top-[15%] left-[10%] w-[15vw] aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1777" className="w-full h-full object-cover opacity-80" alt="Mãos" />
                    </motion.div>

                    <motion.div style={{ y: yMedium }} className="absolute bottom-[20%] right-[10%] w-[20vw] aspect-square rounded-full overflow-hidden border border-white/20 shadow-2xl skew-y-3 hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070" className="w-full h-full object-cover scale-150 opacity-80" alt="Bebê" />
                    </motion.div>

                    <div className="mt-12 pointer-events-auto">
                        <MagneticButton className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-secondary-400 hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            <a href="#about" className="absolute inset-0 z-10"></a>
                            <span>Explorar História</span>
                            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                        </MagneticButton>
                    </div>

                </motion.div>

                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
                </div>
            </div>

        </section>
    );
};

export default Hero;
