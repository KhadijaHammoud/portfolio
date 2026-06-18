import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useAlignment } from '../AlignmentContext';
import { formatAlignProgress } from './alignHud.util';
import AlignHudCompactComplete from './AlignHudCompactComplete';
import AlignHudCompactProgress from './AlignHudCompactProgress';
import AlignHudHintCard from './AlignHudHintCard';

const SWEEP_MS = 650;

/** Smooth-scroll to the first misaligned card or chip group on the page. */
function scrollToFirstCrooked() {
  const target = document.querySelector('[data-aligned="false"]');
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

const AlignHud = () => {
  const reduceMotion = useReducedMotion();
  const {
    alignAll,
    alignedCount,
    cardAligned,
    cardTotal,
    chipGroupAligned,
    chipGroupTotal,
    dismissHint,
    hintDismissed,
    isComplete,
    isGameEnabled,
    resetGame,
    showHint,
    total,
  } = useAlignment();
  const [sweeping, setSweeping] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [hideHud, setHideHud] = useState(false);

  const remaining = total - alignedCount;
  const canSweep = isGameEnabled && total > 0 && !isComplete;

  const sweep = useCallback(() => {
    if (sweeping || !canSweep) return;

    setSweeping(true);
    alignAll();
    document.documentElement.classList.add('align-sweep-active');
    window.setTimeout(() => {
      document.documentElement.classList.remove('align-sweep-active');
      setSweeping(false);
    }, SWEEP_MS);
  }, [alignAll, canSweep, sweeping]);

  const scrambleAgain = useCallback(() => {
    resetGame();
    scrollToFirstCrooked();
  }, [resetGame]);

  const progress = total > 0 ? alignedCount / total : 0;
  const progressLabel = formatAlignProgress(
    cardAligned,
    cardTotal,
    chipGroupAligned,
    chipGroupTotal,
  );
  const hintExpanded = !hintDismissed && total > 0 && !isComplete;

  useEffect(() => {
    if (!isComplete) {
      setCelebrated(false);
      setHideHud(false);
      return;
    }

    if (celebrated) return;
    setCelebrated(true);
    const timer = window.setTimeout(() => setHideHud(true), 4500);
    return () => window.clearTimeout(timer);
  }, [isComplete, celebrated]);

  if (!isGameEnabled || total === 0 || hideHud) return null;

  let hudPanel;
  if (hintExpanded) {
    hudPanel = (
      <AlignHudHintCard
        canSweep={canSweep}
        onDismiss={dismissHint}
        onFindCrooked={scrollToFirstCrooked}
        onSweep={sweep}
        progress={progress}
        progressLabel={progressLabel}
        reduceMotion={reduceMotion}
        remaining={remaining}
        sweeping={sweeping}
      />
    );
  } else if (isComplete) {
    hudPanel = (
      <AlignHudCompactComplete
        onScrambleAgain={scrambleAgain}
        reduceMotion={reduceMotion}
      />
    );
  } else {
    hudPanel = (
      <AlignHudCompactProgress
        canSweep={canSweep}
        onFindCrooked={scrollToFirstCrooked}
        onShowHint={showHint}
        onSweep={sweep}
        progress={progress}
        reduceMotion={reduceMotion}
        remaining={remaining}
        sweeping={sweeping}
      />
    );
  }

  return (
    <div className='pointer-events-none fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 md:bottom-6'>
      <AnimatePresence mode='wait'>{hudPanel}</AnimatePresence>
    </div>
  );
};

export default AlignHud;
