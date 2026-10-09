import Divider from "@/components/wedding/Divider";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useToast } from "@/hooks/use-toast";
import { GuestData } from "@/hooks/useGuest";
import { useThemeStore } from "@/stores/themeStore";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface PersonalizedWelcomeProps {
  guestData: GuestData;
  onConfirmation?: (confirma: boolean) => Promise<boolean> | boolean;
}

const PersonalizedWelcome = ({ guestData, onConfirmation }: PersonalizedWelcomeProps) => {
  const { isDarkMode } = useThemeStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastConfirmation, setLastConfirmation] = useState<boolean | null>(null);

  const handleConfirmation = async (confirma: boolean) => {
    if (isProcessing || showModal) return;

    setIsProcessing(true);

    try {
      if (onConfirmation) {
        const success = await onConfirmation(confirma);

        if (success) {
          // Mostrar modal después de la confirmación exitosa
          setLastConfirmation(confirma);
          setShowModal(true);
        } else {
          toast({
            title: "Error",
            description: "No se pudo procesar tu confirmación. Intenta nuevamente.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsProcessing(false);
  };

  const getConfirmationStatus = () => {
    if (guestData.confirma === null) {
      return { text: 'Pendiente de confirmación', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else if (guestData.confirma) {
      return { text: '¡Confirmado! Nos vemos en la boda', color: 'text-green-600', bg: 'bg-green-100' };
    } else {
      return { text: 'No podrá asistir', color: 'text-red-600', bg: 'bg-red-100' };
    }
  };

  const status = getConfirmationStatus();

  // Detectar si el nombre termina con "y " (con espacio) para usar plural
  const isPlural = guestData.nombre.toLowerCase().endsWith('y');

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-8 relative z-10 max-w-3xl">
        {/* Saludo personalizado con efecto de scroll */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`font-script text-4xl md:text-5xl text-mauve-400 mb-6`}>
            {guestData.nombre} {guestData.apellido}
          </h2>

          <Divider />
        </motion.div>

        {/* Mensaje principal con efecto de scroll */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className={`font-script text-xl font-semibold text-slate-600 mb-8`}>
            {isPlural
              ? 'Son personas muy importantes en nuestra relación y por eso tenemos el gusto de invitarlos a nuestro matrimonio.'
              : 'Eres una persona muy importante en nuestra relación y por eso tenemos el gusto de invitarte a nuestro matrimonio.'
            }
          </p>

          {/* Información compacta - Diseño mejorado */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Cupos */}
            <div className="text-center">
              <p className={`text-xs text-slate-600 uppercase tracking-wider mb-2`}>
                {guestData.cupos === 1 ? 'Cupo' : 'Cupos'}
              </p>
              <p className={`text-4xl md:text-5xl font-bold text-slate-600`}>
                {guestData.cupos}
              </p>
            </div>

            {/* Mesa (solo si existe y confirmó que SÍ asistirá) */}
            {guestData.mesa && guestData.confirma === true && (
              <div className="text-center">
                <p className={`text-xs text-slate-600 uppercase tracking-wider mb-2`}>
                  Mesa
                </p>
                <p className={`text-4xl md:text-5xl font-bold text-slate-600`}>
                  {guestData.mesa}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Confirmación minimalista */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {guestData.confirma === null && ''}

          {/* Estado actual */}
          {typeof status.text === 'boolean' && (
            <div className="mb-6">
              <span className={`inline-block text-slate-600 px-4 py-2 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                {status.text}
              </span>
            </div>
          )}

          {/* Botones de confirmación */}
          {guestData.confirma === null && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                onClick={() => handleConfirmation(true)}
                disabled={isProcessing}
                className="bg-sage-400 hover:bg-sage-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isProcessing ? (
                  <motion.div
                    className="flex items-center gap-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Check className="w-5 h-5" />
                    Confirmando...
                  </motion.div>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Sí, Asistiré
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleConfirmation(false)}
                disabled={isProcessing}
                className="bg-mauve-300 hover:bg-mauve-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <X className="w-5 h-5 mr-2" />
                No Podré Asistir
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        confirmed={lastConfirmation === true}
        guestName={`${guestData.nombre} ${guestData.apellido}`}
      />
    </section>
  );
};

export default PersonalizedWelcome;
