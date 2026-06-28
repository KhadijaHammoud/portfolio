import { AlignableCard, AlignChipField, SkillChip } from '../../alignment';
import { useSettleMotion } from '../../motion';
import { SKILLS } from './skills.const';

type SkillGroupCardProps = {
  group: (typeof SKILLS)[number];
  index: number;
};

const SkillGroupCard = ({ group, index }: SkillGroupCardProps) => {
  const settle = useSettleMotion(index * 0.08);

  return (
    <AlignableCard
      id={`skills-card-${group.group}`}
      index={index}
      className='p-6'
      settle={settle}
    >
      <div className='flex items-center gap-3'>
        <span className='grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-sm font-semibold text-accent-soft'>
          {index + 1}
        </span>
        <h3 className='text-base font-semibold text-ink'>{group.group}</h3>
      </div>
      <AlignChipField
        as='ul'
        id={`skills-chips-${group.group}`}
        className='mt-5 flex flex-wrap gap-2'
      >
        {group.items.map((item, itemIdx) => (
          <SkillChip
            key={item}
            id={`skills-chip-${group.group}-${item}`}
            index={itemIdx + index * 3}
            label={item}
            as='li'
          />
        ))}
      </AlignChipField>
    </AlignableCard>
  );
};

export default SkillGroupCard;
