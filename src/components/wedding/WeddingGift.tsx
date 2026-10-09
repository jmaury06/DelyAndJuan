import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Mail, QrCode } from "lucide-react";
import { useState } from "react";
import qrRegalo from "@/assets/qr-regalo.svg";
import Reveal from "@/components/wedding/Reveal";
import SectionTitle from "@/components/wedding/SectionTitle";

/*
 * Regalo de boda: lluvia de sobres + QR.
 * El QR vive en local (src/assets). Reemplaza qr-regalo.svg por la imagen real
 * (p. ej. qr-regalo.png) y actualiza el import de arriba.
 */

const WeddingGift = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <section className="relative py-14 md:py-20 px-6">
      <SectionTitle eyebrow="Detalles" title="Regalo de boda" />

      <Reveal className="mx-auto max-w-lg text-center">
        <p className="font-elegant text-lg md:text-xl leading-relaxed text-sand-600">
          Nuestro mejor regalo es tu presencia. Si deseas tener un detalle con nosotros,
          tendremos <span className="text-gold-600">lluvia de sobres</span> durante la celebración,
          o si te resulta más cómodo, puedes hacerlo a través del código QR.
        </p>

        <div className="mt-8 flex items-center justify-center gap-8 text-gold-500">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-white/70">
              <Mail className="h-6 w-6" strokeWidth={1.4} />
            </div>
            <span className="eyebrow text-[0.6rem]">Sobres</span>
          </div>
          <span className="font-script text-3xl text-gold-300">o</span>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-white/70">
              <QrCode className="h-6 w-6" strokeWidth={1.4} />
            </div>
            <span className="eyebrow text-[0.6rem]">QR</span>
          </div>
        </div>

        <button type="button" onClick={() => setShowQR((v) => !v)} className="btn-outline-gold mt-8" aria-expanded={showQR}>
          {showQR ? "Ocultar QR" : "Ver QR"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showQR ? "rotate-180" : ""}`} />
        </button>
      </Reveal>

      <AnimatePresence>
        {showQR && (
          <motion.div
            className="mx-auto mt-8 max-w-xs overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-3xl border border-gold-200 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(154,123,58,0.4)]">
              <img src={qrRegalo} alt="Código QR para el regalo de boda" className="w-full rounded-xl" />
              <p className="mt-4 text-center font-script text-2xl text-sand-600">Gracias por tu detalle</p>
              <a href={qrRegalo} download="qr-regalo-delia-juan" className="btn-outline-gold mt-4 w-full">
                <Download className="h-4 w-4" />
                Descargar QR
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingGift;
