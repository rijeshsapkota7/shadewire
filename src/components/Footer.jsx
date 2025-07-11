import React from 'react';

function Footer({ scrollToSection }) {
  return (
    <footer className="footer">
      <div className="footer-primary">
        <div className="footer-logo-tagline">
          <div className="navbar-logo footer-logo">
            <a href="#home" onClick={() => scrollToSection('home')} aria-label="Shadewire Home">
              {/* Use the same SVG as the navbar, or a grayscale version if preferred */}
              <img src="/assets/shadwrireLogo.jpg" alt="Shadewire Logo" className="logo-image" />
            </a>
          </div>
          <p className="tagline">We build the bridges no one else can.</p>
        </div> 
        <div className="footer-links-contact">
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
              <li><a href="#careers" onClick={() => scrollToSection('careers')}>Careers</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#terms" onClick={() => scrollToSection('terms')}>Terms of Service</a></li>
              <li><a href="#privacy" onClick={() => scrollToSection('privacy')}>Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>General Inquiries:</p>
            <a href="mailto:info@shadewire.ai">info@shadewire.ai</a>
            <p>Request Access:</p>
            <a href="mailto:request@shadewire.ai">request@shadewire.ai</a>
          </div>
        </div>
      </div>
      <div className="footer-secondary">
        <p>&copy; 2025 Shadewire. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;