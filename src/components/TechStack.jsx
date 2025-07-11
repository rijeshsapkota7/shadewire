import React from 'react';
import AnimatedElement from './AnimatedElement';

function TechStack() {
  const techItems = [
    { name: 'GoLang', icon: 'Go' },
    { name: 'Rust', icon: 'Rust' },
    { name: 'Python', icon: 'Py' },
    { name: 'OpenAI', icon: 'AI' },
    { name: 'Claude', icon: 'Cl' },
    { name: 'Mistral', icon: 'Mi' },
    { name: 'Pgvector', icon: 'Pg' },
    { name: 'Qdrant', icon: 'Qd' },
    { name: 'Vault', icon: 'Vt' },
    { name: 'Docker', icon: 'Dc' },
    { name: 'Helm', icon: 'Hl' },
  ];

  return (
    <section id="tech-stack" className="tech-stack-section">
      <AnimatedElement animation="fade-up">
        <h2 className="section-title">OUR TECH STACK</h2>
      </AnimatedElement>
      <div className="tech-stack-slider horizontal-scroll-container">
        {techItems.map((tech, index) => (
          <AnimatedElement key={tech.name} animation="fade-in" delay={100 * (index + 1)}>
            <div className="tech-card">
              <div className="icon-white-placeholder">{tech.icon}</div>
              <p>{tech.name}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}

export default TechStack;