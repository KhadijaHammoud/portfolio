import { createContext, useContext } from 'react';

type AlignmentContextValue = {
  alignedCount: number;
  cardAligned: number;
  cardTotal: number;
  celebrationEpoch: number;
  chipGroupAligned: number;
  chipGroupTotal: number;
  gameEpoch: number;
  hintDismissed: boolean;
  isComplete: boolean;
  isGameEnabled: boolean;
  total: number;
  align: (id: string) => void;
  alignAll: () => void;
  dismissHint: () => void;
  isAligned: (id: string) => boolean;
  registerCard: (id: string) => void;
  registerChip: (groupId: string, chipId: string) => void;
  registerChipGroup: (id: string) => void;
  resetGame: () => void;
  showHint: () => void;
  unregisterCard: (id: string) => void;
  unregisterChip: (groupId: string, chipId: string) => void;
  unregisterChipGroup: (id: string) => void;
};

export const AlignmentContext = createContext<AlignmentContextValue | null>(
  null,
);

export function useAlignment() {
  const ctx = useContext(AlignmentContext);
  if (!ctx) {
    throw new Error('useAlignment must be used within AlignmentProvider');
  }
  return ctx;
}
