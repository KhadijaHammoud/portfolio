import { ENGAGEMENT_CORE } from '../../constants';
import { Skill } from '../../types';

export const OPEN_SOURCE = {
  company: ENGAGEMENT_CORE.skiff.company,
  badges: ENGAGEMENT_CORE.skiff.badges,
  impacts: ENGAGEMENT_CORE.skiff.impacts,
  period: `${ENGAGEMENT_CORE.skiff.start} - ${ENGAGEMENT_CORE.skiff.end}`,
  name: 'Skiff UI',
  role: 'Lead Contributor',
  summary:
    'Led the engineering revamp that prepared Skiff UI, a React component library, for open-sourcing, turning an internal component library into a polished, public project adopted by the community. Built during my work on the [Skiff](#work-skiff) productivity suite.',
  highlights: [
    'Led engineering on the open-source release of Skiff UI.',
    'Built missing components alongside design to round out the library ahead of release.',
    'Reshaped core components around cleaner APIs and a more intentional developer experience.',
    'Prepared the codebase for the public by cutting internal-only complexity from the library.',
    'Collaborated with design to turn the Skiff UI system into a cohesive, production-ready component set.',
  ],
  stack: [Skill.React, Skill.TypeScript, Skill.StyledComponents],
  stars: '420+',
  url: 'https://github.com/skiff-org/skiff-ui',
};
