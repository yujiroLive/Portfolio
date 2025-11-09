import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ReactBits/SplitText';
import CircularGallery from '../ReactBits/CircularGallery';
import DarkVeil from '../ReactBits/DarkVeil';
import ShinyText from '../ReactBits/ShinyText';
import { isMobile, isLowEndDevice } from '../../utils/performance';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const galleryItems = [
    { 
      image: '/Images/About me.jpg', 
      text: ''
    },
    { 
      image: '/Images/Virtual A.jpg', 
      text: ''
    },
    { 
      image: '/Images/gym.jpg', 
      text: ''
    }
  ];

  const combinedDescription = "I'm Uriel, a 4th-year IT student currently hoping to graduate this year. I enjoy coding, especially in web development and design, and I also work with Canva and Figma to create digital content. I'm aspiring to be a virtual assistant, web developer, or digital designer, passionate about creating engaging digital experiences and helping businesses establish their online presence through creative design and development. I also like going to the gym and working out - fitness is an important part of my life, helping me stay healthy, focused, and energized while balancing my academic and professional pursuits.";

  const mobile = useMemo(() => isMobile(), []);
  const lowEnd = useMemo(() => isLowEndDevice(), []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Optimize scroll trigger for mobile
    const scrubValue = mobile ? 2 : 1;

    // Title zoom in/out animation - starts small, gets bigger, then settles to normal size, then smaller when scrolled out
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrubValue,
        refreshPriority: lowEnd ? -1 : 0,
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

    // Description fade in immediately when section is visible - no delay
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, {
        opacity: 1,
        y: 0
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-background">
        <div className="about-darkveil-wrapper">
          <DarkVeil
            hueShift={280}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={mobile ? 0.3 : 0.4}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        </div>
      </div>
      <div className="about-container">
        <div className="about-title-wrapper">
          <h1 ref={titleRef} className="about-title">
            ABOUT ME
          </h1>
        </div>
        
        <div className="about-content">
          <div className="about-gallery-wrapper">
            <CircularGallery
              items={galleryItems}
              bend={-3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
            <div className="about-motto-below-gallery">
              <ShinyText text="WALKING WITH THE HEART, CODING WITH THE MIND" speed={3} />
            </div>
          </div>
          
          <div className="about-description-wrapper">
            <div className="about-description-content">
              <p ref={descriptionRef} className="about-description">
                <SplitText text={combinedDescription} delay={0} duration={0.2} />
              </p>
              <div className="about-stats-row">
                <div className="about-stat-item about-stat-main">
                  <span className="stat-number">3</span>
                  <span className="stat-label">PROJECT FINISHED</span>
                </div>
                <div className="about-stat-item about-stat-experience">
                  <span className="stat-number">2</span>
                  <span className="stat-label">YEARS EXPERIENCE</span>
                </div>
              </div>
              <div className="about-cv-button">
                <button 
                  className="cv-download-btn"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/FILE/RESUME.pdf';
                    link.download = 'Uriel_Yape_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

