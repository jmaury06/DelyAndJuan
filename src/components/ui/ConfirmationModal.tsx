import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PartyPopper, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/themeStore";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmed: boolean;
  guestName: string;
}

const ConfirmationModal = ({ isOpen, onClose, confirmed, guestName }: ConfirmationModalProps) => {
  const { isDarkMode } = useThemeStore();

  // Modal se cierra solo cuando el usuario lo decide

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isDarkMode ? 'bg-slate-900/95' : 'bg-black/80'
        } backdrop-blur-sm transition-colors duration-500`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Confeti para confirmación positiva */}
        {confirmed && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 ${
                  i % 5 === 0 ? 'bg-mauve-300' :
                  i % 5 === 1 ? 'bg-mauve-400' :
                  i % 5 === 2 ? 'bg-sage-400' :
                  i % 5 === 3 ? 'bg-mauve-300' : 'bg-mauve-200'
                } rounded-full`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          className={`relative max-w-lg w-full ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          } rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500`}
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>

          {confirmed ? (
            // Modal de confirmación positiva
            <div className="p-8 text-center">
              {/* Decoración superior */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mauve-300 via-mauve-400 to-mauve-500`}></div>
              
              {/* Icono principal */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
              >
                <div className="relative">
                  <PartyPopper className="w-20 h-20 text-green-500 mx-auto" />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Título */}
              <motion.h2
                className={`font-script text-3xl md:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-500`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ¡Gracias {guestName}!
              </motion.h2>

              {/* Mensaje */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className={`text-lg md:text-xl text-slate-600 leading-relaxed transition-colors duration-500`}>
                  Nos hace muy feliz tu confirmación
                </p>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed transition-colors duration-500`}>
                  Te esperamos ese día para compartir juntos este momento tan especial
                </p>
              </motion.div>

              {/* Corazones animados */}
              <motion.div
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <Heart className="w-6 h-6 text-mauve-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Botón */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-sage-400 to-sage-500 hover:from-sage-500 hover:to-sage-600 text-white font-script px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ¡Nos vemos en la boda!
                </Button>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-3 transition-colors duration-500`}>
                  Toca fuera del mensaje para cerrar
                </p>
              </motion.div>
            </div>
          ) : (
            // Modal de confirmación negativa
            <div className="p-8 text-center">
              {/* Decoración superior */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400`}></div>
              
              {/* Icono principal */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
              >
                <div className="relative">
                  <Heart className="w-20 h-20 text-gray-400 mx-auto" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-20 h-20 text-mauve-300 mx-auto" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Título */}
              <motion.h2
                className={`font-script text-3xl md:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-500`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ¡Qué lástima {guestName}!
              </motion.h2>

              {/* Mensaje */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                  <p className={`text-lg md:text-xl text-slate-600 leading-relaxed transition-colors duration-500`}>
                  Nos gustaría que estuvieses ahí compartiendo con nosotros
                </p>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed transition-colors duration-500`}>
                  Eres una persona importante en nuestro proceso y te queremos mucho.
                </p>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed transition-colors duration-500`}>
                  Entendemos tu no asistencia, te deseamos lo mejor y nos vemos pronto.
                </p>
              </motion.div>

              {/* Corazón solitario */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-8 h-8 text-mauve-300 fill-current" />
                </motion.div>
              </motion.div>

              {/* Botón */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Button
                  onClick={onClose}
                  className="bg-mauve-300 hover:bg-mauve-400 !text-white font-script px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Nos vemos pronto
                </Button>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-3 transition-colors duration-500`}>
                  Toca fuera del mensaje para cerrar
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
