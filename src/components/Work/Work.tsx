import { FEATURED_WORK } from './work.const';
import Section from '../Section';
import WorkProject from './WorkProject';

const Work = () => {
  return (
    <Section
      eyebrow='Work'
      title={
        <>
          Products I've helped ship<span className='text-accent'>.</span>
        </>
      }
      description='Scope, impact, and stack for each product.'
      id='work'
      uncontainedBody
    >
      <div className='space-y-16 md:space-y-24'>
        {FEATURED_WORK.map((project, i) => (
          <WorkProject key={project.slug} index={i} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Work;
