import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface RotatingTextProps {
  texts: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingText({
  texts,
  intervalMs = 2600,
  className = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (texts.length <= 1 || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [texts.length, intervalMs, prefersReducedMotion]);

  if (texts.length === 0) return null;

  if (prefersReducedMotion) {
    return <span className={className}>{texts[0]}</span>;
  }

  return (
    <span className={`inline-flex relative overflow-hidden align-baseline ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={texts[index]}
          initial={{ y: '65%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-65%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.7 }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
