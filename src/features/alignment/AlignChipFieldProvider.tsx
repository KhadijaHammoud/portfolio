import type { ReactNode } from 'react';
import { AlignChipFieldContext } from './AlignChipFieldContext';

type AlignChipFieldProviderProps = {
  children: ReactNode;
  id: string;
};

export const AlignChipFieldProvider = ({
  children,
  id,
}: AlignChipFieldProviderProps) => (
  <AlignChipFieldContext.Provider value={id}>
    {children}
  </AlignChipFieldContext.Provider>
);
