import { useReducedMotion } from 'framer-motion';
import { AlignableCard, AlignChipField, SkillChip } from '../../alignment';
import { getSettleMotion } from '../../motion/settle.util';
import { WorkProject as WorkProjectType } from '../../types';
import { EngagementBadges, ImpactTags, LinkedText } from '../shared';
import WorkProjectDetails from './WorkProjectDetails';

type WorkProjectProps = {
  index: number;
  project: WorkProjectType;
};

const WorkProject = ({ index, project }: WorkProjectProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <div id={`work-${project.slug}`} className='scroll-mt-28'>
      <div className='container-page'>
        <AlignableCard
          id={`work-${project.slug}`}
          index={index}
          as='article'
          settle={getSettleMotion(reduceMotion, index * 0.05)}
          className='p-6 md:p-10'
        >
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-muted'>
            <span className='font-medium text-ink'>{project.company}</span>
            <EngagementBadges badges={project.badges} />
            <ImpactTags tags={project.impacts} />
            <span aria-hidden>·</span>
            <span>{project.period}</span>
          </div>
          <h3 className='mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl'>
            {project.title}
          </h3>
          <p className='mt-1 text-base text-ink-muted'>{project.scope}</p>
          <p className='mt-4 text-base leading-relaxed text-ink-muted'>
            <LinkedText>{project.summary}</LinkedText>
          </p>

          <WorkProjectDetails project={project} projectIndex={index} />

          {project.stack && project.stack.length > 0 && (
            <AlignChipField
              id={`work-${project.slug}-chips`}
              className='mt-5 flex flex-wrap gap-2'
            >
              {project.stack.map((s, chipIdx) => (
                <SkillChip
                  key={s}
                  id={`work-${project.slug}-chip-${s}`}
                  label={s}
                  index={chipIdx + index * 4}
                />
              ))}
            </AlignChipField>
          )}
        </AlignableCard>
      </div>
    </div>
  );
};

export default WorkProject;
