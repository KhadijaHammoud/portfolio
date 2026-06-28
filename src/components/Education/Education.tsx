import Section from '../Section';
import { EDUCATION } from './education.const';
import EducationCard from './EducationCard';

const Education = () => {
  return (
    <Section
      eyebrow='Education'
      title={
        <>
          Academic background<span className='text-accent'>.</span>
        </>
      }
      id='education'
    >
      <div className='grid gap-5 md:grid-cols-2'>
        {EDUCATION.map((e, i) => (
          <EducationCard key={e.school} index={i} school={e} />
        ))}
      </div>
    </Section>
  );
};

export default Education;
