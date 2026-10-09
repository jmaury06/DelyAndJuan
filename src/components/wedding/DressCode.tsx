import { motion } from "framer-motion";
import { WEDDING } from "@/config/wedding";
import Divider from "@/components/wedding/Divider";
import { LongDress, Tuxedo } from "@/components/wedding/DressIcons";
import Reveal from "@/components/wedding/Reveal";
import SectionTitle from "@/components/wedding/SectionTitle";

/** Código de vestimenta, tonos reservados y aviso de celebración sin niños. */
const DressCode = () => {
  const { title, women, men, reservedTones } = WEDDING.dressCode;

  return (
    <section className="relative py-14 md:py-20 px-6">
      <SectionTitle eyebrow="Código de vestimenta" title={title} />

      <Reveal className="mx-auto mt-4 grid max-w-md grid-cols-2 divide-x divide-gold-200 text-center">
        <div className="px-4">
          <p className="eyebrow mb-4">Mujeres</p>
          <LongDress />
          <p className="mt-4 font-elegant text-xl sm:text-2xl text-sand-700">{women}</p>
        </div>
        <div className="px-4">
          <p className="eyebrow mb-4">Hombres</p>
          <Tuxedo />
          <p className="mt-4 font-elegant text-xl sm:text-2xl text-sand-700">{men}</p>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-md text-center" delay={0.1}>
        <p className="font-script text-4xl text-gold-shimmer py-1">Tonos reservados</p>
        <p className="mt-2 font-elegant text-base text-sand-500">
          Con cariño te pedimos evitar estos colores, reservados para la decoración y los novios.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          {reservedTones.map((tone, i) => (
            <motion.div
              key={tone.name}
              className="flex w-[3.6rem] flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <span
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-gold-300 shadow-inner ring-4 ring-white"
                style={{ backgroundColor: tone.hex }}
              />
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-sand-500">{tone.name}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Divider className="my-14" />

      <Reveal className="mx-auto max-w-md text-center">
        <p className="eyebrow mb-3">Una noche para adultos</p>
        <p className="font-script text-4xl text-gold-shimmer py-1">Sin niños</p>
        <p className="mt-3 font-elegant text-lg leading-relaxed text-sand-600">
          Amamos a sus pequeños, pero hemos pensado esta celebración solo para adultos.
          Gracias por su comprensión.
        </p>
      </Reveal>
    </section>
  );
};

export default DressCode;
