import { motion } from "framer-motion";

/*
 * Ilustraciones del código de vestimenta: vestido largo y smoking negro,
 * colgados de un gancho dorado que se mece suavemente.
 */

const GOLD = "#B8954A";

const Hanger = () => (
  <g fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M60 15 C60 11 59 9 60 6 C61 2 67 2 67 6 C67 9 64 10 62 11" />
    <path d="M60 15 L34 28 L86 28 Z" />
  </g>
);

const Swing = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.svg
    viewBox="0 0 120 220"
    className="mx-auto h-40 w-auto md:h-48 drop-shadow-[0_6px_10px_rgba(154,123,58,0.2)]"
    style={{ originX: 0.5, originY: 0.02 }}
    animate={{ rotate: [-2.5, 2.5, -2.5] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    aria-hidden="true"
  >
    {children}
  </motion.svg>
);

export const LongDress = () => (
  <Swing>
    <defs>
      <linearGradient id="dress-skirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F3EADA" />
      </linearGradient>
    </defs>
    <Hanger />
    <g stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round">
      {/* Tirantes */}
      <path d="M46 28 L47 46 M74 28 L73 46" fill="none" />
      {/* Corpiño con escote corazón */}
      <path d="M44 48 C48 41 55 41 60 48 C65 41 72 41 76 48 L73 74 L47 74 Z" fill="#FFFFFF" />
      {/* Encaje del corpiño */}
      <g fill={GOLD} stroke="none" opacity="0.55">
        <circle cx="52" cy="56" r="1" /><circle cx="60" cy="58" r="1" /><circle cx="68" cy="56" r="1" />
        <circle cx="56" cy="64" r="1" /><circle cx="64" cy="64" r="1" /><circle cx="60" cy="69" r="1" />
      </g>
      {/* Cinturón dorado */}
      <path d="M47 74 L73 74 L72.5 79 L47.5 79 Z" fill="#DCC58A" />
      {/* Falda larga con cola */}
      <path d="M47.5 79 C42 112 28 160 12 208 Q60 220 108 208 C92 160 78 112 72.5 79 Z" fill="url(#dress-skirt)" />
      {/* Pliegues */}
      <g fill="none" strokeWidth="0.8" opacity="0.6">
        <path d="M54 81 C50 120 40 168 32 212" />
        <path d="M60 81 C60 130 59 170 58 215" />
        <path d="M66 81 C70 120 80 168 88 212" />
      </g>
    </g>
  </Swing>
);

export const Tuxedo = () => (
  <Swing delay={0.8}>
    <Hanger />
    <g stroke={GOLD} strokeWidth="1" strokeLinejoin="round">
      {/* Pantalón */}
      <path d="M44 146 L41 212 L57 212 L60 160 L63 212 L79 212 L76 146 Z" fill="#26252A" />
      <path d="M49 150 L49 210 M71 150 L71 210" stroke="#3A393F" strokeWidth="0.8" fill="none" />
      {/* Mangas */}
      <path d="M34 30 L22 40 L15 136 L27 138 L32 72 Z" fill="#232227" />
      <path d="M86 30 L98 40 L105 136 L93 138 L88 72 Z" fill="#232227" />
      {/* Saco */}
      <path d="M34 30 L50 24 L60 36 L70 24 L86 30 L90 44 L88 150 L64 154 L60 148 L56 154 L32 150 L30 44 Z" fill="#2B2A2F" />
      {/* Camisa blanca */}
      <path d="M50 24 L60 36 L70 24 L69 30 L60 96 L51 30 Z" fill="#FFFFFF" />
      {/* Solapas de satín */}
      <path d="M50 24 L60 96 L52 88 L40 52 L47 47 L42 32 Z" fill="#3B3A41" />
      <path d="M70 24 L60 96 L68 88 L80 52 L73 47 L78 32 Z" fill="#3B3A41" />
    </g>
    {/* Corbatín */}
    <path d="M60 34 L50 29 L50 39 Z M60 34 L70 29 L70 39 Z" fill="#141317" />
    <circle cx="60" cy="34" r="2.6" fill="#141317" stroke={GOLD} strokeWidth="0.6" />
    {/* Botones de la camisa */}
    <circle cx="60" cy="50" r="1.3" fill="#141317" />
    <circle cx="60" cy="62" r="1.3" fill="#141317" />
    <circle cx="60" cy="74" r="1.3" fill="#141317" />
    {/* Botón del saco y pañuelo */}
    <circle cx="60" cy="104" r="2.2" fill="#141317" stroke={GOLD} strokeWidth="0.8" />
    <path d="M71 64 L80 64 L77 58 L75 61 L73 57 Z" fill="#FFFFFF" stroke={GOLD} strokeWidth="0.6" />
    <path d="M70 66 L81 66" stroke={GOLD} strokeWidth="0.8" />
  </Swing>
);
