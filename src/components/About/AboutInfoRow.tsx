interface AboutInfoRowProps {
  label: string;
  value: string;
}

const AboutInfoRow = ({ label, value }: AboutInfoRowProps) => (
  <div>
    <div className='text-xs uppercase tracking-wider text-ink-muted'>
      {label}
    </div>
    <div className='mt-1 text-base text-ink'>{value}</div>
  </div>
);

export default AboutInfoRow;
