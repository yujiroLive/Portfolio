import React, { lazy, Suspense } from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero Section/Hero";

// Lazy load heavy components for better performance
const About = lazy(() => import("./About Section/About"));
const Skills = lazy(() => import("./Skills Section/Skills"));
const Project = lazy(() => import("./Project Section/Project"));
const Design = lazy(() => import("./Design Section/Design"));
const Contact = lazy(() => import("./Contact Section/Contact"));
const PostWall = lazy(() => import("./Post Wall Section/PostWall"));

const LoadingFallback = () => <div style={{ minHeight: '100vh' }} />;

export default function Portfolio() {
  return (
    <div className="portfolio">
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
      <About />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
      <Skills />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
      <Project />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
      <Design />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
      <Contact />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
      <PostWall />
      </Suspense>
    </div>
  );
}

