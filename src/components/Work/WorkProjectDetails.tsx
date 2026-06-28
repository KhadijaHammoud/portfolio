import { WorkProject as WorkProjectType } from '../../types';
import { LinkedText } from '../shared';
import WorkCollapsiblePanel from './WorkCollapsiblePanel';
import WorkHighlightList from './WorkHighlightList';
import WorkScreenshotsSection from './WorkScreenshotsSection';

type WorkProjectDetailsProps = {
  project: WorkProjectType;
  projectIndex: number;
};

const WorkProjectDetails = ({
  project,
  projectIndex,
}: WorkProjectDetailsProps) => {
  const apps = project.apps;

  if (apps?.length) {
    return (
      <div className='mt-8 space-y-2'>
        {apps.map((app, i) => {
          const panelId = `work-${project.slug}-app-${i}`;
          const hasShots = (app.shots?.length ?? 0) > 0;

          return (
            <WorkCollapsiblePanel
              key={app.title}
              id={panelId}
              title={`${app.title} contributions`}
              description={app.scope}
            >
              {app.summary && (
                <p className='text-base leading-relaxed text-ink-muted'>
                  <LinkedText>{app.summary}</LinkedText>
                </p>
              )}
              <WorkHighlightList
                items={app.highlights}
                className={app.summary ? 'mt-4' : undefined}
              />
              {hasShots && (
                <WorkScreenshotsSection
                  index={i}
                  shots={app.shots!}
                  viewerTitle={`${project.company}: ${app.title}`}
                  className='mt-6 border-t border-line/5 pt-6'
                />
              )}
            </WorkCollapsiblePanel>
          );
        })}
      </div>
    );
  }

  const highlights = project.highlights ?? [];
  const shots = project.shots ?? [];
  const hasHighlights = highlights.length > 0;
  const hasShots = shots.length > 0;

  if (!hasHighlights && !hasShots) {
    return null;
  }

  return (
    <div className='mt-8'>
      <WorkCollapsiblePanel
        id={`work-${project.slug}-details`}
        title='Contributions'
      >
        {hasHighlights && <WorkHighlightList items={highlights} />}
        {hasShots && (
          <WorkScreenshotsSection
            index={projectIndex}
            shots={shots}
            viewerTitle={project.company}
            className={
              hasHighlights ? 'mt-6 border-t border-line/5 pt-6' : undefined
            }
          />
        )}
      </WorkCollapsiblePanel>
    </div>
  );
};

export default WorkProjectDetails;
