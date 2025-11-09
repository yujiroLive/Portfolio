import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardSwap, { Card } from '../ReactBits/CardSwap';
import TrueFocus from '../ReactBits/TrueFocus';
import DarkVeil from '../ReactBits/DarkVeil';
import './Design.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Design() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Title zoom in/out animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

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
    .to(
      title,
      {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }
    )
    .to(
      title,
      {
        scale: 0.7,
        y: -50,
        duration: 0.3,
        ease: 'power2.inOut',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="design-section" 
      id="design"
    >
      <div className="design-darkveil-wrapper">
        <DarkVeil
          hueShift={280}
          noiseIntensity={0.1}
          scanlineIntensity={0.2}
          speed={0.3}
          scanlineFrequency={2}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>
      
      <div className="design-container">
        <div className="design-title-wrapper">
          <h2 ref={titleRef} className="design-title">POSTER DESIGN</h2>
        </div>
        
        <div className="design-subtitle">
          <TrueFocus
            sentence="THIS IS MY POSTER DESIGN"
            manualMode={false}
            blurAmount={5}
            borderColor="#9d4edd"
            glowColor="rgba(157, 78, 221, 0.6)"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>

        <div className="design-cards-wrapper">
          <CardSwap
            width={800}
            height={500}
            cardDistance={60}
            verticalDistance={70}
            delay={3200}
            pauseOnHover={true}
            skewAmount={5}
            easing="elastic"
          >
            <Card>
              <img 
                src="/Images/Black and Orange Bold Creative Portfolio Presentation.png" 
                alt="Poster Design 1"
                className="design-card-image"
              />
            </Card>
            <Card>
              <img 
                src="/Images/Red and White Modern Bold Social Media Specialist Portofolio Presentation.png" 
                alt="Poster Design 2"
                className="design-card-image"
              />
            </Card>
            <Card>
              <img 
                src="/Images/YEL.jpg" 
                alt="Poster Design 3"
                className="design-card-image"
              />
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
}

