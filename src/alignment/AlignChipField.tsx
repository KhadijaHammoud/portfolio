import { useLayoutEffect, type ElementType, type ReactNode } from 'react';
import { useAlignment } from '../contexts';
import { cn } from '../utils';
import { AlignChipFieldProvider } from './AlignChipFieldProvider';

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
    <AlignChipFieldProvider id={id}>
      <Tag className={cn(className, isGameEnabled && 'align-chip-field')}>
        {children}
      </Tag>
    </AlignChipFieldProvider>
  );
};

export default AlignChipField;
