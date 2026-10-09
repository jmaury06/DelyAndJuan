import { useThemeStore } from "@/stores/themeStore";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const { isDarkMode } = useThemeStore();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-11-21T17:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative mt-[-70px] md:py-20 overflow-hidden bg-transparent`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Contenedor principal con el SVG de fondo */}
        <div className="flex items-center justify-center">
          <motion.div 
            className="relative w-full max-w-md md:max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-full aspect-square rounded-full border border-mauve-200 bg-mauve-50/60" />

            {/* Contenido del contador centrado sobre el SVG */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Título */}
              <motion.h2
                className={`font-script text-3xl md:text-4xl mb-6 text-mauve-400`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Faltan
              </motion.h2>

              {/* Grid del contador */}
              <div className="grid grid-cols-4 gap-3 md:gap-6 mb-4">
                {/* Días */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className={`text-4xl md:text-5xl font-bold text-mauve-400`}>
                    {timeLeft.days}
                  </div>
                  <div className={`text-xs md:text-sm uppercase tracking-wide ${isDarkMode ? 'text-mauve-200' : 'text-mauve-500'}`}>
                    días
                  </div>
                </motion.div>

                {/* Horas */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className={`text-4xl md:text-5xl font-bold text-mauve-400`}>
                    {timeLeft.hours}
                  </div>
                  <div className={`text-xs md:text-sm uppercase tracking-wide ${isDarkMode ? 'text-mauve-200' : 'text-mauve-500'}`}>
                    hs
                  </div>
                </motion.div>

                {/* Minutos */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className={`text-4xl md:text-5xl font-bold text-mauve-400`}>
                    {timeLeft.minutes}
                  </div>
                  <div className={`text-xs md:text-sm uppercase tracking-wide ${isDarkMode ? 'text-mauve-200' : 'text-mauve-500'}`}>
                    min
                  </div>
                </motion.div>

                {/* Segundos */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className={`text-4xl md:text-5xl font-bold text-mauve-400`}>
                    {timeLeft.seconds}
                  </div>
                  <div className={`text-xs md:text-sm uppercase tracking-wide ${isDarkMode ? 'text-mauve-200' : 'text-mauve-500'}`}>
                    seg
                  </div>
                </motion.div>
              </div>

              {/* Corazón decorativo */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Heart className={`w-8 h-8 text-mauve-400 animate-heartbeat`} fill="currentColor" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
