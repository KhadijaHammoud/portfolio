import { useEffect, useState } from 'react';

/** Match Tailwind `md` — 768px. */
const MD_MEDIA_QUERY = '(min-width: 768px)';

export function useMinMd() {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MD_MEDIA_QUERY).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MD_MEDIA_QUERY);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return matches;
}
