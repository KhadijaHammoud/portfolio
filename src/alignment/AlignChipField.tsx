import {
  createContext,
  useContext,
  useLayoutEffect,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '../utils';
import { useAlignment } from './AlignmentContext';

const AlignChipFieldContext = createContext<string | null>(null);

export function useAlignChipFieldId() {
  return useContext(AlignChipFieldContext);
}

type AlignChipFieldProps = {
  children: ReactNode;
  id: string;
  as?: 'div' | 'ul';
  className?: string;
};

const AlignChipField = ({
  children,
  id,
  as = 'div',
  className = '',
}: AlignChipFieldProps) => {
  const { isGameEnabled, registerChipGroup, unregisterChipGroup } =
    useAlignment();
  const Tag = as as ElementType;

  useLayoutEffect(() => {
    if (!isGameEnabled) return;
    registerChipGroup(id);
    return () => unregisterChipGroup(id);
  }, [id, isGameEnabled, registerChipGroup, unregisterChipGroup]);

  return (
    <AlignChipFieldContext.Provider value={id}>
      <Tag className={cn(className, isGameEnabled && 'align-chip-field')}>
        {children}
      </Tag>
    </AlignChipFieldContext.Provider>
  );
};

export default AlignChipField;
