import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarkVeil from '../ReactBits/DarkVeil';
import TiltedCard from '../ReactBits/TiltedCard';
import ShinyText from '../ReactBits/ShinyText';
import { isMobile, isLowEndDevice } from '../../utils/performance';
import './Project.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const projects = [
    {
      id: 'ecommerce',
      title: 'E-COMMERCE SYSTEM',
      image: '/Images/e commerce.jpg',
      alt: 'E-Commerce System'
    },
    {
      id: 'inventory',
      title: 'INVENTORY MANAGEMENT SYSTEM',
      image: '/Images/inventory.jpg',
      alt: 'Inventory Management System'
    },
    {
      id: 'petadopt',
      title: 'PET ADOPTION SYSTEM',
      image: '/Images/home (1).jpg',
      alt: 'Pet Adoption System'
    },
    {
      id: 'exam',
      title: 'ENTRANCE ONLINE EXAM SYSTEM',
      image: '/Images/Exam Instruction Page.jpg',
      alt: 'Entrance Online Exam System'
    }
  ];

  const mobile = useMemo(() => isMobile(), []);
  const lowEnd = useMemo(() => isLowEndDevice(), []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Optimize scroll trigger for mobile
    const scrubValue = mobile ? 2 : 1; // Less smooth on mobile for performance

    // Title zoom in/out animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrubValue,
        refreshPriority: lowEnd ? -1 : 0, // Lower priority on low-end devices
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
    <section ref={sectionRef} className="project-section" id="project">
      <div className="project-background">
        <div className="project-darkveil-wrapper">
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
      <div className="project-container">
        <div className="project-title-wrapper">
          <h2 ref={titleRef} className="project-title">PROJECTS</h2>
        </div>
        <div className="project-content">
          <div className="project-cards-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card-wrapper">
                <div className="project-card-title">
                  <ShinyText text={project.title} speed={3} />
                </div>
                <TiltedCard
                  imageSrc={project.image}
                  altText={project.alt}
                  containerHeight="350px"
                  containerWidth="100%"
                  imageHeight="350px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
                <div className="project-card-buttons">
                  <button
                    className="project-demo-btn"
                    onClick={() => setSelectedDemo(project)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="project-see-all">
            <button
              className="project-see-all-btn"
              onClick={() => setShowModal(true)}
            >
              See All
            </button>
          </div>
        </div>
      </div>

      {selectedDemo && (
        <div className="project-demo-overlay" onClick={() => setSelectedDemo(null)}>
          <div className="project-demo-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-demo-close" onClick={() => setSelectedDemo(null)}>
              ×
            </button>
            <div className="project-demo-image-wrapper">
              <img src={selectedDemo.image} alt={selectedDemo.alt} />
            </div>
            <div className="project-demo-title">
              <ShinyText text={selectedDemo.title} speed={3} />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="project-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3 className="project-modal-title">Coming Soon</h3>
            <p className="project-modal-text">
              More projects will be available soon. Stay tuned!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

