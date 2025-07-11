import React from 'react';
import AnimatedElement from './AnimatedElement'; 
function MarketStrategy() {
  const strategyItems = [
    {
      title: 'STRATEGIC DESIGN PARTNERS',
      description: 'Collaborating with leading enterprises to tailor AI solutions to their unique needs.',
    },
    {
      title: 'PRIVATE DEPLOYMENT ONLY',
      description: 'Ensuring maximum security and control with on-premise or private cloud deployments.',
    },
    {
      title: 'LICENSING + USAGE MODEL',
      description: 'Flexible pricing models designed to scale with your enterprise\'s growth and consumption.',
    },
    {
      title: 'LLM PLATFORM INTEGRATION',
      description: 'Seamlessly connecting with major Large Language Model platforms for enhanced capabilities.',
    },
  ];

  return (
    <section className="market-strategy-section">
      <AnimatedElement animation="fade-up">
        <h2 className="section-title">MARKET STRATEGY</h2>
      </AnimatedElement>
      <div className="strategy-list">
        {strategyItems.map((item, index) => (
          <AnimatedElement key={item.title} animation="fade-up" delay={100 * (index + 1)}>
            <div className="strategy-item">
              <span className="bullet"></span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}

export default MarketStrategy;