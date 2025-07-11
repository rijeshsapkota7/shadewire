import React from 'react';
import AnimatedElement from './AnimatedElement'; // Assuming this component provides scroll-based animations

function WhoWeServe() {
  const serveItems = [
    {
      type: 'ciocros', // Identifier for CSS styling
      title: 'CIOs & CTOs',
      description: 'Enabling secure AI adoption and integration within complex enterprise environments.',
    },
    {
      type: 'datascientists', // Identifier for CSS styling
      title: 'Data Scientists',
      description: 'Providing the infrastructure to deploy and manage advanced AI models with ease.',
    },
    {
      type: 'securityteams', // Identifier for CSS styling
      title: 'Security Teams',
      description: 'Delivering uncompromised data security and compliance for critical operations.',
    },
  ];

  const handleRequestDemoClick = (e) => {
    e.preventDefault();
    alert('Request a Demo functionality would lead to a contact form or scheduling tool.');
  };

  return (
    <section className="who-we-serve-section">
      <AnimatedElement animation="fade-up">
        <h2 className="section-title">WHO WE SERVE</h2>
      </AnimatedElement>
      <div className="serve-grid">
        {serveItems.map((item, index) => (
          <AnimatedElement key={item.title} animation="fade-up" delay={100 * (index + 1)}>
            <div className="serve-card">
              <div className={`icon-container icon-${item.type}`}>
                {/* Dynamic rendering of abstract SVG-like elements based on type */}
                {item.type === 'ciocros' && (
                  <>
                    <div className="icon-line icon-line-horizontal-1"></div>
                    <div className="icon-line icon-line-horizontal-2"></div>
                    <div className="icon-line icon-line-vertical-1"></div>
                    <div className="icon-line icon-line-vertical-2"></div>
                    <div className="icon-central-node"></div>
                    <div className="icon-floating-dot icon-dot-top"></div>
                    <div className="icon-floating-dot icon-dot-bottom"></div>
                  </>
                )}
                {item.type === 'datascientists' && (
                  <>
                    <div className="icon-bar icon-bar-1"></div>
                    <div className="icon-bar icon-bar-2"></div>
                    <div className="icon-bar icon-bar-3"></div>
                    <div className="icon-bar icon-bar-4"></div>
                    <div className="icon-bar icon-bar-5"></div>
                    <div className="icon-trend-line"></div>
                    <div className="icon-particle icon-particle-1"></div>
                    <div className="icon-particle icon-particle-2"></div>
                    <div className="icon-particle icon-particle-3"></div>
                    <div className="icon-particle icon-particle-4"></div>
                  </>
                )}
                {item.type === 'securityteams' && (
                  <>
                    <div className="icon-shield-outline"></div>
                    <div className="icon-lock-center"></div>
                    <div className="icon-scan-beam"></div>
                    <div className="icon-glow-ring"></div>
                  </>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
      <AnimatedElement animation="fade-in" delay={400}>
        <div className="request-demo-container">
          <button
            className="red-btn"
            onClick={handleRequestDemoClick}
            aria-label="Request a Demo"
          >
            REQUEST A DEMO
          </button>
        </div>
      </AnimatedElement>
    </section>
  );
}

export default WhoWeServe;