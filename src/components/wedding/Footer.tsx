import { Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/themeStore";
import { motion } from "framer-motion";

const Footer = () => {
  const { isDarkMode } = useThemeStore();
  const addToCalendar = () => {
    const eventDetails = {
      title: "Boda de Delia & Juan",
      start: "20261121T220000Z",
      end: "20261122T063000Z",
      description: "Celebración de la boda de Delia y Juan en el Salón de Eventos DAYDER",
      location: "Salón de Eventos DAYDER, Calle 76 # 44 - 45, Barranquilla, Atlántico, Colombia"
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <footer className="relative py-10 overflow-hidden bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-4 relative z-10">
        {/* Sección principal */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className={`w-16 h-16 text-mauve-400 mx-auto mb-6 animate-heartbeat transition-colors duration-500`} />
            <h2 className={`font-script font-semibold text-4xl md:text-5xl text-mauve-400 mb-4 transition-colors duration-500`}>
              Delia & Juan
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`h-px bg-mauve-400 w-12 transition-colors duration-500`}></div>
              <span className={`font-elegant text-xl font-semibold text-mauve-400 transition-colors duration-500`}>21 • Noviembre • 2026</span>
              <div className={`h-px bg-mauve-400 w-12 transition-colors duration-500`}></div>
            </div>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className={`font-script text-2xl text-slate-600 mb-4 transition-colors duration-500`}>
              "Agradecemos su compañía <br /> en este día tan especial"
            </p>
            <p className={`text-sm leading-relaxed text-slate-600 transition-colors duration-500`}>
              Su presencia hace que nuestro sueño se haga realidad.
              Este es el comienzo de nuestra vida juntos.
            </p>
          </motion.div>

          {/* Botón de calendario */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={addToCalendar}
              variant="secondary"
              size="lg"
              className="bg-mauve-400 hover:bg-mauve-500 text-white font-script text-xl font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agregar al Calendario
            </Button>
          </motion.div>
        </div>

        {/* Mensaje final */}
        <motion.div
          className={`text-center border-t border-mauve-200 pt-8 transition-colors duration-500`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart className={`w-5 h-5 text-mauve-400 animate-heartbeat transition-colors duration-500`} />
            <p className={`font-script text-xl font-semibold text-slate-600 transition-colors duration-500`}>
              Con todo nuestro amor y gratitud
            </p>
            <Heart className={`w-5 h-5 text-mauve-400 animate-heartbeat transition-colors duration-500`} />
          </div>
          <p className={`font-script text-xl font-semibold text-slate-600 transition-colors duration-500 mb-4`}>
            "Dios no une personas, une Propósitos"
          </p>
          <p className={`text-slate-600 text-sm transition-colors duration-500`}>
            © 2026 | Delia & Juan
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;