import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IconButton } from '../../../components/shared';
import {
  CORNER_COMPLETE_HEADLINE,
  CORNER_COMPLETE_HINT,
  CORNER_COMPLETE_MESSAGE_MS,
} from './alignHud.const';

type AlignHudCornerDotProps = {
  reduceMotion: boolean | null;
  onActivate: () => void;
};

const AlignHudCornerDot = ({
  reduceMotion,
  onActivate,
}: AlignHudCornerDotProps) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setShowMessage(false);
      return;
    }

    const timer = window.setTimeout(
      () => setShowMessage(false),
      CORNER_COMPLETE_MESSAGE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className='pointer-events-none fixed bottom-5 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-end gap-2 md:bottom-6 md:right-6'
    >
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className='pointer-events-none max-w-[16rem] rounded-2xl border border-line/10 bg-bg/95 px-3.5 py-2.5 shadow-card backdrop-blur-md sm:max-w-[18rem]'
          >
            <p className='text-sm font-medium text-ink'>
              {CORNER_COMPLETE_HEADLINE}
            </p>
            <p className='mt-1 text-sm leading-relaxed text-ink-muted'>
              {CORNER_COMPLETE_HINT}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <IconButton
        icon={<RotateCcw className='text-accent' aria-hidden />}
        label='Scramble again'
        className='pointer-events-auto text-accent shadow-card backdrop-blur-md transition-colors'
        onClick={onActivate}
      />
    </motion.div>
  );
};

export default AlignHudCornerDot;
