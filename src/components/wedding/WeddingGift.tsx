import { ArrowDown, ArrowUp, Gift, Heart, Download } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { getImageUrl } from "@/lib/storage";
import { motion } from "framer-motion";
import Divider from "@/components/wedding/Divider";
import { Button } from "../ui/button";
import { useState } from "react";

const WeddingGift = () => {
  const { isDarkMode } = useThemeStore();
  const qrImageUrl = getImageUrl('qrbc.jpeg');
  const [isActive, setIsActive] = useState(false);

  const handleShowQR = () => {
    setIsActive(!isActive)
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'codigo-qr-boda.jpg'; // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el QR:', error);
    }
  };

  const handleOpenBankApp = () => {
    // TODO: Reemplazar con el esquema de URL de tu banco (ej: bancolombia://, nequi://)
    // O la URL web de tu banco
    const BANK_APP_URL = '#';
    window.open(BANK_APP_URL, '_blank');
  };

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        {/* Título */}
        <div className="text-center mb-8">
          <motion.h2
            className={`font-script text-3xl md:text-4xl text-mauve-400 mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Regalo de Boda
          </motion.h2>

          <Divider />
        </div>

        {/* Mensaje */}
        <motion.div
          className="text-center mb-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className={`text-sm text-slate-600 leading-relaxed mb-4 max-w-2xl mx-auto`}>
            Nuestro mejor regalo es que nos acompañes en este día tan especial 💍✨ <br /><br />
            Si deseas darnos un detalle, tendremos lluvia de sobres durante la celebración. <br /><br />
            Y si te resulta más cómodo, también puedes hacerlo a través del código QR 💕
          </p>
        </motion.div>

        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={handleShowQR}
              className={`bg-mauve-400 hover:bg-mauve-500 text-white px-8 py-3 rounded-full font-script text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              {!isActive ?
                <>
                  Ver QR
                  <ArrowDown className="w-5 h-5 ml-2" />
                </>
                :
                <>
                  Ocultar QR
                  <ArrowUp className="w-5 h-5 ml-2" />
                </>
              }
            </Button>
          </motion.div>
        </div>

        {/* Código QR */}
        <motion.div
          className={`${isActive ? 'flex' : 'hidden'} justify-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
            <div
              className="cursor-pointer hover:opacity-90 transition-opacity relative group"
              onClick={handleOpenBankApp}
              title="Toca para ir al banco"
            >
              <img
                src={qrImageUrl}
                alt="Código QR para transferencia"
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-lg">
                <span className="bg-white/90 text-slate-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  Ir al Banco
                </span>
              </div>
            </div>

            <p className={`text-center mt-4 text-xl text-slate-600 font-script mb-6`}>
              Gracias por este Detalle 💕
            </p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleDownloadQR}
                variant="outline"
                className="w-full border-mauve-300 text-mauve-500 hover:bg-mauve-50 hover:text-mauve-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar QR
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mensaje de agradecimiento */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Heart className={`w-8 h-8 text-mauve-400 mx-auto mb-3`} fill="currentColor" />
          <p className={`font-script text-xl text-slate-600 max-w-2xl mx-auto`}>
            ¡Gracias por ser parte de este momento tan importante para nosotros! 🥰
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingGift;
