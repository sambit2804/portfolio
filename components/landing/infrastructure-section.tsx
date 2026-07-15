"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const regions = [
  { name: "Techno India University", nodes: "B.Tech CSE Undergrad", status: "academic hub" },
  { name: "Stellar Network", nodes: "Rust & Soroban Smart Contracts", status: "web3 stack" },
  { name: "InnovateX, MAKAUT", nodes: "Artisans E-Commerce Concept", status: "hackathon showcase" },
  { name: "Ramakrishna Mission", nodes: "Ten-Year Speaking Program", status: "communication" },
];

export function InfrastructureSection() {
  const [activeRegion, setActiveRegion] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % regions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Globe zoom-in and fade
      gsap.fromTo(
        ".infra-globe img",
        { opacity: 0, scale: 0.8 },
        {
          scrollTrigger: {
            trigger: ".infra-globe",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );

      // Title & description reveal
      gsap.fromTo(
        ".infra-title > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: ".infra-title",
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

      // Large card & stacked cards reveals
      gsap.fromTo(
        ".infra-card-reveal",
        { opacity: 0, y: 50, filter: "blur(4px)" },
        {
          scrollTrigger: {
            trigger: ".infra-grid",
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

      // Regions list stagger reveal
      gsap.fromTo(
        ".infra-region-item",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".infra-regions-list",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background accent — retiré, remplacé par l'image sphère */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 infra-header">
          <span className="inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-12 h-px bg-foreground/20" />
            Academic & Community Reach
          </span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            {/* Image globe — colonne gauche, pleine hauteur */}
            <div className="w-48 lg:w-72 xl:w-80 shrink-0 infra-globe">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Titre + description empilés */}
            <div className="flex flex-col justify-center infra-title">
              <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
                Local roots,
                <br />
                <span className="text-muted-foreground">global reach.</span>
              </h2>

              <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg">
                Engineered locally from Kolkata, West Bengal. Building software concepts for the global open-source and Web3 developer ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6 infra-grid">
          {/* Large stat card */}
          <div className="lg:col-span-2 relative p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] overflow-hidden infra-card-reveal">
            {/* Animated dots background with connecting lines */}
            <div className="absolute inset-0 opacity-70">
              {/* SVG for connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {/* Dots */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6]"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-8xl lg:text-[8rem] font-display leading-none">3rd Yr</span>
                <span className="text-2xl text-muted-foreground">B.Tech CSE</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Computer Science undergraduate student at Techno India University, Kolkata, specialized in AI engineering and full-stack systems development.
              </p>
            </div>
          </div>

          {/* Stacked stat cards */}
          <div className="flex flex-col gap-6">
            <div className="p-8 border border-foreground/10 bg-foreground/[0.02] infra-card-reveal">
              <span className="text-5xl lg:text-6xl font-display">10 Yrs</span>
              <span className="block text-sm text-muted-foreground mt-2">RKM Schooling & Communication</span>
            </div>
            
            <div className="p-8 border border-foreground/10 bg-foreground/[0.02] infra-card-reveal">
              <span className="text-5xl lg:text-6xl font-display">2+</span>
              <span className="block text-sm text-muted-foreground mt-2">Hackathon showcases</span>
            </div>
          </div>
        </div>

        {/* Region list */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 infra-regions-list">
          {regions.map((region, index) => (
            <div
              key={region.name}
              className={`p-6 border transition-all duration-300 cursor-default infra-region-item ${
                activeRegion === index 
                  ? "border-foreground/30 bg-foreground/[0.04]" 
                  : "border-foreground/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  activeRegion === index ? "bg-[#eca8d6]" : "bg-foreground/20"
                }`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {region.status}
                </span>
              </div>
              <span className="font-medium block mb-1">{region.name}</span>
              <span className="text-sm text-muted-foreground">{region.nodes}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
