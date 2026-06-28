import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useAlignment } from '../../../contexts';
import { formatAlignProgress } from './alignHud.util';
import AlignHudCornerDot from './AlignHudCornerDot';
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
    alignedCount,
    cardAligned,
    cardTotal,
    chipGroupAligned,
    chipGroupTotal,
    hintDismissed,
    isComplete,
    isGameEnabled,
    total,
    alignAll,
    dismissHint,
    resetGame,
    showHint,
  } = useAlignment();
  const [sweeping, setSweeping] = useState(false);

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
    showHint();
    scrollToFirstCrooked();
  }, [resetGame, showHint]);

  const progress = total > 0 ? alignedCount / total : 0;
  const progressLabel = formatAlignProgress(
    cardAligned,
    cardTotal,
    chipGroupAligned,
    chipGroupTotal,
  );
  const hintExpanded = !hintDismissed && total > 0 && !isComplete;

  if (!isGameEnabled || total === 0) return null;

  if (isComplete) {
    return (
      <AlignHudCornerDot
        reduceMotion={reduceMotion}
        onActivate={scrambleAgain}
      />
    );
  }

  let hudPanel;
  if (hintExpanded) {
    hudPanel = (
      <AlignHudHintCard
        canSweep={canSweep}
        progress={progress}
        progressLabel={progressLabel}
        reduceMotion={reduceMotion}
        remaining={remaining}
        sweeping={sweeping}
        onDismiss={dismissHint}
        onFindCrooked={scrollToFirstCrooked}
        onSweep={sweep}
      />
    );
  } else {
    hudPanel = (
      <AlignHudCompactProgress
        canSweep={canSweep}
        progress={progress}
        reduceMotion={reduceMotion}
        remaining={remaining}
        sweeping={sweeping}
        onFindCrooked={scrollToFirstCrooked}
        onShowHint={showHint}
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
