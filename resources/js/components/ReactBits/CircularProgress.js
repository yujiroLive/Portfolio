import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CircularProgress.css';

export default function CircularProgress({ 
  percentage, 
  label, 
  size = 120, 
  strokeWidth = 8,
  color = '#7b2cbf',
  animated = true,
  delay = 0,
  isMoving = false
}) {
  const circleRef = useRef(null);
  const percentageRef = useRef(null);
  const labelRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!circleRef.current) return;

    const circle = circleRef.current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    if (!hasAnimatedRef.current && animated) {
      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference
      });

      const tl = gsap.timeline({ delay });
      tl.to(circle, {
        strokeDashoffset: offset,
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

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay + 0.5,
            ease: 'power2.out'
          }
        );
      }

      hasAnimatedRef.current = true;
    } else if (isMoving) {
      // Update smoothly for moving percentages
      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 0.3,
        ease: 'power1.out'
      });

      if (percentageRef.current) {
        percentageRef.current.textContent = Math.round(percentage);
      }
    }
  }, [percentage, size, strokeWidth, animated, delay, isMoving]);

  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg viewBox={viewBox} className="circular-progress-svg">
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          className="circular-progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="circular-progress-content">
        <span ref={percentageRef} className="circular-progress-percentage">
          {animated ? 0 : percentage}%
        </span>
        <span ref={labelRef} className="circular-progress-label">
          {label}
        </span>
      </div>
    </div>
  );
}

