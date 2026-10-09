import { CalendarHeart, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { WEDDING } from "@/config/wedding";
import Reveal from "@/components/wedding/Reveal";
import SectionTitle from "@/components/wedding/SectionTitle";

const openMaps = () => {
  window.open(
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(WEDDING.venue.mapsQuery),
    "_blank",
  );
};

const IconBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-white/70 text-gold-500">
    {children}
  </div>
);

const EventDetails = () => (
  <section className="relative py-14 md:py-20 px-6">
    <SectionTitle eyebrow="Celebración" title="Cuándo & dónde" />

    <div className="mx-auto mt-6 grid max-w-3xl gap-12 md:grid-cols-2 md:gap-8">
      <Reveal className="text-center">
        <IconBadge>
          <CalendarHeart className="h-6 w-6" strokeWidth={1.4} />
        </IconBadge>
        <p className="eyebrow mb-2">Fecha</p>
        <p className="font-elegant text-2xl text-sand-700">{WEDDING.dateLong}</p>
        <p className="mt-3 inline-flex items-center gap-2 font-elegant text-xl text-gold-500">
          <Clock className="h-4 w-4" strokeWidth={1.5} />
          {WEDDING.time}
        </p>
      </Reveal>

      <Reveal className="text-center" delay={0.15}>
        <IconBadge>
          <MapPin className="h-6 w-6" strokeWidth={1.4} />
        </IconBadge>
        <p className="eyebrow mb-2">Lugar</p>
        <p className="font-elegant text-2xl text-sand-700">{WEDDING.venue.name}</p>
        <p className="mt-1 font-elegant text-lg text-sand-500">
          {WEDDING.venue.address}, {WEDDING.venue.city}
        </p>
        <button type="button" onClick={openMaps} className="btn-outline-gold mt-5">
          <MapPin className="h-4 w-4" />
          Ver en mapa
        </button>
      </Reveal>
    </div>

    <Reveal className="mt-14 text-center" delay={0.2}>
      <Link to="/itinerario" className="btn-gold">
        Ver itinerario
      </Link>
    </Reveal>
  </section>
);

export default EventDetails;
