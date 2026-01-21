import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeartHandshake, BookOpen, ShieldCheck } from 'lucide-react';

const DoulaInfo = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
    const xRight = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);
    const opacityPhrase = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]); // Extends visibility
    const scalePhrase = useTransform(scrollYProgress, [0.4, 0.5], [1, 2]); // Slight zoom out before disappearing

    // --- PHASE 2: VORTEX BRIDGING (0.4 - 0.6) ---
    // Filling the gap to avoid "black screen"
    const word1Scale = useTransform(scrollYProgress, [0.4, 0.65], [0.5, 10]);
    const word1Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

    const word2Scale = useTransform(scrollYProgress, [0.45, 0.7], [0.5, 10]);
    const word2Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);

    // --- PHASE 3: CONTENT REVEAL (0.6 - 1.0) ---
    // Appearing immediately as the vortex clears
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // --- PHASE 3: CONTENT REVEAL (0.6 - 1.0) ---
    const contentOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
    // Desktop: Settle at 0. Mobile: Scroll UP to reveal bottom cards (-500px approx)
    const contentY = useTransform(scrollYProgress,
        [0.6, 0.8, 1],
        isMobile ? [100, 0, -400] : [100, 0, 0]
    );


    return (
        <section ref={containerRef} id="doula-info" data-theme="dark" className="relative h-[400vh] bg-black">

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
                <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-primary-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-secondary-900/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

                <motion.div
                    style={{ opacity: opacityPhrase, scale: scalePhrase }}
                    className="absolute z-20 flex flex-col items-center justify-center pointer-events-none will-change-transform"
                >
                    <motion.h2 style={{ x: xLeft }} className="text-[14vw] sm:text-[12vw] md:text-[10vw] font-black text-white leading-[0.8] tracking-tighter whitespace-nowrap drop-shadow-lg">
                        O QUE É
                    </motion.h2>
                    <motion.h2 style={{ x: xRight }} className="text-[14vw] sm:text-[12vw] md:text-[10vw] font-serif italic text-primary-500 leading-[0.8] tracking-tighter whitespace-nowrap drop-shadow-lg">
                        SER DOULA
                    </motion.h2>
                </motion.div>

                {/* PHASE 2: WORD VORTEX (Bridging the gap) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full h-full overflow-hidden">
                    <motion.div style={{ scale: word1Scale, opacity: word1Opacity }} className="absolute text-white font-bold uppercase tracking-[0.5em] text-2xl md:text-4xl will-change-transform">
                        AMOR
                    </motion.div>
                    <motion.div style={{ scale: word2Scale, opacity: word2Opacity }} className="absolute text-secondary-400 font-serif italic text-4xl md:text-6xl will-change-transform">
                        Respeito
                    </motion.div>
                    <motion.div style={{ scale: word1Scale, opacity: word2Opacity, rotate: 90 }} className="absolute text-primary-400 font-bold uppercase tracking-[0.5em] text-2xl md:text-4xl will-change-transform">
                        Ciência
                    </motion.div>
                </div>

                {/* PHASE 3: THE CONTENT (Cards) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY, transform: 'translate3d(0,0,0)' }}
                    className="relative z-30 max-w-7xl w-full px-4 flex flex-col md:flex-row gap-6 items-stretch justify-center will-change-transform"
                >
                    {[
                        { icon: <HeartHandshake className="w-12 h-12 mb-6 text-primary-400" />, title: "Apoio Emocional", desc: "Sua rocha em meio à tempestade, oferecendo segurança e calma a cada contração." },
                        { icon: <ShieldCheck className="w-12 h-12 mb-6 text-secondary-400" />, title: "Defesa de Direitos", desc: "A voz firme que protege seus desejos e garante que seu plano de parto seja respeitado." },
                        { icon: <BookOpen className="w-12 h-12 mb-6 text-primary-400" />, title: "Informação", desc: "Ciência e evidências para que você tome decisões conscientes e sem medo." }
                    ].map((item, i) => (
                        <div key={i} className="flex-1 bg-gray-950/80 border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-gray-900 transition-colors duration-500 group flex flex-col items-center text-center">
                            <div className="bg-white/5 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-light text-lg leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* GRAIN OVERLAY */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay z-50"
                    style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
                </div>

            </div>
        </section>
    );
};

export default DoulaInfo;
