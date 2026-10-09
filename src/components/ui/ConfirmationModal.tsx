import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import FloralCluster from "@/components/wedding/floral/FloralCluster";
import Divider from "@/components/wedding/Divider";
import { WEDDING } from "@/config/wedding";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmed: boolean;
  guestName: string;
}

const CONFETTI_COLORS = ["#C9A961", "#B3CEE8", "#EFE4D2", "#FFFFFF", "#D5BD96"];

// Portal al <body> para quedar por encima de los pétalos y el botón de música
const ConfirmationModal = ({ isOpen, onClose, confirmed, guestName }: ConfirmationModalProps) => createPortal(
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-sand-700/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Confeti dorado y celeste para confirmación positiva */}
        {confirmed && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute block h-2.5 w-1.5 rounded-full"
                style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length], left: `${(i * 37) % 100}%` }}
                initial={{ y: -20, rotate: 0, opacity: 0 }}
                animate={{ y: window.innerHeight + 20, rotate: 540, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4 + (i % 5) * 0.6, delay: (i % 10) * 0.25, ease: "easeOut", repeat: Infinity }}
              />
            ))}
          </div>
        )}

        <motion.div
          className="relative max-h-[90vh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-[2rem] bg-ivory px-8 py-12 text-center shadow-2xl"
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-gold-200" aria-hidden="true" />
          <FloralCluster className="pointer-events-none absolute -bottom-8 -left-8 w-32" variant="small" />
          <div className="pointer-events-none absolute -top-8 -right-8 w-32 rotate-180">
            <FloralCluster variant="small" />
          </div>

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 rounded-full p-2 text-sand-500 transition-colors hover:bg-beige-100"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative">
            <h2 className="font-script text-5xl text-gold-shimmer py-1">
              {confirmed ? "¡Gracias!" : "¡Qué lástima!"}
            </h2>
            <p className="mt-2 font-elegant text-xl text-sand-700">{guestName}</p>
            <Divider />

            {confirmed ? (
              <>
                {WEDDING.thanks.map((paragraph, i) => (
                  <p key={i} className="mb-4 font-elegant text-lg leading-relaxed text-sand-600">
                    {paragraph}
                  </p>
                ))}
                <p className="mt-6 font-elegant italic text-lg text-sand-500">Con cariño,</p>
                <p className="font-script text-4xl text-gold-shimmer py-1">Los novios</p>
              </>
            ) : (
              <p className="font-elegant text-lg leading-relaxed text-sand-600">
                Nos hubiera encantado compartir contigo este día. Gracias por avisarnos; te llevamos en el corazón.
              </p>
            )}

            <button onClick={onClose} className={`${confirmed ? "btn-gold" : "btn-outline-gold"} mt-8`}>
              {confirmed ? "¡Nos vemos en la boda!" : "Nos vemos pronto"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>,
  document.body,
);

export default ConfirmationModal;
