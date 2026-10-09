import { createContext, useContext, useId, type CSSProperties, type ReactNode } from "react";

/*
 * Flores vectoriales de la invitación (rosas, flores pequeñas, hojas y ramitas)
 * en la paleta blanco · dorado · azul cielo · beige · arena.
 * Se dibujan como <g> para poder componerlas dentro de un mismo <svg>.
 */

export type FlowerTone = "white" | "sky" | "beige" | "sand";

export const TONES: Record<FlowerTone, { light: string; mid: string; dark: string }> = {
  white: { light: "#FFFFFF", mid: "#F3EADA", dark: "#C9B48C" },
  sky: { light: "#EAF3FB", mid: "#B6D0EA", dark: "#6890C0" },
  beige: { light: "#FCF6EC", mid: "#EBDAC0", dark: "#BF9F72" },
  sand: { light: "#F3E5CF", mid: "#D8BA8D", dark: "#A28050" },
};

const TONE_KEYS = Object.keys(TONES) as FlowerTone[];
const GOLD = { light: "#F5ECD3", mid: "#C9A961", dark: "#9A7B3A" };
const LEAF = { light: "#D3D9C4", mid: "#B4BFA4", dark: "#8C9A80" };

const PrefixContext = createContext("fl");
const usePrefix = () => useContext(PrefixContext);

interface FlowerSvgProps {
  viewBox: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Contenedor <svg> con los degradados que usan todas las flores. */
export const FlowerSvg = ({ viewBox, className, style, children }: FlowerSvgProps) => {
  const prefix = "fl" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{ filter: "drop-shadow(0 2px 3px rgba(154, 123, 58, 0.22))", ...style }}
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        {TONE_KEYS.map((tone) => (
          <radialGradient key={tone} id={`${prefix}-petal-${tone}`} cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor={TONES[tone].dark} />
            <stop offset="45%" stopColor={TONES[tone].mid} />
            <stop offset="100%" stopColor={TONES[tone].light} />
          </radialGradient>
        ))}
        <linearGradient id={`${prefix}-leaf`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={LEAF.dark} />
          <stop offset="100%" stopColor={LEAF.light} />
        </linearGradient>
        <linearGradient id={`${prefix}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD.dark} />
          <stop offset="50%" stopColor={GOLD.mid} />
          <stop offset="100%" stopColor={GOLD.light} />
        </linearGradient>
      </defs>
      <PrefixContext.Provider value={prefix}>{children}</PrefixContext.Provider>
    </svg>
  );
};

interface PlacedProps {
  x?: number;
  y?: number;
  /** Tamaño aproximado en unidades del viewBox (100 = diámetro base). */
  size?: number;
  rotate?: number;
  /** Clase de animación (flower-breathe, flower-sway...) */
  animate?: string;
  delay?: number;
}

const Placed = ({ x = 0, y = 0, size = 100, rotate = 0, animate, delay = 0, children }: PlacedProps & { children: ReactNode }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size / 100})`}>
    <g className={animate} style={animate ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </g>
  </g>
);

const PETAL = "M0 0 C-24 -8 -30 -38 0 -47 C30 -38 24 -8 0 0Z";

/** Rosa vista desde arriba: tres capas de pétalos y un centro en espiral. */
export const Rose = ({ tone = "white", ...props }: PlacedProps & { tone?: FlowerTone }) => {
  const p = usePrefix();
  const fill = `url(#${p}-petal-${tone})`;
  const { dark, mid } = TONES[tone];
  const layer = (scale: number, offset: number) =>
    [0, 1, 2, 3, 4].map((i) => (
      <path
        key={`${scale}-${i}`}
        d={PETAL}
        fill={fill}
        stroke={dark}
        strokeOpacity={0.35}
        strokeWidth={0.8 / scale}
        transform={`rotate(${i * 72 + offset}) scale(${scale})`}
      />
    ));

  return (
    <Placed {...props}>
      {layer(1, 0)}
      {layer(0.74, 36)}
      {layer(0.5, 12)}
      <circle r="11" fill={mid} />
      <path
        d="M1 -1 C6 -4 8 3 3 6 C-3 9 -9 3 -6 -3 C-3 -9 6 -10 10 -4"
        fill="none"
        stroke={dark}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </Placed>
  );
};

const SMALL_PETAL = "M0 0 C-13 -9 -13 -32 0 -38 C13 -32 13 -9 0 0Z";

/** Flor pequeña de cinco pétalos con centro dorado. */
export const Blossom = ({ tone = "sky", ...props }: PlacedProps & { tone?: FlowerTone }) => {
  const p = usePrefix();
  const { dark } = TONES[tone];
  return (
    <Placed {...props}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={SMALL_PETAL}
          fill={`url(#${p}-petal-${tone})`}
          stroke={dark}
          strokeOpacity={0.3}
          strokeWidth="0.8"
          transform={`rotate(${i * 72})`}
        />
      ))}
      <circle r="7" fill={`url(#${p}-gold)`} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} r="1.6" cx={Math.cos((i * Math.PI) / 3) * 10} cy={Math.sin((i * Math.PI) / 3) * 10} fill={GOLD.dark} opacity="0.7" />
      ))}
    </Placed>
  );
};

/** Hoja estilo eucalipto. `gold` la dibuja en línea dorada. */
export const Leaf = ({ gold = false, ...props }: PlacedProps & { gold?: boolean }) => {
  const p = usePrefix();
  return (
    <Placed {...props}>
      <path
        d="M0 0 C14 -14 14 -38 0 -54 C-14 -38 -14 -14 0 0Z"
        fill={gold ? "none" : `url(#${p}-leaf)`}
        stroke={gold ? `url(#${p}-gold)` : LEAF.dark}
        strokeWidth={gold ? 2 : 0.8}
        strokeOpacity={gold ? 1 : 0.5}
      />
      <path d="M0 -2 L0 -48" stroke={gold ? GOLD.mid : LEAF.dark} strokeWidth="1" opacity="0.6" />
    </Placed>
  );
};

/** Ramita dorada con hojitas alternas. */
export const GoldSprig = (props: PlacedProps) => {
  const p = usePrefix();
  const leaves = [0.18, 0.36, 0.54, 0.72, 0.88];
  return (
    <Placed {...props}>
      <path d="M0 0 C4 -30 -4 -60 0 -95" fill="none" stroke={`url(#${p}-gold)`} strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map((t, i) => (
        <path
          key={i}
          d="M0 0 C6 -5 6 -14 0 -20 C-6 -14 -6 -5 0 0Z"
          fill={i % 2 ? GOLD.mid : "none"}
          stroke={GOLD.mid}
          strokeWidth="1"
          opacity="0.9"
          transform={`translate(${i % 2 ? 1 : -1} ${-95 * t}) rotate(${i % 2 ? 45 : -45})`}
        />
      ))}
    </Placed>
  );
};

/** Velo de novia / gypsophila: puntitos blancos y dorados. */
export const BabyBreath = (props: PlacedProps) => {
  const dots = [
    [0, 0, 4], [8, -6, 3], [-7, -9, 3.4], [3, -15, 2.6], [-12, 2, 2.4], [12, 4, 2.2], [-3, 9, 2.4],
  ];
  return (
    <Placed {...props}>
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x * 2} cy={y * 2} r={r * 1.6} fill={i % 3 === 0 ? GOLD.light : "#FFFFFF"} stroke={GOLD.mid} strokeWidth="0.6" strokeOpacity="0.6" />
      ))}
    </Placed>
  );
};
