import { motion } from 'framer-motion';
import {
  AlignHorizontalJustifyCenter,
  BrushCleaning,
  ScanSearch,
  X,
} from 'lucide-react';
import {
  ButtonGroup,
  ButtonSize,
  ButtonVariant,
  IconButton,
  TextButton,
  TooltipPlacement,
} from '../../components/shared';
import { cn } from '../../utils';
import { FIND_CROOKED_LABEL } from './alignHud.const';

type AlignHudHintCardProps = {
  canSweep: boolean;
  onDismiss: () => void;
  onFindCrooked: () => void;
  onSweep: () => void;
  progress: number;
  progressLabel: string;
  reduceMotion: boolean | null;
  remaining: number;
  sweeping: boolean;
};

const AlignHudHintCard = ({
  canSweep,
  onDismiss,
  onFindCrooked,
  onSweep,
  progress,
  progressLabel,
  reduceMotion,
  remaining,
  sweeping,
}: AlignHudHintCardProps) => (
  <motion.div
    key='hint'
    initial={reduceMotion ? false : { opacity: 0, y: 16, x: -12 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className='pointer-events-auto w-full max-w-md rounded-2xl border border-line/10 bg-bg/95 p-4 shadow-card backdrop-blur-md'
  >
    <div className='flex items-start gap-3'>
      <span className='mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent'>
        <AlignHorizontalJustifyCenter className='h-4 w-4' aria-hidden />
      </span>
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-semibold text-ink'>
          Something's crooked on purpose.
        </p>
        <p className='mt-1 text-sm leading-relaxed text-ink-muted'>
          Drag cards into place and hover skill chips to straighten them.
        </p>
        <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-line/10'>
          <motion.div
            className='h-full rounded-full bg-accent'
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
        <p className='mt-2 font-mono text-xs text-ink-faint'>{progressLabel}</p>
        <ButtonGroup className='mt-3' equalWidth={canSweep}>
          <TextButton
            className={canSweep ? 'w-full' : undefined}
            icon={<ScanSearch aria-hidden />}
            onClick={onFindCrooked}
            size={ButtonSize.SM}
            variant={ButtonVariant.GHOST}
          >
            {FIND_CROOKED_LABEL}
          </TextButton>
          {canSweep && (
            <TextButton
              className='w-full'
              disabled={sweeping}
              icon={
                <BrushCleaning
                  aria-hidden
                  className={cn('text-accent', sweeping && 'broom-sweeping')}
                />
              }
              onClick={onSweep}
              size={ButtonSize.SM}
              variant={ButtonVariant.ACCENT}
            >
              <span className='truncate'>Sweep all</span>
              <span className='shrink-0 font-mono text-xs text-ink-muted'>
                ({remaining})
              </span>
            </TextButton>
          )}
        </ButtonGroup>
      </div>
      <IconButton
        className='shrink-0'
        icon={<X aria-hidden />}
        label='Minimize'
        onClick={onDismiss}
        size={ButtonSize.SM}
        tooltipPlacement={TooltipPlacement.TOP}
      />
    </div>
  </motion.div>
);

export default AlignHudHintCard;
