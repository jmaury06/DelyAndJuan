import { useMemo, type CSSProperties } from "react";
import { TONES, type FlowerTone } from "./Flowers";

/*
 * Pétalos y florecitas cayendo suavemente sobre toda la invitación.
 * Capa fija, sin eventos de puntero. Animación por CSS (.petal en index.css).
 */

const TONE_CYCLE: FlowerTone[] = ["white", "sky", "beige", "sand", "white", "sky"];

// Pseudoaleatorio determinista para que el layout no cambie entre renders
const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const Petal = ({ tone }: { tone: FlowerTone }) => {
  const { light, mid, dark } = TONES[tone];
  return (
    <svg viewBox="0 0 20 28" width="100%" height="100%">
      <path d="M10 27 C1 20 0 8 10 1 C20 8 19 20 10 27Z" fill={mid} stroke={dark} strokeOpacity="0.35" strokeWidth="0.6" />
      <path d="M10 24 C5 18 5 9 10 4" fill="none" stroke={light} strokeWidth="1.4" opacity="0.8" />
    </svg>
  );
};

const TinyBlossom = ({ tone }: { tone: FlowerTone }) => {
  const { mid, dark } = TONES[tone];
  return (
    <svg viewBox="-20 -20 40 40" width="100%" height="100%">
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="0" cy="-9" rx="6" ry="9" fill={mid} stroke={dark} strokeOpacity="0.3" strokeWidth="0.6" transform={`rotate(${i * 72})`} />
      ))}
      <circle r="3.5" fill="#C9A961" />
    </svg>
  );
};

const FallingPetals = ({ count = 18 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 12 + seeded(i, 1) * 16;
        const duration = 16 + seeded(i, 2) * 14;
        return {
          i,
          tone: TONE_CYCLE[i % TONE_CYCLE.length],
          blossom: i % 4 === 0,
          style: {
            left: `${seeded(i, 3) * 100}%`,
            width: size,
            height: size * 1.3,
            animationDuration: `${duration}s`,
            animationDelay: `${-seeded(i, 4) * duration}s`,
            "--drift": `${(seeded(i, 5) - 0.5) * 220}px`,
            "--spin": `${(seeded(i, 6) > 0.5 ? 1 : -1) * (360 + seeded(i, 7) * 360)}deg`,
          } as CSSProperties,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map(({ i, tone, blossom, style }) => (
        <div key={i} className="petal" style={style}>
          <div style={{ width: "100%", height: "100%", animationDelay: `${-i * 0.7}s` }}>
            {blossom ? <TinyBlossom tone={tone} /> : <Petal tone={tone} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
