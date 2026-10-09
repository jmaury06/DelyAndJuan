import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WEDDING } from "@/config/wedding";
import FloralWreath from "@/components/wedding/floral/FloralWreath";
import Reveal from "@/components/wedding/Reveal";

const WEDDING_TIME = new Date(WEDDING.dateISO).getTime();

const getTimeLeft = () => {
  const difference = Math.max(0, WEDDING_TIME - Date.now());
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];
  const isToday = WEDDING_TIME - Date.now() <= 0;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <Reveal className="relative mx-auto w-[min(94vw,480px)] aspect-square">
        <FloralWreath className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="eyebrow">{isToday ? "Llegó el día" : "Faltan"}</p>

          <div className="mt-3 flex items-start justify-center gap-2.5 sm:gap-4">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-start">
                {i > 0 && <span className="mr-2.5 sm:mr-4 font-elegant text-2xl sm:text-3xl text-gold-300 leading-[1.1]">·</span>}
                <div className="w-11 sm:w-14">
                  <motion.div
                    key={unit.value}
                    className="font-elegant text-3xl sm:text-5xl font-light text-sand-700 tabular-nums leading-none"
                    initial={{ opacity: 0.2, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.div>
                  <div className="mt-1.5 font-sans text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-gold-500">
                    {unit.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 font-script text-2xl sm:text-3xl text-sand-500">para el gran día</p>
        </div>
      </Reveal>
    </section>
  );
};

export default CountdownTimer;
