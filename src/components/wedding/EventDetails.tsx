import { Clock, MapPin, Shirt, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/themeStore";
import Divider from "@/components/wedding/Divider";

const EventDetails = () => {
  const { isDarkMode } = useThemeStore();
  const openMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Salón de Eventos DAYDER, Calle 76 # 44 - 45, Barranquilla, Colombia'), '_blank');
  };
  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        {/* Título todo en cursiva */}
        <div className="text-center mb-12">
          <h2 className={`font-script text-3xl font-semibold md:text-4xl text-mauve-400 mb-6`}>
            Detalles del Evento
          </h2>
          
          <Divider />
          
          <p className={`font-script text-xl text-slate-600 max-w-xl mx-auto`}>
            "El amor es paciente, es bondadoso. <br />
            No guarda rencor, todo lo disculpa, <br />
            todo lo cree, todo lo espera, todo lo soporta" <br />
            <span className={`text-xl font-semibold text-mauve-400`}>1 Corintios 13:4-7</span>
          </p>
        </div>

        {/* Detalles en formato minimalista */}
        <div className="space-y-14 mb-12 md:flex md:space-y-0 md:justify-between">
          {/* Fecha & Hora */}
          <div className="text-center">
            <Clock className={`w-10 h-10 text-mauve-400 mx-auto mb-3`} />
            <h3 className={`font-script text-2xl font-bold md:text-3xl text-mauve-400`}>
              Cuándo
            </h3>
            <p className={`text-base font-semibold text-slate-600`}>
              Sábado, 21 de Noviembre de 2026
            </p>
            <p className={`text-base font-semibold text-mauve-400`}>
              Ceremonia | 5:30 PM
            </p>
          </div>

          {/* Ubicación */}
          <div className="text-center">
            <MapPin className={`w-10 h-10 text-mauve-400 mx-auto mb-3`} />
            <h3 className={`font-script text-2xl font-bold md:text-3xl text-mauve-400`}>
              Dónde
            </h3>
            <p className={`text-base font-semibold text-slate-600`}>
              Salón de Eventos
            </p>
            <p className={`font-script text-xl font-bold text-slate-600`}>
              DAYDER
            </p>
            <p className={`text-sm font-semibold text-slate-600 mb-2`}>
              Calle 76 # 44 - 45, Barranquilla
            </p>
            <Button 
              onClick={openMaps}
              className={`bg-mauve-400 hover:bg-mauve-500 text-white rounded-full px-6 py-2 font-script text-xl font-semibold`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver en Mapa
            </Button>
          </div>

          {/* Dress Code */}
          <div className="text-center">
            <Shirt className={`w-10 h-10 text-mauve-400 mx-auto mb-3`} />
            <h3 className={`font-script text-2xl font-bold md:text-3xl text-mauve-400`}>
              Dress Code
            </h3>
            {/* Mujeres */}
            <div className="mb-4">
              <p className={`font-script text-xl text-mauve-400 mb-2 font-semibold`}>
                Mujeres:
              </p>
              <p className={`text-base text-slate-600`}>
                Vestido de gala
              </p>
            </div>

            {/* Hombres */}
            <div className="">
              <p className={`font-script text-xl text-mauve-400 mb-2 font-semibold`}>
                Hombres:
              </p>
              <p className={`text-base text-slate-600`}>
                Smoking
              </p>
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div className="mt-12 text-center">
          <Heart className={`w-8 h-8 text-mauve-400 mx-auto mb-4`} fill="currentColor" />
          <h3 className={`font-script text-2xl font-bold md:text-3xl text-mauve-400 mb-2`}>
            Celebración Íntima
          </h3>
          <p className={`text-sm text-slate-600 mb-8`}>
            Hemos diseñado esta celebración como un momento especial para compartir entre adultos. <br />
            Agradecemos su comprensión y esperamos disfrutar juntos de esta noche única e inolvidable.
          </p>

          <Button
            onClick={() => window.location.href = '/itinerario'}
            className={`bg-mauve-400 hover:bg-mauve-500 text-white rounded-full px-8 py-6 font-script text-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            Ver Itinerario
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;