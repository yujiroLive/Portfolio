import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplitText({ text, delay = 0, duration = 0.6 }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.textContent.split("");
      textRef.current.innerHTML = "";

      chars.forEach((char, index) => {
        const span = document.createElement("span");
        // Use regular space instead of non-breaking space to allow proper word wrapping
        span.textContent = char;
        span.style.opacity = "0";
        span.style.display = "inline";
        textRef.current.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          duration: duration,
          delay: delay + index * 0.01,
          ease: "power2.out",
        });
      });
    }
  }, [text, delay, duration]);

  return <span ref={textRef}>{text}</span>;
}

