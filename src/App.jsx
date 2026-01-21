import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/next"
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DoulaInfo from './components/DoulaInfo';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-primary-200 selection:text-primary-900 cursor-none">
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Cursor />
          <Navbar />
          <main>
            <Analytics />
            <Hero />
            <About />
            <DoulaInfo />
            <Services />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
