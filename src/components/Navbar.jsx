function Navbar({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, scrollToSection }) {
  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRequestAccessClick = (e) => {
    e.preventDefault();
    alert('Request Access functionality would lead to a contact form or email trigger.');
    setIsMobileMenuOpen(false); // Close menu on button click
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <a href="#home" onClick={() => scrollToSection('home')} aria-label="Shadewire Home">
          {/* Using <img> tag to load external SVG */}
          <img src="/assets/Shadewire.svg" alt="Shadewire Logo" className="logo-image" />
        </a>
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#the-bridge" onClick={() => scrollToSection('the-bridge')}>Solutions</a></li>
          <li><a href="#team" onClick={() => scrollToSection('')}>Team</a></li>
          <li><a href="#tech-stack" onClick={() => scrollToSection('tech-stack')}>Tech</a></li>
          <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
        <button className="nav-request-access-btn" onClick={handleRequestAccessClick}>Request Access</button>
      </div>
      <div
        className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={handleToggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;