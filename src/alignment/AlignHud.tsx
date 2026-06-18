import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useAlignment } from './AlignmentContext';
import {
  AlignHudCompactComplete,
  AlignHudCompactProgress,
  AlignHudHintCard,
  formatAlignProgress,
} from './AlignHudPanels';
import { scrollToFirstCrooked } from './scrollToFirstCrooked';

const SWEEP_MS = 650;

const AlignHud = () => {
  const reduceMotion = useReducedMotion();
  const {
    isGameEnabled,
    total,
    alignedCount,
    cardTotal,
    cardAligned,
    chipGroupTotal,
    chipGroupAligned,
    isComplete,
    hintDismissed,
    dismissHint,
    showHint,
    resetGame,
    alignAll,
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
        reduceMotion={reduceMotion}
        progress={progress}
        progressLabel={progressLabel}
        remaining={remaining}
        canSweep={canSweep}
        sweeping={sweeping}
        onFindCrooked={scrollToFirstCrooked}
        onSweep={sweep}
        onDismiss={dismissHint}
      />
    );
  } else if (isComplete) {
    hudPanel = (
      <AlignHudCompactComplete
        reduceMotion={reduceMotion}
        onScrambleAgain={scrambleAgain}
      />
    );
  } else {
    hudPanel = (
      <AlignHudCompactProgress
        reduceMotion={reduceMotion}
        remaining={remaining}
        progress={progress}
        canSweep={canSweep}
        sweeping={sweeping}
        onShowHint={showHint}
        onFindCrooked={scrollToFirstCrooked}
        onSweep={sweep}
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
