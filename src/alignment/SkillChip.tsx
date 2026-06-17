import type { ElementType } from 'react';
import { useAlignable } from './useAlignable';

type SkillChipProps = {
  id: string;
  label: string;
  index: number;
  as?: 'li' | 'span';
};

const SkillChip = ({ id, label, index, as = 'span' }: SkillChipProps) => {
  const { alignProps } = useAlignable({
    id,
    index,
    variant: 'chip',
  });
  const Tag = as as ElementType;

  return <Tag {...alignProps}>{label}</Tag>;
};

export default SkillChip;
