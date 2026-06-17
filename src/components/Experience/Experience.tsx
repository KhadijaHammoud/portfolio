import { useReducedMotion } from 'framer-motion';
import { EXPERIENCES } from '../../constants';
import Section from '../Section';
import ExperienceItem from './ExperienceItem';

const Experience = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      eyebrow='Experience'
      title={
        <>
          Places I've helped build<span className='text-accent'>.</span>
        </>
      }
      description='Roles and timelines.'
      id='experience'
    >
      <ol className='experience-timeline relative space-y-10'>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceItem
            key={exp.company + exp.start}
            exp={exp}
            index={i}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
