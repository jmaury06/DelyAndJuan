/** Divisor ornamental dorado: líneas finas con una flor al centro. */
const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`mx-auto my-6 flex w-56 items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400" />
    <svg viewBox="-20 -20 40 40" className="h-5 w-5 flower-breathe">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d="M0 0 C-5 -5 -5 -13 0 -17 C5 -13 5 -5 0 0Z"
          fill={i % 2 ? "#CFE1F1" : "#FFFFFF"}
          stroke="#C9A961"
          strokeWidth="1.2"
          transform={`rotate(${i * 90 + 45})`}
        />
      ))}
      <circle r="3" fill="#C9A961" />
    </svg>
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400" />
  </div>
);

export default Divider;
