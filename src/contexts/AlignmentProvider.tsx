import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useMinMd } from '../hooks';
import { AlignmentContext } from './AlignmentContext';

function countAlignedChipGroups(
  chipGroups: Map<string, Set<string>>,
  aligned: Set<string>,
): number {
  let count = 0;
  for (const chips of Array.from(chipGroups.values())) {
    if (
      chips.size > 0 &&
      Array.from(chips).every((chipId) => aligned.has(chipId))
    ) {
      count += 1;
    }
  }
  return count;
}

export const AlignmentProvider = ({ children }: { children: ReactNode }) => {
  const isGameEnabled = useMinMd();
  const [registeredCards, setRegisteredCards] = useState<Set<string>>(
    () => new Set(),
  );
  const [chipGroups, setChipGroups] = useState<Map<string, Set<string>>>(
    () => new Map(),
  );
  const [aligned, setAligned] = useState<Set<string>>(() => new Set());
  const [gameEpoch, setGameEpoch] = useState(0);
  const [celebrationEpoch, setCelebrationEpoch] = useState(0);
  const [hintDismissed, setHintDismissed] = useState(false);
  const registeredCardsRef = useRef(registeredCards);
  const chipGroupsRef = useRef(chipGroups);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    registeredCardsRef.current = registeredCards;
  }, [registeredCards]);

  useEffect(() => {
    chipGroupsRef.current = chipGroups;
  }, [chipGroups]);

  const registerCard = useCallback((id: string) => {
    setRegisteredCards((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const unregisterCard = useCallback((id: string) => {
    setRegisteredCards((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setAligned((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const registerChipGroup = useCallback((id: string) => {
    setChipGroups((prev) => {
      if (prev.has(id)) return prev;
      const next = new Map(prev);
      next.set(id, new Set());
      return next;
    });
  }, []);

  const unregisterChipGroup = useCallback((id: string) => {
    setChipGroups((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const registerChip = useCallback((groupId: string, chipId: string) => {
    setChipGroups((prev) => {
      const chips = prev.get(groupId);
      if (chips?.has(chipId)) return prev;
      const next = new Map(prev);
      const nextChips = new Set(chips ?? []);
      nextChips.add(chipId);
      next.set(groupId, nextChips);
      return next;
    });
  }, []);

  const unregisterChip = useCallback((groupId: string, chipId: string) => {
    setChipGroups((prev) => {
      const chips = prev.get(groupId);
      if (!chips || !chips.has(chipId)) return prev;
      const next = new Map(prev);
      const nextChips = new Set(chips);
      nextChips.delete(chipId);
      next.set(groupId, nextChips);
      return next;
    });
    setAligned((prev) => {
      if (!prev.has(chipId)) return prev;
      const next = new Set(prev);
      next.delete(chipId);
      return next;
    });
  }, []);

  const align = useCallback((id: string) => {
    setAligned((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const alignAll = useCallback(() => {
    const cards = registeredCardsRef.current;
    const groups = chipGroupsRef.current;
    const chipIds = Array.from(groups.values()).flatMap((chips) =>
      Array.from(chips),
    );
    const ids = [...Array.from(cards), ...chipIds];
    if (ids.length === 0) return;

    setAligned((prev) => {
      if (ids.every((id) => prev.has(id))) return prev;
      return new Set(ids);
    });
  }, []);

  const isAligned = useCallback((id: string) => aligned.has(id), [aligned]);

  const dismissHint = useCallback(() => {
    setHintDismissed(true);
  }, []);

  const showHint = useCallback(() => {
    setHintDismissed(false);
  }, []);

  const resetGame = useCallback(() => {
    setAligned(new Set());
    setGameEpoch((epoch) => epoch + 1);
    setHintDismissed(true);
  }, []);

  const cardTotal = registeredCards.size;
  const chipGroupTotal = chipGroups.size;
  const cardAligned = Array.from(registeredCards).filter((id) =>
    aligned.has(id),
  ).length;
  const chipGroupAligned = countAlignedChipGroups(chipGroups, aligned);
  const total = cardTotal + chipGroupTotal;
  const alignedCount = cardAligned + chipGroupAligned;
  const isComplete = total > 0 && alignedCount === total;

  useEffect(() => {
    if (!isGameEnabled) {
      wasCompleteRef.current = false;
      return;
    }

    const justCompleted = isComplete && !wasCompleteRef.current;
    wasCompleteRef.current = isComplete;

    if (justCompleted) {
      setCelebrationEpoch((epoch) => epoch + 1);
    }
  }, [isComplete, isGameEnabled]);

  useEffect(() => {
    if (!isGameEnabled) return;
    document.documentElement.classList.add('align-game-active');
    return () => document.documentElement.classList.remove('align-game-active');
  }, [isGameEnabled]);

  const value = useMemo(
    () => ({
      alignedCount,
      cardAligned,
      cardTotal,
      celebrationEpoch,
      chipGroupAligned,
      chipGroupTotal,
      gameEpoch,
      hintDismissed,
      isComplete,
      isGameEnabled,
      total,
      align,
      alignAll,
      dismissHint,
      isAligned,
      registerCard,
      registerChip,
      registerChipGroup,
      resetGame,
      showHint,
      unregisterCard,
      unregisterChip,
      unregisterChipGroup,
    }),
    [
      alignedCount,
      cardAligned,
      cardTotal,
      celebrationEpoch,
      chipGroupAligned,
      chipGroupTotal,
      gameEpoch,
      hintDismissed,
      isComplete,
      isGameEnabled,
      total,
      align,
      alignAll,
      dismissHint,
      isAligned,
      registerCard,
      registerChip,
      registerChipGroup,
      resetGame,
      showHint,
      unregisterCard,
      unregisterChip,
      unregisterChipGroup,
    ],
  );

  return (
    <AlignmentContext.Provider value={value}>
      {children}
    </AlignmentContext.Provider>
  );
};
