import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  show: boolean;
}

const FloatingMusicButton = ({ isPlaying, onToggle, show }: FloatingMusicButtonProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className={`fixed bottom-8 right-8 z-50 ${
            isDarkMode ? 'bg-mauve-400' : 'bg-mauve-400'
          } text-white p-4 rounded-full shadow-2xl hover:shadow-mauve-400/50 transition-all duration-300`}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          <div className="relative">
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
            
            {/* Animated music waves when playing */}
            {isPlaying && (
              <motion.div
                className="absolute -inset-3"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full border-2 border-white"></div>
              </motion.div>
            )}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingMusicButton;
