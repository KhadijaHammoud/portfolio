interface HeroStatProps {
  label: string;
  value: string;
}

const HeroStat = ({ label, value }: HeroStatProps) => (
  <div className='flex-1 bg-bg-soft/70 px-5 py-6'>
    <div className='font-mono text-2xl font-semibold text-ink md:text-3xl'>
      {value}
    </div>
    <div className='mt-1 text-sm text-ink-muted'>{label}</div>
  </div>
);

export default HeroStat;
