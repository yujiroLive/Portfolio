import React, { useState } from "react";
import LiquidEther from "../ReactBits/LiquidEither";
import DarkVeil from "../ReactBits/DarkVeil";
import TextType from "../ReactBits/TextType";
import ShinyText from "../ReactBits/ShinyText";

export default function Hero() {
  const [showShinyText, setShowShinyText] = useState(false);

  const handleSentenceComplete = () => {
    setShowShinyText(true);
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-darkveil-wrapper">
          <DarkVeil
            hueShift={280}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        </div>
        <LiquidEther
          colors={['#3c096c', '#5a189a', '#7b2cbf', '#9d4edd']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
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
              <button className="hero-btn hero-btn-primary">
                See All Projects
              </button>
              <button className="hero-btn hero-btn-secondary">
                Contact Me
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
