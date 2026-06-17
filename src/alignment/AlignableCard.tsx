import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { settleWithoutOffset } from '../motion/settle';
import { cn } from '../utils';
import AlignCardFrame from './AlignCardFrame';
import { useAlignment } from './AlignmentContext';
import { useAlignable } from './useAlignable';

type MotionTag = 'div' | 'article' | 'aside';

const MOTION_TAGS = {
  div: motion.div,
  article: motion.article,
  aside: motion.aside,
} as const;

type AlignableCardProps = {
  id: string;
  index: number;
  className?: string;
  children: ReactNode;
  settle?: HTMLMotionProps<'div'>;
  as?: MotionTag;
};

const AlignableCard = ({
  id,
  index,
  className = '',
  children,
  settle,
  as = 'div',
}: AlignableCardProps) => {
  const { isGameEnabled } = useAlignment();
  const { alignProps, dragging } = useAlignable({
    id,
    index,
    variant: 'card',
  });
  const Motion = MOTION_TAGS[as];
  const resolvedSettle =
    settle && isGameEnabled ? settleWithoutOffset(settle) : settle;

  return (
    <Motion {...resolvedSettle} className='align-card-root relative'>
      <AlignCardFrame dragging={dragging}>
        <div {...alignProps} className={cn(alignProps.className)}>
          <div className={cn('card', className)}>{children}</div>
        </div>
      </AlignCardFrame>
    </Motion>
  );
};

export default AlignableCard;
