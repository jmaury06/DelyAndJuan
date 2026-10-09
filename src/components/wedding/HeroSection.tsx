import { getImageUrl } from "@/lib/storage";
import { useThemeStore } from "@/stores/themeStore";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import Divider from "@/components/wedding/Divider";
import curvaPortada from "@/img/curva_portada_horizontal.png";

const HeroSection = () => {
  const heroImageUrl = getImageUrl('portada.jpg');
  const { isDarkMode } = useThemeStore();
  const sectionRef = useRef(null);
  
  // Hook para detectar el scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Efecto para ocultar el scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">
      {/* Foto principal sin recorte + marco curvo sobre la parte inferior */}
      <motion.div
        className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <img
          src={heroImageUrl}
          alt="Romántica imagen de boda"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve-400/30 via-mauve-300/20 to-mauve-200/10"></div>
        <img
          src={curvaPortada}
          alt=""
          aria-hidden="true"
          className="absolute bottom-[-4px] left-0 w-full h-auto pointer-events-none"
        />
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 py-4 relative z-10 text-center">
        <motion.div 
          className="mb-4 max-w-2xl mx-auto"
        >
          {/* Título principal - viene de arriba */}
          <motion.h1 
            className={`font-script text-5xl md:text-7xl text-mauve-400 mb-4`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            ¡Nos Casamos!
          </motion.h1>
          
          <Divider />
        </motion.div>

        <motion.div 
          className="mb-8 max-w-2xl mx-auto"
        >
          {/* Nombres - vienen de izquierda a derecha */}
          <motion.h2 
            className={`font-script text-4xl md:text-6xl text-mauve-400 mb-4`}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            Delia & Juan
          </motion.h2>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <div className="w-6 h-10 border-2 border-mauve-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-mauve-400/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;