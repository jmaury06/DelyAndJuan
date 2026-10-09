import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/storage";
import { useThemeStore } from "@/stores/themeStore";
import { useNavigate } from "react-router-dom";

interface PreWeddingCarouselProps {
  className?: string;
}

export const PreWeddingCarousel = ({ className }: PreWeddingCarouselProps) => {
  const { isDarkMode } = useThemeStore();
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const imageUrls = Array.from({ length: 10 }, (_, i) => 
      getImageUrl(`collage-${String(i + 1).padStart(2, '0')}.jpg`)
    );
    setImages(imageUrls);
  }, []);

  const handleViewMore = () => {
    // Usar window.location para navegación limpia sin problemas de Router
    window.location.href = '/photo_collage';
  };

  if (images.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {/* Collage de fotos en grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image}
                alt={`Foto pre boda ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Botón Ver Más Fotos */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={handleViewMore}
              className={`bg-mauve-400 hover:bg-mauve-500 text-white text-xl font-semibold px-8 py-3 rounded-full font-script shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              Ver Más Fotos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreWeddingCarousel;
