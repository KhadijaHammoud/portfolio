import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ViewerImage = {
  src: string;
  alt: string;
};

type ImageViewerProps = {
  images: readonly ViewerImage[];
  index: number;
  /** Accessible name for the dialog (e.g. company name). */
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  index,
  title,
  onIndexChange,
  onClose,
}) => {
  const reduceMotion = useReducedMotion();
  const count = images.length;
  const current = images[index];

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + count) % count);
  }, [count, index, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % count);
  }, [count, index, onIndexChange]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev, onClose]);

  if (!current) return null;

  const controlClass =
    'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/10 bg-bg/90 text-ink shadow-lg backdrop-blur-sm transition-colors hover:border-accent/50 disabled:pointer-events-none disabled:opacity-40';

  return createPortal(
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8'
      role='dialog'
      aria-modal='true'
      aria-label={`${title} screenshot viewer`}
    >
      <button
        type='button'
        className='absolute inset-0 bg-bg/85 backdrop-blur-md'
        aria-label='Close viewer'
        onClick={onClose}
      />

      <div className='relative z-10 flex w-full max-w-6xl flex-col gap-4'>
        <div className='flex items-start justify-between gap-4'>
          <p className='min-w-0 text-sm text-ink-muted'>
            {title}
            <span className='mt-1 block font-mono text-xs text-ink-faint'>
              {index + 1} of {count}
            </span>
          </p>
          <button
            type='button'
            onClick={onClose}
            className={controlClass}
            aria-label='Close'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='flex items-center justify-center gap-3 sm:gap-5'>
          <button
            type='button'
            onClick={goPrev}
            className={controlClass}
            aria-label='Previous image'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>

          <AnimatePresence mode='wait' initial={false}>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className='max-h-[min(78vh,900px)] w-auto max-w-full rounded-lg border border-line/10 bg-bg-card object-contain shadow-card'
              draggable={false}
            />
          </AnimatePresence>

          <button
            type='button'
            onClick={goNext}
            className={controlClass}
            aria-label='Next image'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ImageViewer;
