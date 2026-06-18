import type { ElementType } from 'react';
import { useAlignable } from './useAlignable';

type SkillChipProps = {
  id: string;
  index: number;
  label: string;
  as?: 'li' | 'span';
};

const SkillChip = ({ as = 'span', id, index, label }: SkillChipProps) => {
  const { alignProps } = useAlignable({
    id,
    index,
    variant: 'chip',
  });
  const Tag = as as ElementType;

  return <Tag {...alignProps}>{label}</Tag>;
};

export default SkillChip;
