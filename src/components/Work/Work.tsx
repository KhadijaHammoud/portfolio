import { FEATURED_WORK } from './work.const';
import Section from '../Section';
import WorkProject from './WorkProject';

const Work = () => {
  return (
    <Section
      id='work'
      eyebrow='Work'
      title={
        <>
          Products I've helped ship<span className='text-accent'>.</span>
        </>
      }
      description='Scope, impact, and stack for each product.'
      uncontainedBody
    >
      <div className='space-y-16 md:space-y-24'>
        {FEATURED_WORK.map((project, i) => (
          <WorkProject key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Work;
