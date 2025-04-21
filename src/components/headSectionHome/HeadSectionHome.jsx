import React, { useEffect, useState, useRef } from 'react';
import 'animate.css'; // Import Animate.css

export default function HeadSectionHome({ title, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Start animation when the element is in view
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section element
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className='text-center'>
      <h2
        className={`text-3xl md:text-5xl font-semibold transition-all duration-700 ease-out transform ${isVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}
      >
        {title}
      </h2>
      <p
        className={`text-lg md:text-xl mt-4 transition-all duration-700 ease-out transform ${isVisible ? 'animate__animated animate__fadeInUp animate__delay-1s' : 'opacity-0 translate-y-8'}`}
      >
        {text}
      </p>
    </div>
  );
}
