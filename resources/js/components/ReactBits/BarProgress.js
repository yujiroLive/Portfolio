import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BarProgress.css';

export default function BarProgress({ 
  percentage, 
  label, 
  logo,
  animated = true,
  delay = 0
}) {
  const barRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {
    if (!animated || !barRef.current) return;

    const bar = barRef.current;
    
    gsap.set(bar, { width: 0 });

    const tl = gsap.timeline({ delay });
    tl.to(bar, {
      width: `${percentage}%`,
      duration: 1.5,
      ease: 'power2.out'
    });

    if (percentageRef.current) {
      gsap.fromTo(
        percentageRef.current,
        { textContent: 0 },
        {
          textContent: percentage,
          duration: 1.5,
          ease: 'power2.out',
          delay,
          snap: { textContent: 1 },
          onUpdate: function() {
            if (percentageRef.current) {
              percentageRef.current.textContent = Math.round(this.targets()[0].textContent);
            }
          }
        }
      );
    }
  }, [percentage, animated, delay]);

  return (
    <div className="bar-progress">
      <div className="bar-progress-header">
        {logo && (
          <div className="bar-progress-logo">
            <img src={logo} alt={label} />
          </div>
        )}
        <div className="bar-progress-info">
          <span className="bar-progress-label">{label}</span>
          <span ref={percentageRef} className="bar-progress-percentage">
            {animated ? 0 : percentage}%
          </span>
        </div>
      </div>
      <div className="bar-progress-track">
        <div 
          ref={barRef}
          className="bar-progress-bar"
          style={{ width: animated ? 0 : `${percentage}%` }}
        />
      </div>
    </div>
  );
}

