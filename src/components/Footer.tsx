import { useEffect, useState } from 'react';
import { footer } from '../data/profile';

export function Footer() {
  // Pre-rendered with the build year, then updated in the browser (no hydration mismatch).
  const [year, setYear] = useState<number>(footer.year);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer mono">
      <span>
        © <span id="year">{year}</span> {footer.owner}
      </span>
      <span>{footer.note}</span>
      <a href="#top">{footer.backToTop}</a>
    </footer>
  );
}
