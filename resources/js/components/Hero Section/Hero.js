import React, { useState, useMemo } from "react";
import DarkVeil from "../ReactBits/DarkVeil";
import TextType from "../ReactBits/TextType";
import ShinyText from "../ReactBits/ShinyText";
import { isMobile } from "../../utils/performance";

export default React.memo(function Hero() {
  const [showShinyText, setShowShinyText] = useState(false);

  const handleSentenceComplete = () => {
    setShowShinyText(true);
  };

  // Optimize for mobile/performance
  const mobile = useMemo(() => isMobile(), []);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-darkveil-wrapper">
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
      <div className="hero-container">
        <div className="hero-content">
          {showShinyText && (
            <div className="hero-role">
              <ShinyText text="WEB DEVELOPER" speed={3} />
            </div>
          )}
          <h1 className="hero-title">
            Hello, I am{" "}
            <TextType
              text={["Uriel Jay F. Yape"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              loop={false}
              onSentenceComplete={handleSentenceComplete}
            />
          </h1>
          {showShinyText && (
            <div className="hero-buttons">
              <button 
                className="hero-btn hero-btn-primary"
                onClick={() => {
                  const projectSection = document.getElementById('project');
                  if (projectSection) {
                    projectSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See All Projects
              </button>
              <button 
                className="hero-btn hero-btn-secondary"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Me
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
