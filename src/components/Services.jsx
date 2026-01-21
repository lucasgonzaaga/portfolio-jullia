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
        const checkMobile = () => setIsMobile(window.innerWidth < 1025);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const services = [
        {
            icon: <Calendar className="w-12 h-12 text-white" />,
            title: "Gestação",
            description: "Acompanhamento pré-natal, plano de parto, fisiologia e preparação emocional.",
            class: "bg-primary-600"
        },
        {
            icon: <Activity className="w-12 h-12 text-white" />,
            title: "Parto",
            description: "Assistência contínua, métodos não-farmacológicos de alívio da dor e suporte.",
            class: "bg-secondary-600"
        },
        {
            icon: <Baby className="w-12 h-12 text-white" />,
            title: "Pós-Parto",
            description: "Apoio na amamentação, cuidados com o recém-nascido e recuperação materna.",
            class: "bg-primary-500"
        },
        {
            icon: <Sparkles className="w-12 h-12 text-white" />,
            title: "Consultoria",
            description: "Atendimento pontual para dúvidas específicas sobre gestação e amamentação.",
            class: "bg-secondary-500"
        }
    ];

    return (
        <section ref={targetRef} id="services" data-theme="dark" className={`relative bg-gray-900 ${isMobile ? 'h-auto py-24' : 'h-[300vh]'}`}>
            <div className={`flex items-center overflow-hidden ${isMobile ? 'relative flex-col' : 'sticky top-0 h-screen'}`}>

                <motion.div
                    style={isMobile ? { opacity: 1 } : { opacity: titleOpacity }}
                    className={`${isMobile ? 'px-8 mb-12 w-full text-center relative' : 'absolute left-20 z-20 mix-blend-difference text-white'}`}
                >
                    <h2 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-4 text-white">
                        Meus <br className="hidden md:block" /> Trabalhos
                    </h2>
                    <p className="text-xl opacity-80 max-w-xs mx-auto md:mx-0 text-white">
                        {isMobile ? 'Arraste para o lado para explorar' : 'Role para explorar como posso te ajudar nessa jornada.'}
                    </p>
                </motion.div>

                <div className={`${isMobile ? 'w-full overflow-x-auto px-8 scroll-smooth snap-x snap-mandatory' : 'w-full'}`}>
                    <motion.div
                        style={isMobile ? {} : { x }}
                        className={`flex gap-8 md:gap-10 ${isMobile ? 'w-max pb-8' : 'pl-[40vw]'}`}
                    >
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`relative h-[55vh] md:h-[60vh] w-[80vw] md:w-[35vw] rounded-[3rem] p-8 md:p-10 flex flex-col justify-between shrink-0 hover:scale-105 transition-transform duration-500 shadow-2xl snap-center ${service.class}`}
                            >
                                <div>
                                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm mb-8">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                                </div>

                                <div>
                                    <div className="w-full h-px bg-white/30 my-6"></div>
                                    <p className="text-sm md:text-xl text-white/90 leading-relaxed font-light">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
