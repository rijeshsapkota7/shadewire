import React from 'react';
import AnimatedElement from './AnimatedElement';

function Features() {
  return (
    <section id="the-bridge" className="features-section">
      <AnimatedElement animation="fade-up">
        <h2 className="section-title">THE BRIDGE WE BUILD</h2>
      </AnimatedElement>
      <div className="features-grid">
        {/* Secure Data Bridge Card */}
        <AnimatedElement animation="fade-up" delay={100}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-secure-data-bridge">
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Lock Body */}
                  <rect x="25" y="40" width="50" height="45" rx="8" ry="8" className="sdb-lock-body" />
                  {/* Lock Shackle */}
                  <path d="M35 40 C35 25, 65 25, 65 40" className="sdb-lock-shackle" />
                  {/* Keyhole */}
                  <circle cx="50" cy="65" r="5" className="sdb-keyhole-circle" />
                  <rect x="48" y="68" width="4" height="10" className="sdb-keyhole-line" />
                  {/* Data Flow Lines */}
                  <path d="M10 20 L30 40 M70 40 L90 20" className="sdb-data-flow-line sdb-data-flow-line-1" />
                  <path d="M10 80 L30 60 M70 60 L90 80" className="sdb-data-flow-line sdb-data-flow-line-2" />
                </svg>
              </div>
            </div>
            <h3>SECURE DATA BRIDGE</h3>
            <p>Connect enterprise data in read-only mode, ensuring full control and compliance.</p>
          </div>
        </AnimatedElement>

        {/* Schema Mapper Card */}
        <AnimatedElement animation="fade-up" delay={200}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-schema-mapper">
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Left Data Block */}
                  <rect x="15" y="20" width="30" height="60" rx="5" ry="5" className="sm-data-block sm-data-block-left" />
                  <line x1="15" y1="35" x2="45" y2="35" className="sm-data-line" />
                  <line x1="15" y1="50" x2="45" y2="50" className="sm-data-line" />
                  <line x1="15" y1="65" x2="45" y2="65" className="sm-data-line" />
                  {/* Right Data Block */}
                  <rect x="55" y="20" width="30" height="60" rx="5" ry="5" className="sm-data-block sm-data-block-right" />
                  <line x1="55" y1="35" x2="85" y2="35" className="sm-data-line" />
                  <line x1="55" y1="50" x2="85" y2="50" className="sm-data-line" />
                  <line x1="55" y1="65" x2="85" y2="65" className="sm-data-line" />
                  {/* Mapping Arrows */}
                  <path d="M45 35 L55 35" className="sm-arrow-path sm-arrow-path-1" />
                  <polygon points="55,35 50,32 50,38" className="sm-arrow-head sm-arrow-head-1" />
                  <path d="M45 65 L55 65" className="sm-arrow-path sm-arrow-path-2" />
                  <polygon points="55,65 50,62 50,68" className="sm-arrow-head sm-arrow-head-2" />
                </svg>
              </div>
            </div>
            <h3>SCHEMA MAPPER</h3>
            <p>Intuitively map complex data structures to AI-ready formats, accelerating model development and accuracy.</p>
          </div>
        </AnimatedElement>

        {/* Embedding & Vectorization Card */}
        <AnimatedElement animation="fade-up" delay={300}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-embedding-vectorization">
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Central Sphere */}
                  <circle cx="50" cy="50" r="30" className="ev-central-sphere" />
                  {/* Vectors */}
                  <line x1="50" y1="50" x2="80" y2="20" className="ev-vector ev-vector-1" />
                  <line x1="50" y1="50" x2="20" y2="20" className="ev-vector ev-vector-2" />
                  <line x1="50" y1="50" x2="20" y2="80" className="ev-vector ev-vector-3" />
                  <line x1="50" y1="50" x2="80" y2="80" className="ev-vector ev-vector-4" />
                  {/* Data Points */}
                  <circle cx="70" cy="30" r="4" className="ev-data-point ev-data-point-1" />
                  <circle cx="30" cy="30" r="4" className="ev-data-point ev-data-point-2" />
                  <circle cx="30" cy="70" r="4" className="ev-data-point ev-data-point-3" />
                  <circle cx="70" cy="70" r="4" className="ev-data-point ev-data-point-4" />
                </svg>
              </div>
            </div>
            <h3>EMBEDDING & VECTORIZATION</h3>
            <p>Transform raw data into high-dimensional vectors, optimizing it for advanced AI processing and semantic search.</p>
          </div>
        </AnimatedElement>

        {/* Query Translator Card */}
        <AnimatedElement animation="fade-up" delay={400}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-query-translator">
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Speech Bubble / Input */}
                  <rect x="15" y="20" width="70" height="40" rx="8" ry="8" className="qt-input-box" />
                  <path d="M25 60 L35 75 L45 60 Z" className="qt-input-tail" />
                  {/* Output Database / Arrow */}
                  <rect x="25" y="70" width="50" height="20" rx="5" ry="5" className="qt-output-db" />
                  <line x1="50" y1="60" x2="50" y2="70" className="qt-translation-line" />
                  <polygon points="50,65 45,60 55,60" className="qt-translation-arrow-head" />
                </svg>
              </div>
            </div>
            <h3>QUERY TRANSLATOR</h3>
            <p>Seamlessly convert natural language queries into executable database commands, enhancing data accessibility for all users.</p>
          </div>
        </AnimatedElement>

        {/* Admin Dashboard Card */}
        <AnimatedElement animation="fade-up" delay={500}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-admin-dashboard"> 
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Dashboard Screen */}
                  <rect x="15" y="20" width="70" height="50" rx="8" ry="8" className="ad-screen-outline" />
                  {/* Graph Lines */}
                  <polyline points="20 60, 35 40, 50 55, 65 35, 80 50" className="ad-graph-line ad-graph-line-1" />
                  <polyline points="20 50, 35 30, 50 45, 65 25, 80 40" className="ad-graph-line ad-graph-line-2" />
                  {/* Control Buttons */}
                  <circle cx="30" cy="80" r="5" className="ad-control-button ad-control-button-1" />
                  <circle cx="50" cy="80" r="5" className="ad-control-button ad-control-button-2" />
                  <circle cx="70" cy="80" r="5" className="ad-control-button ad-control-button-3" />
                </svg>
              </div>
            </div>
            <h3>ADMIN DASHBOARD</h3>
            <p>Centralized control panel for managing AI infrastructure, monitoring performance, and overseeing security policies.</p>
          </div>
        </AnimatedElement>

        {/* RBAC + Logging + Firewall Card */}
        <AnimatedElement animation="fade-up" delay={600}>
          <div className="feature-card">
            <div className="icon-3d-wrapper">
              <div className="icon-3d-container icon-rbac-logging-firewall">
                <svg viewBox="0 0 100 100" className="feature-svg">
                  {/* Shield */}
                  <path d="M50 10 L90 40 L80 90 L50 95 L20 90 L10 40 Z" className="rlf-shield-body" />
                  {/* Firewall Bars */}
                  <line x1="30" y1="20" x2="30" y2="80" className="rlf-firewall-bar rlf-firewall-bar-1" />
                  <line x1="50" y1="15" x2="50" y2="85" className="rlf-firewall-bar rlf-firewall-bar-2" />
                  <line x1="70" y1="20" x2="70" y2="80" className="rlf-firewall-bar rlf-firewall-bar-3" />
                  {/* Logging Dots */}
                  <circle cx="25" cy="50" r="3" className="rlf-log-dot rlf-log-dot-1" />
                  <circle cx="75" cy="50" r="3" className="rlf-log-dot rlf-log-dot-2" />
                </svg>
              </div>
            </div>
            <h3>RBAC + LOGGING + FIREWALL</h3>
            <p>Implement robust Role-Based Access Control, comprehensive logging, and integrated firewall for uncompromised data security.</p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default Features;