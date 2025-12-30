import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Calendar, Baby, Activity } from 'lucide-react';

const Services = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Horizontal move: 
    // Desktop: pl-[40vw] -> cards move -55%
    // Mobile: we keep it horizontal too, but adjust the 'x' to be visible
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    // Title opacity: Fades as cards scroll in
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const services = [
        {
            icon: <Calendar className="w-12 h-12 text-white" />,
            title: "Gestação",
            description: "Acompanhamento pré-natal, plano de parto, fisiologia e preparação emocional.",
            class: "bg-purple-600"
        },
        {
            icon: <Activity className="w-12 h-12 text-white" />,
            title: "Parto",
            description: "Assistência contínua, métodos não-farmacológicos de alívio da dor e suporte.",
            class: "bg-green-600"
        },
        {
            icon: <Baby className="w-12 h-12 text-white" />,
            title: "Pós-Parto",
            description: "Apoio na amamentação, cuidados com o recém-nascido e recuperação materna.",
            class: "bg-purple-500"
        },
        {
            icon: <Sparkles className="w-12 h-12 text-white" />,
            title: "Consultoria",
            description: "Atendimento pontual para dúvidas específicas sobre gestação e amamentação.",
            class: "bg-green-500"
        }
    ];

    return (
        <section ref={targetRef} id="services" data-theme="dark" className="relative h-[300vh] bg-gray-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Title Section (Fixed Left) */}
                <motion.div
                    style={{ opacity: titleOpacity }}
                    className="absolute left-8 md:left-20 z-20 mix-blend-difference text-white"
                >
                    <h2 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-4">
                        Meus <br /> Serviços
                    </h2>
                    <p className="text-xl opacity-80 max-w-xs">
                        Role para explorar como posso te ajudar nessa jornada.
                    </p>
                </motion.div>

                {/* Horizontal Scroll Cards */}
                <motion.div style={{ x }} className="flex gap-8 md:gap-10 pl-[80vw] md:pl-[40vw]">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`relative h-[60vh] w-[80vw] md:w-[35vw] rounded-[3rem] p-8 md:p-10 flex flex-col justify-between shrink-0 hover:scale-105 transition-transform duration-500 shadow-2xl ${service.class}`}
                        >
                            <div>
                                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mb-8">
                                    {service.icon}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                            </div>

                            <div>
                                <div className="w-full h-px bg-white/30 my-6"></div>
                                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
