import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/themeStore';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface Photo {
  id: string;
  src: string;
  alt: string;
}

const PhotoGallery = () => {
  const { isDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadPhotos = () => {
      try {
        // Generar nombres de fotos automáticamente
        const photoNames = [
          ...Array.from({ length: 10 }, (_, i) => `collage-${String(i + 1).padStart(2, '0')}.jpg`),
          ...Array.from({ length: 50 }, (_, i) => `photo-${String(i + 1).padStart(2, '0')}.jpg`)
        ];

        // Generar URLs directamente - el navegador maneja las que no existen
        const photoList: Photo[] = photoNames.map((fileName) => {
          const { data } = supabase.storage
            .from('wedding-photos')
            .getPublicUrl(fileName);

          return {
            id: fileName,
            src: data.publicUrl,
            alt: `Foto de boda - ${fileName}`
          };
        });

        // Randomizar orden
        const randomizedPhotos = photoList.sort(() => Math.random() - 0.5);

        // Usar flushSync para forzar actualización INMEDIATA y SÍNCRONA
        flushSync(() => {
          setPhotos(randomizedPhotos);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error cargando fotos:', error);
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const handleBack = () => {
    // Ir a la página anterior en lugar de la principal
    navigate(-1);
  };

  const handleImageError = (photoId: string) => {
    setFailedImages(prev => new Set(prev).add(photoId));
  };

  // Filter out failed images
  const visiblePhotos = photos.filter(photo => !failedImages.has(photo.id));

  return (
    <div className={`min-h-screen bg-lavender-50 transition-colors duration-500`}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              className="border-2 border-coral-400 text-coral-400 hover:bg-coral-100 font-semibold text-sm rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </Button>
            
            <h1 className={`text-2xl font-script ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
              Galería de Fotos
            </h1>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-500`}>
                Cargando fotos...
              </p>
            </div>
          </div>
        ) : visiblePhotos.length === 0 ? (
          <div className="text-center py-20">
            <Heart className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4 transition-colors duration-500`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2 transition-colors duration-500`}>
              No se encontraron fotos
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-500`}>
              Las fotos se cargarán pronto
            </p>
          </div>
        ) : (
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] xl:w-[calc(25%-0.75rem)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => handleImageError(photo.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* Mensaje romántico */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className={`text-3xl font-script ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-500`}>
            Nuestra Sesión Pre Boda
          </h2>
          <p className={`text-sm text-slate-600 max-w-2xl mx-auto transition-colors duration-500`}>
            Momentos capturados antes del gran día. Cada foto refleja la emoción y el amor 
            que nos une mientras nos preparamos para decir "Sí, acepto".
          </p>
        </motion.div>
      </div>

      {/* Modal para foto seleccionada */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            className="relative max-w-4xl max-h-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos.find(p => p.id === selectedPhoto)?.src}
              alt={photos.find(p => p.id === selectedPhoto)?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Controles */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Botón cerrar */}
            <Button
              onClick={() => setSelectedPhoto(null)}
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoGallery;
