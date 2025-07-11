import React  from 'react'; // Removed useEffect, useCallback
import AnimatedElement from './AnimatedElement';
// Removed import * as THREE from 'three';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <AnimatedElement animation="fade-up">
          <h2 className="section-title">GET IN TOUCH</h2>
        </AnimatedElement>
        <AnimatedElement animation="fade-up" delay={200}>
          <p>Ready to bridge the gap between intelligence and truth?</p>
        </AnimatedElement>
        <AnimatedElement animation="fade-in" delay={400}>
          <button
            className="red-btn email-btn circuit-pulse-btn"
            aria-label="Email Shadewire"
          >
            <span>request@shadewire.ai</span>
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default Contact;
