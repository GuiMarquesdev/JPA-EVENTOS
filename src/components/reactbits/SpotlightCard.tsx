import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: 'div' | 'article';
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(245, 143, 192, 0.16)',
  as = 'div',
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = as;

  return (
    <Component
      ref={containerRef as never}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (!prefersReducedMotion) setOpacity(1);
      }}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </Component>
  );
}
