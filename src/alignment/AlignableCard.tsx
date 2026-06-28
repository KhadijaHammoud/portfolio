import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { settleWithoutOffset } from '../motion';
import { useAlignment } from '../contexts';
import { cn } from '../utils';
import { AlignableCardTag, AlignableVariant } from '../types';
import AlignCardFrame from './AlignCardFrame';
import { useAlignable } from './useAlignable';

const MOTION_TAGS = {
  [AlignableCardTag.DIV]: motion.div,
  [AlignableCardTag.ARTICLE]: motion.article,
  [AlignableCardTag.ASIDE]: motion.aside,
} as const;

type AlignableCardProps = {
  children: ReactNode;
  id: string;
  index: number;
  as?: AlignableCardTag;
  className?: string;
  settle?: HTMLMotionProps<'div'>;
};

const AlignableCard = ({
  children,
  id,
  index,
  as = AlignableCardTag.DIV,
  className = '',
  settle,
}: AlignableCardProps) => {
  const { isGameEnabled } = useAlignment();
  const { alignProps, dragging } = useAlignable({
    id,
    index,
    variant: AlignableVariant.CARD,
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
