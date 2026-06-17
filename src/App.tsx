import About from './components/About';
import BackgroundPawPrints from './components/BackgroundPawPrints';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Work from './components/Work';

const App = () => {
  return (
    <div className='relative min-h-screen text-ink'>
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
    </div>
  );
};

export default App;
