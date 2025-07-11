import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechStack from './components/TechStack';
import WhoWeServe from './components/WhoWeServe';
import MarketStrategy from './components/MarketStrategy';
import SecurityCompliance from './components/SecurityCompliance';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';


function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for navbar background change
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Toggle body scroll when mobile menu is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMobileMenuOpen]);

  // Function to handle smooth scrolling to sections
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Features />
        <TechStack />
        <WhoWeServe />
        <MarketStrategy />
        <SecurityCompliance />
        <Contact scrollToSection={scrollToSection} />
      </main>
      <Footer scrollToSection={scrollToSection} />
      <GoToTopButton />
    </div>
  );
}

export default App;