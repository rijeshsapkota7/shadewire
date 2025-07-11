import React, { useRef, useEffect, useState } from 'react';

// This component provides a reusable way to animate elements on scroll.
// It uses Intersection Observer to detect when an element enters the viewport.
function AnimatedElement({ children, animation = 'fade-up', delay = 0 }) {
  const elementRef = useRef(null); // Create a ref to attach to the DOM element
  const [isVisible, setIsVisible] = useState(false); // State to control visibility/animation

  useEffect(() => {
    // Capture the current value of the ref to avoid ESLint warnings
    // (ref.current can change between render and effect cleanup)
    const currentElement = elementRef.current;

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => { // Callback function when intersection changes
        if (entry.isIntersecting) { // If the element is visible in the viewport
          // Apply animation after a specified delay
          setTimeout(() => {
            setIsVisible(true); // Set state to trigger CSS animation
          }, delay);
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      },
      { threshold: 0.1 } // Options: Trigger when 10% of the element is visible
    );

    // Start observing the element if it exists
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function: Disconnect the observer when the component unmounts
    return () => {
      if (currentElement) { // Use the captured value for cleanup
        observer.unobserve(currentElement);
      }
    };
  }, [delay]); // Re-run effect if delay changes

  return (
    <div
      ref={elementRef} // Attach the ref to the div
      // Apply base animation class and 'is-visible' when state is true
      className={`animated-element ${isVisible ? 'is-visible' : ''} ${animation}`}
    >
      {children} {/* Render the child components passed to AnimatedElement */}
    </div>
  );
}

export default AnimatedElement;