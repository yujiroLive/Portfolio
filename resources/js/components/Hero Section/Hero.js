import React, { useState, useMemo } from "react";
import LiquidEther from "../ReactBits/LiquidEither";
import DarkVeil from "../ReactBits/DarkVeil";
import TextType from "../ReactBits/TextType";
import ShinyText from "../ReactBits/ShinyText";
import { isMobile, isLowEndDevice, getOptimalResolution } from "../../utils/performance";

export default React.memo(function Hero() {
  const [showShinyText, setShowShinyText] = useState(false);

  const handleSentenceComplete = () => {
    setShowShinyText(true);
  };

  // Optimize for mobile/performance
  const mobile = useMemo(() => isMobile(), []);
  const lowEnd = useMemo(() => isLowEndDevice(), []);
  const liquidResolution = useMemo(() => getOptimalResolution(0.5), []);
  const iterations = useMemo(() => lowEnd ? 16 : 32, [lowEnd]);

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
        <LiquidEther
          colors={['#3c096c', '#5a189a', '#7b2cbf', '#9d4edd']}
          mouseForce={mobile ? 10 : 20}
          cursorSize={mobile ? 50 : 100}
          isViscous={false}
          viscous={30}
          iterationsViscous={iterations}
          iterationsPoisson={iterations}
          resolution={liquidResolution}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={lowEnd ? 1.5 : 2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
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
