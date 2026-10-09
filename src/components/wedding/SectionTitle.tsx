import Divider from "./Divider";
import Reveal from "./Reveal";

/** Encabezado de sección: antetítulo en versalitas + título caligráfico dorado. */
const SectionTitle = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <Reveal className="text-center">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="font-script text-5xl md:text-6xl text-gold-shimmer leading-tight py-1">{title}</h2>
    <Divider className="mt-3" />
  </Reveal>
);

export default SectionTitle;
