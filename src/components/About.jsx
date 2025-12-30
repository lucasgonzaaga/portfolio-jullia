import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Dynamic Image Effects
    const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.8], ["100%", "0%", "0%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={containerRef} id="about" data-theme="light" className="relative bg-white">

            <div className="flex flex-col lg:flex-row">

                {/* LEFT: STICKY IMAGE CONTAINER */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 overflow-hidden">
                    <div className="absolute inset-0 bg-primary-100">
                        {/* Dynamic Image */}
                        <motion.div
                            style={{ filter: `grayscale(${grayscale})`, scale }}
                            className="w-full h-full bg-[url('/jullia-about.jpg')] bg-cover bg-center transition-all duration-700"
                        ></motion.div>
                        <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
                    </div>
                    {/* Floating Decorative Label */}
                    <div className="absolute bottom-12 left-12 text-white/80 mix-blend-difference z-10 hidden lg:block">
                        <span className="block text-xs tracking-[0.3em] uppercase mb-2">Portrait</span>
                        <span className="font-serif text-4xl italic">Doula Maju</span>
                    </div>
                </div>

                {/* RIGHT: SCROLLABLE CONTENT */}
                <div className="lg:w-1/2 px-6 py-20 lg:py-32 lg:px-24 bg-white relative overflow-hidden">

                    {/* Background Texture/Gradient */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

                    {/* CONNECTING LINE */}
                    <div className="absolute left-6 lg:left-24 top-40 bottom-40 w-px bg-gradient-to-b from-primary-200 via-secondary-200 to-transparent hidden lg:block opacity-50"></div>

                    {/* Chapter 1: Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-20% 0px -20% 0px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 lg:mb-32 lg:min-h-[60vh] flex flex-col justify-center relative pl-0 lg:pl-12"
                    >
                        {/* Chapter Marker */}
                        <div className="absolute -left-[5px] top-2 w-3 h-3 bg-white border-2 border-primary-400 rounded-full hidden lg:block z-10"></div>

                        <span className="text-secondary-600 font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
                            Capítulo I <div className="h-px w-8 bg-secondary-200"></div>
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-950 mb-8 leading-[0.9] tracking-tight">
                            Uma vocação que <br />
                            <span className="italic text-primary-600">nasceu da alma.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                            Não escolhi ser doula; a doulagem me escolheu. Minha jornada é guiada por um chamado profundo para acolher, ouvir e transformar o medo em potência, com um olhar fresco e dedicado.
                        </p>
                    </motion.div>

                    {/* Chapter 2: Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-20% 0px -20% 0px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 lg:mb-32 lg:min-h-[60vh] flex flex-col justify-center relative pl-0 lg:pl-12"
                    >
                        {/* Chapter Marker */}
                        <div className="absolute -left-[5px] top-2 w-3 h-3 bg-white border-2 border-secondary-400 rounded-full hidden lg:block z-10"></div>

                        <span className="text-secondary-600 font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
                            Capítulo II <div className="h-px w-8 bg-secondary-200"></div>
                        </span>
                        <blockquote className="relative mb-8">
                            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary-100 -z-10" />
                            <p className="text-2xl md:text-3xl font-serif text-gray-800 italic leading-tight">
                                "O parto não é apenas sobre nascer um bebê, é sobre nascer uma família."
                            </p>
                        </blockquote>
                        <p className="text-lg text-gray-600 leading-relaxed font-light mb-6">
                            Acredito na humanização real. Naquela que respeita o tempo, o corpo e a história de cada mulher. Meu papel é ser o porto seguro em meio à tempestade e a calmaria de um novo começo.
                        </p>
                    </motion.div>

                    {/* Chapter 3: Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-20% 0px -20% 0px" }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 relative pl-0 lg:pl-12"
                    >
                        {/* Chapter Marker */}
                        <div className="absolute -left-[5px] top-2 w-3 h-3 bg-white border-2 border-primary-600 rounded-full hidden lg:block z-10"></div>

                        <span className="text-secondary-600 font-bold tracking-widest uppercase text-xs mb-6 flex items-center gap-2">
                            Capítulo III <div className="h-px w-8 bg-secondary-200"></div>
                        </span>
                        <h3 className="text-3xl font-serif text-gray-900 mb-6 flex items-center gap-2">
                            Acompanhamento Integral <Sparkles className="w-5 h-5 text-yellow-500" />
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed font-light mb-8">
                            Trago uma abordagem atualizada, baseada em evidências recentes e uma vontade incansável de fazer a diferença. Cada família é única, e minha entrega é total para construir sua história.
                        </p>

                        <div className="grid grid-cols-2 gap-8 py-8 border-t border-gray-100">
                            <div className="group cursor-default">
                                <span className="block text-3xl md:text-4xl font-serif text-primary-600 mb-2 transition-transform duration-300 group-hover:-translate-y-1">Certificada</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400">Formação<br />Atualizada</span>
                            </div>
                            <div className="group cursor-default">
                                <span className="block text-3xl md:text-4xl font-serif text-primary-600 mb-2 transition-transform duration-300 group-hover:-translate-y-1">100%</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400">Entrega<br />e Presença</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
