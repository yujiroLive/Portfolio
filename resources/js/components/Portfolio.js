import React from "react";
import Hero from "./Hero Section/Hero";
import Navbar from "./Navbar/Navbar";
import About from "./About Section/About";
import Skills from "./Skills Section/Skills";
import Project from "./Project Section/Project";
import Design from "./Design Section/Design";
import Contact from "./Contact Section/Contact";
import PostWall from "./Post Wall Section/PostWall";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Project />
      <Design />
      <Contact />
      <PostWall />
    </div>
  );
}

