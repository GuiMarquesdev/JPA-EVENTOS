import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
}

export function TiltedCard({
  children,
  className = '',
  maxTilt = 4,
  scaleOnHover = 1.01,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [transform, setTransform] = useState(
    'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = (0.5 - py) * 2 * maxTilt;

    setTransform(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, 1)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion ? undefined : transform,
        transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
