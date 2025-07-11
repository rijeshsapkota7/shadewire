import React from 'react';
import AnimatedElement from './AnimatedElement'; 
function SecurityCompliance() {
  const complianceItems = [
    'AES-256 Encryption',
    'SOC 2 Type 2 Readiness',
    'GDPR Compliance',
    'HIPAA Conformity',
    'Data Minimization Principles',
    'Regular Security Audits',
    'Role-Based Access Control',
    'Immutable Audit Logs',
  ];

  return ( 
    <section className="security-compliance-section">
      <AnimatedElement animation="fade-up">
        <h2 className="section-title">SECURITY & COMPLIANCE</h2>
      </AnimatedElement>
      <AnimatedElement animation="fade-in" delay={100}>
        <div className="security-card-container">
          <ul>
            {complianceItems.map((item, index) => (
              <li key={index}><span className="bullet-red"></span> {item}</li>
            ))}
          </ul>
        </div>
      </AnimatedElement>
    </section>
  );
}

export default SecurityCompliance;