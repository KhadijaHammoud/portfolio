import Section from '../Section';
import SkillGroupCard from './SkillGroupCard';
import { SKILLS } from './skills.const';

const Skills = () => {
  return (
    <Section
      eyebrow='Skills'
      title={
        <>
          Tools I reach for<span className='text-accent'>.</span>
        </>
      }
      description='A snapshot of the stack I use day-to-day.'
      id='skills'
    >
      <div className='grid gap-5 md:grid-cols-3'>
        {SKILLS.map((group, idx) => (
          <SkillGroupCard key={group.group} group={group} index={idx} />
        ))}
      </div>
    </Section>
  );
};

export default Skills;
