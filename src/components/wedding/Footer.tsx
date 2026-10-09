import { Calendar } from "lucide-react";
import { WEDDING } from "@/config/wedding";
import Divider from "@/components/wedding/Divider";
import FloralWreath from "@/components/wedding/floral/FloralWreath";
import Reveal from "@/components/wedding/Reveal";

const addToCalendar = () => {
  const { title, start, end, description, location } = WEDDING.calendar;
  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}&dates=${start}/${end}` +
    `&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  window.open(url, "_blank");
};

/** Palabras de agradecimiento, botón de calendario y cierre. */
const Footer = () => {
  const { day, month, year } = WEDDING.dateShort;

  return (
    <footer className="relative pt-14 pb-10 px-6 text-center">
      <Reveal className="mx-auto max-w-xl">
        <p className="eyebrow mb-3">Gracias</p>
        {WEDDING.thanks.map((paragraph, i) => (
          <p key={i} className="font-elegant text-lg md:text-xl leading-relaxed text-sand-600 mb-4">
            {paragraph}
          </p>
        ))}
        <p className="mt-6 font-elegant italic text-lg text-sand-500">Con cariño,</p>
        <p className="font-script text-4xl text-gold-shimmer py-1">Los novios</p>
      </Reveal>

      <Reveal className="mt-10">
        <button type="button" onClick={addToCalendar} className="btn-gold">
          <Calendar className="h-4 w-4" />
          Agregar al calendario
        </button>
      </Reveal>

      {/* Monograma final dentro de la corona */}
      <Reveal className="relative mx-auto mt-14 w-[min(80vw,320px)] aspect-square">
        <FloralWreath className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-script text-5xl text-sand-600 leading-none">
            D<span className="mx-1 text-3xl text-gold-400">&</span>J
          </p>
          <p className="mt-3 font-elegant text-sm tracking-[0.35em] text-gold-500">
            {day} · {month.slice(0, 3).toUpperCase()} · {year}
          </p>
        </div>
      </Reveal>

      <Divider className="mt-10" />
      <p className="font-sans text-xs tracking-[0.2em] text-sand-400">© {year} · {WEDDING.couple}</p>
    </footer>
  );
};

export default Footer;
