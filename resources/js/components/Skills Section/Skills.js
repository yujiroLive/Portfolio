import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BarProgress from '../ReactBits/BarProgress';
import CircularProgress from '../ReactBits/CircularProgress';
import SplitText from '../ReactBits/SplitText';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [showSkills, setShowSkills] = useState(false);

  const [creativityPercentage, setCreativityPercentage] = useState(85);
  const [communicationPercentage, setCommunicationPercentage] = useState(75);
  const [problemSolvingPercentage, setProblemSolvingPercentage] = useState(60);
  const [teamworkPercentage, setTeamworkPercentage] = useState(90);
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const professionalSkills = [
    { label: 'Creativity', percentage: creativityPercentage, delay: 0, isAnimated: true },
    { label: 'Communication', percentage: communicationPercentage, delay: 0.2, isAnimated: true },
    { label: 'Problem Solving', percentage: problemSolvingPercentage, delay: 0.4, isAnimated: true },
    { label: 'Teamwork', percentage: teamworkPercentage, delay: 0.6, isAnimated: true }
  ];

  // Animate Creativity percentage between 85-90
  useEffect(() => {
    if (!showSkills) return;
    
    const interval = setInterval(() => {
      setCreativityPercentage(prev => {
        if (prev >= 90) return 85;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showSkills]);

  // Animate Communication percentage between 75-80
  useEffect(() => {
    if (!showSkills) return;
    
    const interval = setInterval(() => {
      setCommunicationPercentage(prev => {
        if (prev >= 80) return 75;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showSkills]);

  // Animate Problem Solving percentage between 60-65
  useEffect(() => {
    if (!showSkills) return;
    
    const interval = setInterval(() => {
      setProblemSolvingPercentage(prev => {
        if (prev >= 65) return 60;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showSkills]);

  // Animate Teamwork percentage between 90-95
  useEffect(() => {
    if (!showSkills) return;
    
    const interval = setInterval(() => {
      setTeamworkPercentage(prev => {
        if (prev >= 95) return 90;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showSkills]);

  const technicalSkills = {
    frontend: [
      { label: 'HTML', percentage: 90, logo: '/Images/png-clipart-responsive-web-design-html-computer-icons-css3-world-wide-web-consortium-css-angle-text.png' },
      { label: 'CSS', percentage: 80, logo: '/Images/CSS-Logo-2011.png' },
      { label: 'JavaScript', percentage: 75, logo: '/Images/JavaScript-Symbol.png' }
    ],
    backend: [
      { label: 'PHP', percentage: 80, logo: '/Images/PHP-logo.svg.png' },
      { label: 'Laravel', percentage: 85, logo: '/Images/Laravel.svg.png' },
      { label: 'Node.js', percentage: 90, logo: '/Images/Node.js_logo.svg.png' }
    ],
    digital: [
      { label: 'Canva', percentage: 90, logo: '/Images/Canva_Logo.svg.png' },
      { label: 'Figma', percentage: 85, logo: '/Images/Figma-Logo.png' }
    ]
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Title zoom in/out animation - positioned more above, smaller when scrolled out
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Phase 1: Start small and zoom in
    tl.fromTo(
      title,
      {
        scale: 0.2,
        opacity: 0,
        y: 150,
      },
      {
        scale: 1.5,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    )
    // Phase 2: Scale down to normal size
    .to(
      title,
      {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }
    )
    // Phase 3: Scale down smaller when scrolled out
    .to(
      title,
      {
        scale: 0.7,
        y: -50,
        duration: 0.3,
        ease: 'power2.inOut',
      }
    );

    // Show skills when scrolling into view
    const skillsTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => setShowSkills(true),
      once: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section ref={sectionRef} className="skills-section" id="skills">
      <div className="skills-background">
      </div>
      <div className="skills-container">
        <div className="skills-title-wrapper">
          <h2 ref={titleRef} className="skills-title">SKILLS</h2>
        </div>

        {showSkills && (
          <div className="skills-content-wrapper">
            <div className="skills-description">
              <SplitText 
                text="My technical expertise and professional skills that drive my work." 
                delay={0} 
                duration={0.2} 
              />
            </div>

            <div className="skills-category-buttons">
              <button
                className={`category-btn ${selectedCategory === 'frontend' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('frontend')}
              >
                Frontend
              </button>
              <button
                className={`category-btn ${selectedCategory === 'backend' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('backend')}
              >
                Backend
              </button>
              <button
                className={`category-btn ${selectedCategory === 'digital' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('digital')}
              >
                Digital Design
              </button>
            </div>

            <div className="skills-main-content">
              <div className="skills-bar-section">
                <h3 className="skills-section-title">
                  Technical Skills
                  <span className="skills-underline"></span>
                </h3>
                <div className="skills-bar-list" key={selectedCategory}>
                  {technicalSkills[selectedCategory].map((skill, index) => (
                    <BarProgress
                      key={`${selectedCategory}-${index}`}
                      percentage={skill.percentage}
                      label={skill.label}
                      logo={skill.logo}
                      animated={showSkills}
                      delay={0.1 + index * 0.15}
                    />
                  ))}
                </div>
                {selectedCategory && (
                  <div className="skills-description-text">
                    <p>
                      {selectedCategory === 'frontend' && 
                        "Proficient in HTML, SCSS, JavaScript, and responsive web design for modern, user-friendly interfaces."
                      }
                      {selectedCategory === 'backend' && 
                        "Skilled in PHP (Laravel Framework) and Node.js for building efficient and secure web applications."
                      }
                      {selectedCategory === 'digital' && 
                        "Knowledgeable in Canva and Figma for creating logos, posters, and digital marketing materials that enhance brand identity."
                      }
                    </p>
                  </div>
                )}
              </div>

              <div className="skills-circular-section">
                <h3 className="skills-section-title">
                  Professional Skills
                  <span className="skills-underline"></span>
                </h3>
                <div className="skills-circular-grid">
                  {professionalSkills.map((skill, index) => (
                    <div 
                      key={index}
                      className={`circular-skill-item ${index % 2 === 0 ? 'top' : 'bottom'}`}
                    >
                      <CircularProgress
                        percentage={skill.percentage}
                        label={skill.label}
                        size={140}
                        strokeWidth={10}
                        color="#9d4edd"
                        animated={showSkills && !skill.isAnimated}
                        delay={skill.delay + 0.7}
                        isMoving={skill.isAnimated}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
