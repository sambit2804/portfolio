"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  { 
    title: "Rust Smart Contracts", 
    description: "Building decentralized, secure state mechanisms using Soroban SDK."
  },
  { 
    title: "AI RAG Integration", 
    description: "Orchestrating Gemini and OpenAI models for contextual data processing."
  },
  { 
    title: "Next.js Interfaces", 
    description: "Crafting premium responsive layouts using React and Tailwind CSS."
  },
  { 
    title: "Structured Presentations", 
    description: "Pitching architecture concepts clearly to judges and stakeholders."
  },
];

export function DevelopersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveals
      gsap.fromTo(
        ".dev-header > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: ".dev-header",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Body reveal
      gsap.fromTo(
        ".dev-body",
        { opacity: 0, y: 40, filter: "blur(4px)" },
        {
          scrollTrigger: {
            trigger: ".dev-body",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Feature items reveal
      gsap.fromTo(
        ".dev-feature-item",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".dev-body",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      // Background image reveal
      gsap.fromTo(
        ".dev-bg-image-reveal img",
        { opacity: 0, scale: 1.05 },
        {
          scrollTrigger: {
            trigger: ".dev-bg-image-reveal",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0.85,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">

      {/* Image — absolute, bottom-right, behind all content */}
      <div className="absolute bottom-0 right-0 w-[55%] h-[85%] pointer-events-none dev-bg-image-reveal">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left-top"
        />
        {/* Fade left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        {/* Fade top edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
      </div>

      {/* All text content sits on top */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — Full width */}
        <div className="mb-16 dev-header">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Code Philosophy
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
            Write smart contracts.
            <br />
            <span className="text-muted-foreground">Connect AI agents.</span>
          </h2>
        </div>

        {/* Description + Features — left half only */}
        <div className="max-w-[50%] dev-body">
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md">
            Implementing transparent consensus structures on Stellar with Rust, and wrapping them in responsive full-stack applications with TypeScript.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="dev-feature-item"
              >
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
