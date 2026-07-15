"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight, Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-container-reveal",
        { opacity: 0, y: 80, scale: 0.96, filter: "blur(6px)" },
        {
          scrollTrigger: {
            trigger: ".cta-container-reveal",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="cta" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className="relative border border-foreground cta-container-reveal"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-6xl md:text-7xl lg:text-[72px] font-display tracking-tight mb-8 leading-[0.95]">
                  Ready to collaborate
                  <br />
                  on your next build?
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Let's work together to design intelligent products, secure smart contracts, or responsive web platforms. Connect with me or browse my public work.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <ShinyButton
                    onClick={() => window.open('https://www.linkedin.com/in/sambit-das-009248339/', '_blank')}
                  >
                    Connect on LinkedIn
                  </ShinyButton>

                  <LiquidButton
                    onClick={() => window.open('https://github.com/sambit2804', '_blank')}
                    className="text-foreground"
                  >
                    Explore GitHub
                  </LiquidButton>

                  <a
                    href="/Sambit_Das_Resume.pdf"
                    download="Sambit_Das_Resume.pdf"
                  >
                    <LiquidButton className="text-foreground">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </LiquidButton>
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono">
                  Based in Kolkata, West Bengal, India
                </p>
              </div>

              {/* Right image */}
              <div className="hidden lg:flex items-end justify-center w-[600px] h-[650px] -mr-16">
                <img
                  src="/images/bridge.png"
                  alt="Two trees connected by glowing arcs"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
