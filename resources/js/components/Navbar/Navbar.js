import React, { useState } from 'react';
import Dock from './Dock';
import { HomeIcon, AboutIcon, WorkIcon, SkillsIcon, ContactIcon } from './Icons';
import './Navbar.scss';

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { 
      icon: <HomeIcon size={18} />, 
      label: 'Home', 
      onClick: () => {
        setActiveIndex(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      icon: <AboutIcon size={18} />, 
      label: 'About me', 
      onClick: () => {
        setActiveIndex(1);
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: <SkillsIcon size={18} />, 
      label: 'Skills', 
      onClick: () => {
        setActiveIndex(2);
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: <WorkIcon size={18} />, 
      label: 'Project', 
      onClick: () => {
        setActiveIndex(3);
        const projectSection = document.getElementById('project');
        if (projectSection) {
          projectSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      icon: <ContactIcon size={18} />, 
      label: 'Contact', 
      onClick: () => {
        setActiveIndex(4);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  ];

  return (
    <nav className="navbar">
      <Dock 
        items={items}
        activeIndex={activeIndex}
        panelWidth={68}
        baseItemSize={40}
        magnification={55}
      />
    </nav>
  );
}

