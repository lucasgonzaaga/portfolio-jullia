import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
                        {/* DESKTOP: MOUSE */}
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

                        {/* MOBILE: HAND SWIPE (Pointer Dragging Down) */}
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

    // --- ZOOM / MASK ANIMATIONS (First Phase) ---
    // Scale: 1 -> 80 (Massive fly-through)
    const scale = useTransform(scrollYProgress, [0, 0.35], [1, 80]);
    // Opacity of the text mask: fades out as we fly through
    const maskOpacity = useTransform(scrollYProgress, [0.3, 0.35], [1, 0]);
    // Video/Bg Opacity: Fades in
    const videoOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);


    // --- VELOCITY & PARALLAX (Second Phase: 0.35 -> 1.0) ---

    // Text Velocity: Moves horizontally
    const xLeft = useTransform(scrollYProgress, [0.3, 1], ["-20%", "-50%"]);
    const xRight = useTransform(scrollYProgress, [0.3, 1], ["20%", "50%"]);

    // Parallax Images Y-Axis
    const ySlow = useTransform(scrollYProgress, [0.3, 1], [0, -100]);
    const yMedium = useTransform(scrollYProgress, [0.3, 1], [0, -200]);
    const yFast = useTransform(scrollYProgress, [0.3, 1], [0, -400]);

    // Opacity for the reveal elements
    const revealOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

    return (
        <section ref={containerRef} id="hero" data-theme="dark" className="relative h-[400vh] bg-[#2e1065]">

            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. CINEMATIC BACKGROUND (The "World" we enter) */}
                <motion.div
                    style={{ opacity: videoOpacity }}
                    className="absolute inset-0 z-0 bg-black"
                >
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2e1065] via-black/50 to-transparent"></div>
                </motion.div>

                {/* 2. GIANT TEXT MASK (The "Portal") */}
                <motion.div
                    style={{ scale, opacity: maskOpacity }}
                    className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-purple-100 origin-center"
                >
                    <div className="text-center">
                        <span className="block text-[12vw] md:text-[8vw] font-serif uppercase tracking-[0.2em] leading-none mb-[-2vw] opacity-80">
                            Doula
                        </span>
                        <span className="block text-[35vw] md:text-[25vw] font-script leading-none -ml-4 text-purple-50 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            Maju
                        </span>
                    </div>
                </motion.div>

                {/* SCROLL INDICATOR - Now at the bottom of the screen */}
                <motion.div
                    style={{ opacity: maskOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
                >
                    <ScrollIndicator />
                </motion.div>

                {/* 3. VELOCITY CONTENT (The "Chaos" after entering) */}
                <motion.div
                    style={{ opacity: revealOpacity }}
                    className="absolute z-20 inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* HUGE VELOCITY TEXT */}
                    <div className="relative w-full overflow-hidden py-10">
                        <motion.div style={{ x: xRight }} className="whitespace-nowrap">
                            <span className="text-[18vw] md:text-[12vw] font-serif italic text-white/10 opacity-50 block leading-none">
                                Transformando Vidas
                            </span>
                        </motion.div>
                        <motion.div style={{ x: xLeft }} className="whitespace-nowrap mt-[-4vw]">
                            <span className="text-[18vw] md:text-[12vw] font-serif font-bold text-white block leading-none tracking-tighter drop-shadow-2xl">
                                TRANSFORMANDO
                            </span>
                        </motion.div>
                        <motion.div style={{ x: xRight }} className="whitespace-nowrap mt-[-2vw]">
                            <span className="text-[18vw] md:text-[12vw] font-script text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-primary-300 block leading-none pr-10 md:pr-20">
                                Vidas.
                            </span>
                        </motion.div>
                    </div>

                    {/* FLOATING PARALLAX IMAGES (Scatter) */}
                    <motion.div style={{ y: yFast }} className="absolute top-[15%] left-[10%] w-[15vw] aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-2xl rotate-[-6deg] hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1777" className="w-full h-full object-cover opacity-80" alt="Mãos" />
                    </motion.div>

                    <motion.div style={{ y: yMedium }} className="absolute bottom-[20%] right-[10%] w-[20vw] aspect-square rounded-full overflow-hidden border border-white/20 shadow-2xl skew-y-3 hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070" className="w-full h-full object-cover scale-150 opacity-80" alt="Bebê" />
                    </motion.div>

                    {/* CENTRAL CTA (Anchor) */}
                    <div className="mt-12 pointer-events-auto">
                        <MagneticButton className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-secondary-400 hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            <a href="#about" className="absolute inset-0 z-10"></a>
                            <span>Explorar História</span>
                            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                        </MagneticButton>
                    </div>

                </motion.div>

                {/* GRAIN OVERLAY */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 mix-blend-overlay"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
                </div>
            </div>

        </section>
    );
};

export default Hero;
