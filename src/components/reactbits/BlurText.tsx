import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stepDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function BlurText({
  text,
  className = '',
  style,
  delay = 0,
  stepDelay = 0.045,
  as = 'p',
}: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.45,
            delay: delay + idx * stepDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {word}
          {idx < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
