import React from 'react';
import { About } from './components/About';
import { BackgroundBubbles } from './components/BackgroundBubbles';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Skills } from './components/Skills';

const App: React.FC = () => {
  return (
    <div className='relative isolate min-h-screen text-ink'>
      <BackgroundBubbles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
