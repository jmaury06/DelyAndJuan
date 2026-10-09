import ConfirmationModal from "@/components/ui/ConfirmationModal";
import Divider from "@/components/wedding/Divider";
import Reveal from "@/components/wedding/Reveal";
import { WEDDING } from "@/config/wedding";
import { useToast } from "@/hooks/use-toast";
import { GuestData } from "@/hooks/useGuest";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface PersonalizedWelcomeProps {
  guestData: GuestData;
  onConfirmation?: (confirma: boolean) => Promise<boolean> | boolean;
}

const PersonalizedWelcome = ({ guestData, onConfirmation }: PersonalizedWelcomeProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastConfirmation, setLastConfirmation] = useState<boolean | null>(null);

  const handleConfirmation = async (confirma: boolean) => {
    if (isProcessing || showModal || !onConfirmation) return;

    setIsProcessing(true);
    try {
      const success = await onConfirmation(confirma);
      if (success) {
        setLastConfirmation(confirma);
        setShowModal(true);
      } else {
        toast({
          title: "Error",
          description: "No se pudo procesar tu confirmación. Intenta nuevamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const guestName = `${guestData.nombre} ${guestData.apellido}`.trim();

  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Versículo */}
        <Reveal className="mb-12">
          <p className="font-elegant italic text-xl md:text-2xl leading-relaxed text-sand-600">
            “{WEDDING.verse.text}”
          </p>
          <p className="mt-3 eyebrow">{WEDDING.verse.reference}</p>
          <Divider className="mt-10" />
        </Reveal>

        {/* Mensaje para el invitado */}
        <Reveal>
          {WEDDING.guestMessage.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-elegant italic text-2xl md:text-3xl leading-snug text-sand-700 mb-6"
                  : "font-elegant text-lg md:text-xl leading-relaxed text-sand-600 mb-4"
              }
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Divider className="my-10" />

        {/* Tarjeta personalizada */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-md rounded-[2rem] border border-gold-200 bg-white/70 px-6 py-10 shadow-[0_10px_40px_-20px_rgba(154,123,58,0.35)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] border border-gold-100" aria-hidden="true" />

            <p className="eyebrow">Invitación especial para</p>
            <h2 className="mt-3 font-script text-5xl text-gold-shimmer leading-tight py-1">{guestName}</h2>

            <div className="mt-6 flex items-center justify-center gap-10">
              <div>
                <p className="font-elegant text-5xl font-light text-sand-700">{guestData.cupos}</p>
                <p className="mt-1 eyebrow text-[0.6rem]">{guestData.cupos === 1 ? "Cupo" : "Cupos"}</p>
              </div>
              {guestData.mesa && guestData.confirma === true && (
                <div className="border-l border-gold-200 pl-10">
                  <p className="font-elegant text-5xl font-light text-sand-700">{guestData.mesa}</p>
                  <p className="mt-1 eyebrow text-[0.6rem]">Mesa</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              {guestData.confirma === null ? (
                <>
                  <p className="mb-5 font-elegant text-lg text-sand-600">¿Nos acompañas?</p>
                  <div className="mx-auto flex max-w-xs flex-col gap-3">
                    <button type="button" onClick={() => handleConfirmation(true)} disabled={isProcessing} className="btn-gold">
                      <Check className="h-4 w-4" />
                      {isProcessing ? "Confirmando..." : "Sí, asistiré"}
                    </button>
                    <button type="button" onClick={() => handleConfirmation(false)} disabled={isProcessing} className="btn-outline-gold">
                      <X className="h-4 w-4" />
                      No podré asistir
                    </button>
                  </div>
                </>
              ) : (
                <p className="inline-block rounded-full bg-celeste-50 border border-celeste-200 px-5 py-2 font-elegant text-lg text-sand-700">
                  {guestData.confirma ? "¡Asistencia confirmada! Te esperamos" : "Gracias por avisarnos, te extrañaremos"}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        confirmed={lastConfirmation === true}
        guestName={guestName}
      />
    </section>
  );
};

export default PersonalizedWelcome;
