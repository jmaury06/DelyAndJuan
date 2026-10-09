import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { supabase, ICONS_BUCKET } from "@/lib/supabase";

const getIconUrl = (filename: string) => {
  const { data } = supabase.storage
    .from(ICONS_BUCKET)
    .getPublicUrl(filename);
  return data.publicUrl;
};

const timelineEvents = [
  {
    time: "05:00 PM",
    title: "RECEPCIÓN DE INVITADOS",
    icon: getIconUrl("1-inicio.svg"),
    align: "right"
  },
  {
    time: "05:30 PM",
    title: "CEREMONIA",
    icon: getIconUrl("2-telon.svg"),
    align: "left"
  },
  {
    time: "06:30 PM",
    title: "FOTOS DE LOS NOVIOS",
    icon: getIconUrl("8-fotos.svg"),
    align: "right"
  },
  {
    time: "07:30 PM",
    title: "ENTRADA Y BAILE DE LOS NOVIOS",
    icon: getIconUrl("4-baile.svg"),
    align: "left"
  },
  {
    time: "08:00 PM",
    title: "BRINDIS",
    icon: getIconUrl("3-copas.svg"),
    align: "right"
  },
  {
    time: "08:30 PM",
    title: "CENA",
    icon: getIconUrl("5-cena.svg"),
    align: "left"
  },
  {
    time: "09:30 PM",
    title: "LANZAMIENTO DE RAMO Y LIGA",
    icon: null,
    align: "right"
  },
  {
    time: "10:00 PM",
    title: "¡QUE COMIENCE LA FIESTA!",
    icon: getIconUrl("7-dj.svg"),
    align: "left"
  }
];

const ItineraryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden font-serif">
      <div className="fixed top-6 left-6 z-50">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost" 
          className="bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-full p-2 h-auto text-[#8B7355] border border-[#D4C5B0]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl text-[#D4C5B0] font-script mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Itinerario de<br /> Nuestra < br/> Boda
          </h1>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#8B7355] opacity-50 hidden md:block" />

          {/* Timeline Events */}
          <div className="space-y-32 md:space-y-48">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } relative`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-1/2 flex flex-col ${
                  index % 2 === 0 ? 'items-center md:items-start md:pl-12' : 'items-center md:items-end md:pr-12'
                } mb-6 md:mb-0`}>
                  <div className="text-[#8B7355] text-2xl md:text-3xl font-serif mb-1">
                    {event.time}
                  </div>
                  <div className="text-[#A69076] text-sm md:text-base uppercase tracking-widest font-light text-center md:text-left">
                    {event.title}
                  </div>
                </div>

                {/* Center Dot (Desktop) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#8B7355] rounded-full hidden md:block" />
                
                {/* Connector Line (Desktop) */}
                <div className={`absolute top-1/2 left-1/2 w-12 h-0.5 bg-[#8B7355] hidden md:block ${
                   index % 2 === 0 ? '' : '-translate-x-full'
                }`} />

                {/* Icon Side */}
                <div className={`w-full md:w-1/2 flex justify-center ${
                  index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'
                }`}>
                  {event.icon && (
                    <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 md:w-32 md:h-32 relative"
                  >
                    <img 
                      src={event.icon} 
                      alt={event.title}
                      className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                  )}
                </div>

                {/* Mobile Connector Line (Between Items) */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-28 w-0.5 bg-[#8B7355] opacity-50 md:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mt-20"
        >
          <div className="text-4xl md:text-5xl text-[#D4C5B0] font-script" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Delia<br/>&<br/>Juan
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryPage;
