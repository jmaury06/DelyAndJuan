import { BabyBreath, Blossom, FlowerSvg, GoldSprig, Leaf, Rose } from "./Flowers";

/*
 * Ramillete para esquinas (portada, secciones). El ancla está abajo a la izquierda
 * del viewBox; usa `flip` para reflejarlo en la esquina contraria.
 */

interface FloralClusterProps {
  className?: string;
  flip?: boolean;
  /** Variante de composición */
  variant?: "full" | "small";
}

const FloralCluster = ({ className, flip = false, variant = "full" }: FloralClusterProps) => (
  <FlowerSvg
    viewBox="0 0 240 240"
    className={className}
    style={flip ? { transform: "scaleX(-1)" } : undefined}
  >
    <g className="flower-sway-wide" style={{ transformOrigin: "left bottom" }}>
      <GoldSprig x={70} y={190} size={110} rotate={28} animate="flower-sway" />
      <GoldSprig x={60} y={200} size={90} rotate={70} animate="flower-sway" delay={1.4} />

      <Leaf x={80} y={170} size={70} rotate={-10} animate="flower-sway" delay={0.4} />
      <Leaf x={95} y={175} size={64} rotate={40} animate="flower-sway" delay={1.1} />
      <Leaf x={70} y={180} size={60} rotate={95} gold animate="flower-sway" delay={0.8} />
      <Leaf x={60} y={165} size={58} rotate={-55} animate="flower-sway" delay={1.6} />
      {variant === "full" && (
        <>
          <Leaf x={120} y={150} size={56} rotate={60} animate="flower-sway" delay={2} />
          <Leaf x={50} y={130} size={52} rotate={-20} gold animate="flower-sway" delay={0.2} />
        </>
      )}

      <Rose x={78} y={168} size={78} tone="white" rotate={10} animate="flower-breathe" />
      <Rose x={124} y={182} size={52} tone="sky" rotate={40} animate="flower-breathe" delay={1.5} />
      <Blossom x={46} y={140} size={34} tone="beige" animate="flower-breathe" delay={0.7} />
      <BabyBreath x={110} y={140} size={34} animate="flower-breathe" delay={2.1} />

      {variant === "full" && (
        <>
          <Rose x={52} y={198} size={50} tone="sand" rotate={70} animate="flower-breathe" delay={0.9} />
          <Blossom x={150} y={160} size={28} tone="sky" animate="flower-breathe" delay={1.2} />
          <Blossom x={92} y={120} size={24} tone="white" animate="flower-breathe" delay={2.4} />
          <BabyBreath x={30} y={175} size={30} animate="flower-breathe" delay={0.3} />
        </>
      )}
    </g>
  </FlowerSvg>
);

export default FloralCluster;
