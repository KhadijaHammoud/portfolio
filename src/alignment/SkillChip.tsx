import type { ElementType } from 'react';
import { AlignableVariant, SkillChipTag } from '../types';
import { useAlignable } from './useAlignable';

type SkillChipProps = {
  id: string;
  index: number;
  label: string;
  as?: SkillChipTag;
};

const SkillChip = ({ id, index, label, as = SkillChipTag.SPAN }: SkillChipProps) => {
  const { alignProps } = useAlignable({
    id,
    index,
    variant: AlignableVariant.CHIP,
  });
  const Tag = as as ElementType;

  return <Tag {...alignProps}>{label}</Tag>;
};

export default SkillChip;
