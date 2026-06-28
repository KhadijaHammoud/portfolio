import { Analytics } from '@vercel/analytics/react';
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  Hero,
  Navbar,
  OpenSource,
  Skills,
  Work,
} from './components';
import { AlignmentProvider } from './contexts';
import { AlignCelebration, AlignHud, BackgroundPawPrints } from './features';

const App = () => {
  return (
    <AlignmentProvider>
      <div className='relative min-h-screen text-ink'>
        <div
          aria-hidden
          className='page-paper pointer-events-none fixed inset-0 z-[1]'
        />
        <BackgroundPawPrints />
        <div className='relative z-10'>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Work />
            <OpenSource />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
        <AlignHud />
        <AlignCelebration />
        <Analytics />
      </div>
    </AlignmentProvider>
  );
};

export default App;
