/**
 * Home Page
 * Main landing page with all sections
 */

import { Hero, Services, About, Projects, Testimonials, Contact } from '../components/sections';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
