import { BabyBreath, Blossom, FlowerSvg, GoldSprig, Leaf, Rose, type FlowerTone } from "./Flowers";

/*
 * Corona floral asimétrica (dos medias lunas de flores) para rodear el contador.
 * viewBox 400x400, centro (200,200).
 */

const C = 200;
const R = 168;
const polar = (deg: number, radius = R) => {
  const rad = (deg * Math.PI) / 180;
  return { x: C + Math.cos(rad) * radius, y: C + Math.sin(rad) * radius };
};

type Item =
  | { kind: "rose"; deg: number; size: number; tone: FlowerTone; r?: number }
  | { kind: "blossom"; deg: number; size: number; tone: FlowerTone; r?: number }
  | { kind: "breath"; deg: number; size: number; r?: number };

// Media luna superior-izquierda (de 150° a 285°) y inferior-derecha (de -30° a 100°)
const ARCS = [
  { from: 150, to: 290 },
  { from: -30, to: 105 },
];

const FLOWERS: Item[] = [
  // superior izquierda
  { kind: "rose", deg: 205, size: 93, tone: "white" },
  { kind: "rose", deg: 232, size: 72, tone: "sky", r: 176 },
  { kind: "blossom", deg: 182, size: 49, tone: "beige", r: 160 },
  { kind: "rose", deg: 258, size: 58, tone: "sand", r: 162 },
  { kind: "blossom", deg: 278, size: 38, tone: "sky", r: 172 },
  { kind: "blossom", deg: 160, size: 35, tone: "white", r: 172 },
  { kind: "breath", deg: 218, size: 52, r: 190 },
  { kind: "breath", deg: 170, size: 44, r: 148 },
  // inferior derecha
  { kind: "rose", deg: 30, size: 96, tone: "beige" },
  { kind: "rose", deg: 58, size: 70, tone: "white", r: 160 },
  { kind: "rose", deg: 4, size: 55, tone: "sky", r: 176 },
  { kind: "blossom", deg: 82, size: 44, tone: "sky", r: 172 },
  { kind: "blossom", deg: -18, size: 35, tone: "sand", r: 162 },
  { kind: "breath", deg: 44, size: 49, r: 192 },
  { kind: "breath", deg: 92, size: 41, r: 150 },
];

const SPARKLES = [120, 300, 330, 135, 110, 315].map((deg, i) => ({ ...polar(deg, 150 + (i % 3) * 18), i }));

const FloralWreath = ({ className }: { className?: string }) => {
  const leaves = ARCS.flatMap(({ from, to }) => {
    const out: { x: number; y: number; rot: number; gold: boolean; key: string }[] = [];
    for (let deg = from; deg <= to; deg += 9) {
      const side = Math.round(deg / 9) % 2 === 0 ? 1 : -1;
      const p = polar(deg, R + side * 6);
      // tangente a la circunferencia, alternando hacia afuera y adentro
      out.push({ ...p, rot: deg + 90 + side * 50, gold: Math.round(deg / 9) % 4 === 0, key: `${from}-${deg}` });
    }
    return out;
  });

  return (
    <FlowerSvg viewBox="0 0 400 400" className={className}>
      {/* Aros dorados */}
      <circle cx={C} cy={C} r="150" fill="none" stroke="#C9A961" strokeWidth="1" opacity="0.7" />
      <g className="flower-spin">
        <circle cx={C} cy={C} r="140" fill="none" stroke="#DCC58A" strokeWidth="0.8" strokeDasharray="2 7" />
      </g>

      <g className="flower-sway-wide">
        {/* Ramitas doradas que salen de cada media luna */}
        <GoldSprig {...polar(292, 170)} size={60} rotate={30} animate="flower-sway" />
        <GoldSprig {...polar(148, 168)} size={52} rotate={-150} animate="flower-sway" delay={1.2} />
        <GoldSprig {...polar(108, 168)} size={56} rotate={150} animate="flower-sway" delay={0.6} />
        <GoldSprig {...polar(-32, 170)} size={50} rotate={-20} animate="flower-sway" delay={1.8} />

        {leaves.map((l, i) => (
          <Leaf key={l.key} x={l.x} y={l.y} size={56} rotate={l.rot} gold={l.gold} animate="flower-sway" delay={(i % 5) * 0.7} />
        ))}

        {FLOWERS.map((f, i) => {
          const p = polar(f.deg, f.r ?? R);
          const common = { ...p, size: f.size, rotate: (i * 47) % 360, animate: "flower-breathe", delay: (i % 6) * 0.8 };
          if (f.kind === "rose") return <Rose key={i} tone={f.tone} {...common} />;
          if (f.kind === "blossom") return <Blossom key={i} tone={f.tone} {...common} />;
          return <BabyBreath key={i} {...common} />;
        })}
      </g>

      {/* Destellos dorados */}
      {SPARKLES.map(({ x, y, i }) => (
        <path
          key={i}
          d={`M${x} ${y - 6} L${x + 1.5} ${y - 1.5} L${x + 6} ${y} L${x + 1.5} ${y + 1.5} L${x} ${y + 6} L${x - 1.5} ${y + 1.5} L${x - 6} ${y} L${x - 1.5} ${y - 1.5}Z`}
          fill="#C9A961"
          className="twinkle"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </FlowerSvg>
  );
};

export default FloralWreath;
