import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  decimalSeparator?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.25,
  decimals = 0,
  decimalSeparator = ',',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion ? to : from
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(to);
      return;
    }
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, isInView, prefersReducedMotion]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals).replace('.', decimalSeparator)
      : Math.round(displayValue).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}
