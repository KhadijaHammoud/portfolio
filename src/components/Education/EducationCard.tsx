import { GraduationCap } from 'lucide-react';
import { AlignableCard } from '../../alignment';
import { EDUCATION } from '../../constants';
import { useSettleMotion } from '../../motion/settle.util';

type EducationCardProps = {
  index: number;
  school: (typeof EDUCATION)[number];
};

const EducationCard = ({ index, school }: EducationCardProps) => {
  const settle = useSettleMotion(index * 0.08);

  return (
    <AlignableCard
      id={`edu-${school.school}`}
      index={index}
      settle={settle}
      className='p-6 md:p-8'
    >
      <div className='flex items-center gap-3'>
        <span className='grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-soft'>
          <GraduationCap className='h-5 w-5' />
        </span>
        <div>
          <h3 className='text-base font-semibold text-ink'>{school.school}</h3>
          <div className='text-sm text-ink-muted'>{school.period}</div>
        </div>
      </div>
      <div className='mt-5 text-base text-ink'>{school.degree}</div>
      <p className='mt-2 text-base leading-relaxed text-ink-muted'>
        {school.note}
      </p>
    </AlignableCard>
  );
};

export default EducationCard;
