import HeroStat from './HeroStat';

/** Full years since earliest role start — e.g. `"5+"` for hero stats. */
type HeroStatsGridProps = {
  yearsOfExperience: string;
};

const HeroStatsGrid = ({ yearsOfExperience }: HeroStatsGridProps) => (
  <div className='flex flex-col gap-px sm:flex-row'>
    <HeroStat label='Years of experience' value={yearsOfExperience} />
    <HeroStat label='Users at scale' value='2M+' />
    <HeroStat label='ARR from zero' value='$1M+' />
    <HeroStat label='Open-source stars' value='420+' />
  </div>
);

export default HeroStatsGrid;
