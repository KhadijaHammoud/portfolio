import { createContext, useContext } from 'react';

export const AlignChipFieldContext = createContext<string | null>(null);

export function useAlignChipFieldId() {
  return useContext(AlignChipFieldContext);
}
