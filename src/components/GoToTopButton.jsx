import React, { useState, useEffect, useCallback } from 'react';

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const scrollThreshold = 300; // Pixels scrolled before button appears

  const handleScroll = useCallback(() => {
    if (window.scrollY > scrollThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    } 
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to top
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <button
      id="goToTopBtn"
      className={`go-to-top-btn ${showButton ? 'show' : ''}`}
      onClick={handleClick}
      aria-label="Go to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
    </button>
  );
}

export default GoToTopButton;