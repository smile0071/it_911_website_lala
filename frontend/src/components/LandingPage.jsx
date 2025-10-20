import React from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Advantages from './Advantages';
import Testimonials from './Testimonials';
import Game from './Game';
import ContactForm from './ContactForm';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <About />
      <Services />
      <Advantages />
      <Testimonials />
      <Game />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;