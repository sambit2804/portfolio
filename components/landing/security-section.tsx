"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const securityFeatures = [
  {
    icon: Shield,
    title: "Predictable Types",
    description: "TypeScript and Rust core components for robust, compile-time verified execution.",
    image: "/images/isolated.jpg",
  },
  {
    icon: Lock,
    title: "Decentralized Trust",
    description: "Transparent, immutable on-chain data state machines via Soroban SDK.",
    image: "/images/encrypted.jpg",
  },
  {
    icon: Eye,
    title: "Clear Architecture",
    description: "Structured separations of API services, backend logic, and interface layers.",
    image: "/images/audit.jpg",
  },
  {
    icon: FileCheck,
    title: "Verifiable Logic",
    description: "Comprehensive testnet testing and clear communication of system limits.",
    image: "/images/permissions.jpg",
  },
];

const certifications = ["Techno India University", "Stellar Buildathon", "InnovateX MAKAUT", "Ramakrishna Mission"];

export function SecuritySection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveals
      gsap.fromTo(
        ".security-header > *",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: ".security-header",
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

      // Left card reveal
      gsap.fromTo(
        ".security-left-card",
        { opacity: 0, x: -50, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: ".security-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Right list cards reveal
      gsap.fromTo(
        ".security-card-item",
        { opacity: 0, x: 50 },
        {
          scrollTrigger: {
            trigger: ".security-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Certification badges reveal
      gsap.fromTo(
        ".security-badge",
        { opacity: 0, y: 15 },
        {
          scrollTrigger: {
            trigger: ".security-left-card",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0.8,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background accent removed */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 security-header">
          <span className="inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-12 h-px bg-foreground/20" />
            Standards
          </span>
          
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] mb-12">
            Structured,
            <br />
            <span className="text-muted-foreground">not speculative.</span>
          </h2>
          
          {/* Description — below title */}
          <div>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Developing system platforms with high type safety, decentralized on-chain storage, and clean architectural boundaries.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6 security-grid">
          {/* Large visual card */}
          <div className="lg:col-span-7 relative p-8 lg:p-12 border border-foreground/10 min-h-[400px] overflow-hidden security-left-card">
            {/* Dynamic feature image with cross-fade — desktop only */}
            <div className="absolute inset-0 pointer-events-none items-center justify-end hidden lg:flex">
              {securityFeatures.map((feature, index) => (
                <img
                  key={feature.image}
                  src={feature.image}
                  alt={feature.title}
                  className="absolute h-3/4 w-3/4 object-contain object-right transition-opacity duration-500"
                  style={{ opacity: activeFeature === index ? 0.85 : 0 }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground">Active protection</span>
              <div className="mt-8">
                <span className="text-7xl lg:text-8xl font-display">0</span>
                <span className="block text-muted-foreground mt-2">Security incidents this year</span>
              </div>
            </div>
            
            {/* Certification badges */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className="px-3 py-1 border border-foreground/10 text-xs font-mono text-muted-foreground security-badge"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Feature list — right side */}
          <div className="lg:col-span-5 flex flex-col gap-4 security-right-cards">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveFeature(index)}
                  className={`text-left p-6 border transition-all duration-300 flex items-start gap-4 security-card-item ${
                    activeFeature === index
                      ? "border-foreground bg-foreground/[0.04] translate-x-2"
                      : "border-foreground/10 hover:border-foreground/20"
                  }`}
                >
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeFeature === index 
                      ? "border-foreground bg-foreground text-background" 
                      : "border-foreground/20"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
