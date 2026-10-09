import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Flower2, GlassWater, Heart, Music, PartyPopper, Users, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { WEDDING } from "@/config/wedding";
import Divider from "@/components/wedding/Divider";
import FallingPetals from "@/components/wedding/floral/FallingPetals";
import FloralCluster from "@/components/wedding/floral/FloralCluster";

// Horarios estimados a partir de la ceremonia de las 6:30 PM (pendiente de confirmar con los novios)
const timelineEvents: { time: string; title: string; icon: LucideIcon }[] = [
  { time: "6:00 PM", title: "Recepción de invitados", icon: Users },
  { time: "6:30 PM", title: "Ceremonia", icon: Heart },
  { time: "7:15 PM", title: "Fotos de los novios", icon: Camera },
  { time: "8:00 PM", title: "Entrada y baile de los novios", icon: Music },
  { time: "8:30 PM", title: "Brindis", icon: GlassWater },
  { time: "9:00 PM", title: "Cena", icon: UtensilsCrossed },
  { time: "10:00 PM", title: "Lanzamiento de ramo y liga", icon: Flower2 },
  { time: "10:30 PM", title: "¡Que comience la fiesta!", icon: PartyPopper },
];

const ItineraryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="invitation-bg min-h-screen relative overflow-hidden">
      <FallingPetals count={10} />

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed left-5 top-5 z-50 rounded-full border border-gold-300 bg-white/70 p-2.5 text-gold-600 backdrop-blur-sm transition-colors hover:bg-white"
        aria-label="Volver"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <FloralCluster className="pointer-events-none absolute -right-10 top-0 w-48 rotate-180" variant="full" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">{WEDDING.dateLong}</p>
          <h1 className="font-script text-6xl md:text-7xl text-gold-shimmer py-1">Itinerario</h1>
          <Divider />
        </motion.div>

        <ol className="relative">
          <span className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-gold-200 via-gold-400 to-gold-200 md:left-1/2" aria-hidden="true" />

          {timelineEvents.map(({ time, title, icon: Icon }, index) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.05 * index }}
              className={`relative mb-12 flex items-center gap-6 md:gap-0 ${index % 2 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-ivory text-gold-500 shadow-sm md:absolute md:left-1/2 md:-translate-x-1/2">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <div className={`md:w-1/2 ${index % 2 ? "md:pl-14 md:text-left" : "md:pr-14 md:text-right"}`}>
                <p className="font-elegant text-2xl text-gold-600">{time}</p>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-sand-600">{title}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-16 text-center font-script text-5xl text-sand-600"
        >
          {WEDDING.couple}
        </motion.p>
      </div>
    </div>
  );
};

export default ItineraryPage;
