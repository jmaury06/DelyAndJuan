import { WEDDING } from "@/config/wedding";
import FloralCluster from "@/components/wedding/floral/FloralCluster";
import Reveal from "@/components/wedding/Reveal";

/** Frase de los novios, en una tarjeta tipo papel con flores en las esquinas. */
const CoupleQuote = () => (
  <section className="relative py-16 md:py-24 px-6">
    <Reveal className="relative mx-auto max-w-xl">
      <div className="relative rounded-sm bg-beige-50/90 px-8 py-14 md:px-14 text-center shadow-[0_15px_50px_-25px_rgba(94,79,60,0.4)]">
        <div className="pointer-events-none absolute inset-3 border border-gold-300/70" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-4 border border-gold-200/60" aria-hidden="true" />

        <span className="block font-elegant text-7xl leading-none text-gold-300 -mb-4" aria-hidden="true">“</span>

        {WEDDING.coupleQuote.paragraphs.map((paragraph, i) => (
          <p key={i} className="font-elegant text-lg md:text-xl leading-relaxed text-sand-700 mb-5">
            {paragraph}
          </p>
        ))}

        <p className="mt-8 font-script text-3xl md:text-4xl leading-snug text-gold-shimmer py-1">
          {WEDDING.coupleQuote.closing}
        </p>
      </div>

      <FloralCluster className="pointer-events-none absolute -bottom-10 -left-10 w-36 md:w-44" variant="small" />
      <div className="pointer-events-none absolute -top-10 -right-10 w-36 md:w-44 rotate-180">
        <FloralCluster variant="small" />
      </div>
    </Reveal>
  </section>
);

export default CoupleQuote;
