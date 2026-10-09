import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portada from "@/assets/portada.webp";
import { WEDDING } from "@/config/wedding";
import FloralCluster from "@/components/wedding/floral/FloralCluster";
import Divider from "@/components/wedding/Divider";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const { day, month, year, weekday } = WEDDING.dateShort;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 pb-24 text-center">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        Te invitamos a celebrar nuestra boda
      </motion.p>

      <motion.h1
        className="font-script text-5xl md:text-6xl text-gold-shimmer mt-4 mb-8 py-1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
      >
        ¡Nos casamos!
      </motion.h1>

      {/* Foto principal en arco con marco dorado y flores */}
      <motion.div
        className="relative w-[78vw] max-w-[360px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease }}
      >
        <div className="absolute -inset-3 rounded-t-full border border-gold-300/80" aria-hidden="true" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border-[6px] border-white shadow-[0_20px_60px_-20px_rgba(154,123,58,0.45)]">
          <motion.img
            src={portada}
            alt={`${WEDDING.bride} y ${WEDDING.groom}`}
            className="h-[110%] w-full object-cover object-[50%_30%]"
            style={{ y: photoY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-transparent" />
        </div>

        <FloralCluster className="absolute -bottom-14 -left-16 w-52 md:w-60" />
        <div className="absolute -top-12 -right-14 w-40 md:w-48 rotate-180">
          <FloralCluster variant="small" flip />
        </div>
      </motion.div>

      {/* Nombres */}
      <motion.h2
        className="mt-16 font-script text-6xl md:text-7xl text-sand-600 leading-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease }}
      >
        {WEDDING.bride}
        <span className="mx-3 text-gold-400">&</span>
        {WEDDING.groom}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      >
        <Divider />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-elegant text-sand-600">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-right">{weekday}</span>
          <span className="border-x border-gold-300 px-4 text-5xl font-light text-gold-500">{day}</span>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-left">{month}</span>
        </div>
        <p className="mt-2 font-elegant text-lg tracking-[0.5em] text-sand-500">{year}</p>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-500"
        style={{ opacity: scrollIndicatorOpacity }}
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.6rem]">Desliza</span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-gold-400 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
