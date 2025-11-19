"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Menu,
  X,
  MoveRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Check,
} from "lucide-react";

// --- BRAND COLORS ---
const THEME = {
  navy: "#206E7D",
  darkNavy: "#0F2529", // Deeper version for backgrounds
  teal: "#2B9E9F",
  green: "#35B37D",
  white: "#FFFFFF",
  offWhite: "#F1F5F9",
};

// --- HELPER HOOKS ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

// --- COMPONENTS ---

const RevealText = ({ children, delay = 0, className = "" }: any) => {
  const [ref, isVisible] = useScrollReveal() as [any, boolean];
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const NavItem = ({ href, label, number }: any) => (
  <a
    href={href}
    className="group flex items-center justify-between border-b border-white/10 py-6 hover:pl-4 transition-all duration-300"
  >
    <span className="text-3xl font-light text-white group-hover:text-[color:var(--teal)] transition-colors">
      {label}
    </span>
    <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">
      ({number})
    </span>
  </a>
);

const ServiceCard = ({ num, title, desc }: any) => {
  return (
    <div className="group relative border-t border-white/20 py-12 hover:bg-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 items-start">
        <span className="font-mono text-[color:var(--teal)] text-sm">
          0{num}
        </span>
        <div className="flex-1">
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4 group-hover:translate-x-4 transition-transform duration-500">
            {title}
          </h3>
          <p className="max-w-xl text-slate-400 font-light leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
            {desc}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform rotate-45 group-hover:rotate-0">
          <ArrowUpRight className="text-[color:var(--teal)] w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const ProjectSlide = ({ img, title, cat, year }: any) => {
  return (
    <div className="min-w-[85vw] md:min-w-[600px] h-[600px] relative group cursor-pointer snap-center">
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--darkNavy)] to-transparent opacity-80"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-10 w-full z-10">
        <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-6">
          <div>
            <p className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-2">
              {cat}
            </p>
            <h3 className="text-4xl md:text-5xl font-light text-white">
              {title}
            </h3>
          </div>
          <p className="text-white/40 font-mono text-sm">{year}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm group-hover:text-white transition-colors">
            View Case Study
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[color:var(--teal)] group-hover:border-[color:var(--teal)] group-hover:text-white transition-all duration-300 text-white/50">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Colors injected as CSS variables for cleaner Tailwind usage
  const style = {
    "--navy": THEME.navy,
    "--darkNavy": THEME.darkNavy,
    "--teal": THEME.teal,
    "--green": THEME.green,
    "--white": THEME.white,
  } as React.CSSProperties;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={style}
      className="bg-[color:var(--darkNavy)] min-h-screen font-sans selection:bg-[color:var(--teal)] selection:text-white overflow-x-hidden"
    >
      {/* --- HEADER --- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 mix-blend-difference text-white ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 z-50 relative">
            {/* Minimalist Logo Mark */}
            <div className="flex gap-1 h-6">
              <div className="w-1.5 h-full bg-[color:var(--navy)]"></div>
              <div className="w-1.5 h-full bg-[color:var(--teal)]"></div>
              <div className="w-1.5 h-full bg-[color:var(--green)]"></div>
            </div>
            <span className="text-2xl font-bold tracking-tighter">
              QUAD<span className="font-light text-white/70">INFRA</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[color:var(--teal)] transition-colors group">
              Start Project
              <span className="block w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-[color:var(--teal)] transition-all"></span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="z-50 relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* --- FULL SCREEN MENU --- */}
      <div
        className={`fixed inset-0 bg-[color:var(--darkNavy)] z-40 flex items-center justify-center transition-all duration-700 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="hidden md:block">
            <p className="text-white/50 text-sm font-mono mb-8">
              FEATURED PROJECT
            </p>
            <div className="aspect-video bg-slate-800 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                alt="Menu Feature"
              />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-xl">Vertex Sky Tower</h4>
                <p className="text-[color:var(--teal)] text-sm">
                  Construction / 2024
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <NavItem href="#home" label="Home" number="01" />
            <NavItem href="#about" label="About Us" number="02" />
            <NavItem href="#services" label="Expertise" number="03" />
            <NavItem href="#projects" label="Portfolio" number="04" />
            <NavItem href="#contact" label="Contact" number="05" />

            <div className="mt-12 flex gap-6 text-white/40">
              <Instagram className="hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="hover:text-white cursor-pointer transition-colors" />
              <Twitter className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        {/* Background with gradient fade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Architecture"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--darkNavy)] via-[color:var(--darkNavy)]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--darkNavy)] via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <RevealText className="mb-2">
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-[color:var(--green)] rounded-full animate-pulse"></span>
                <span className="text-[color:var(--teal)] font-mono text-sm tracking-[0.3em] uppercase">
                  Reshaping Horizons
                </span>
              </div>
            </RevealText>

            <div className="space-y-2 mb-12">
              <RevealText delay={100}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]">
                  Constructing
                </h1>
              </RevealText>
              <RevealText delay={200}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]">
                  The{" "}
                  <span className="font-serif italic text-[color:var(--teal)]">
                    Impossible.
                  </span>
                </h1>
              </RevealText>
            </div>

            <RevealText delay={400}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-12 border-t border-white/10 pt-8 max-w-2xl">
                <p className="text-slate-400 text-lg leading-relaxed">
                  Quad Infra is a multidisciplinary engineering firm dedicated
                  to building infrastructure that defines the next century of
                  human progress.
                </p>
                <button className="whitespace-nowrap bg-white text-[color:var(--darkNavy)] px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-[color:var(--teal)] hover:text-white transition-colors duration-300">
                  View Our Legacy
                </button>
              </div>
            </RevealText>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-bounce">
          <span className="text-white/50 text-xs font-mono uppercase tracking-widest rotate-90 md:rotate-0 origin-left md:origin-center mb-6 md:mb-0">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white"></div>
        </div>
      </section>

      {/* --- ABOUT / STATISTICS (Marquee Style) --- */}
      <section className="py-20 border-y border-white/5 overflow-hidden">
        <div className="flex gap-20 animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="text-8xl font-bold text-transparent stroke-text-white opacity-20">
                ENGINEERING
              </span>
              <span className="text-8xl font-serif italic text-[color:var(--teal)] opacity-50">
                EXCELLENCE
              </span>
              <span className="text-8xl font-bold text-transparent stroke-text-white opacity-20">
                INNOVATION
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* --- INTRO GRID --- */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-5xl text-white font-light leading-tight mb-12">
                We bridge the gap between <br />
                <span className="text-[color:var(--teal)]">
                  visionary design
                </span>{" "}
                and <br />
                <span className="text-[color:var(--teal)]">
                  structural reality.
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    25<span className="text-[color:var(--green)]">+</span>
                  </h3>
                  <p className="text-slate-500 font-mono text-sm">
                    YEARS OF EXCELLENCE
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    $2B<span className="text-[color:var(--green)]">+</span>
                  </h3>
                  <p className="text-slate-500 font-mono text-sm">
                    PROJECT VALUE DELIVERED
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative z-10">
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  From the deepest foundations to the highest spires, Quad Infra
                  brings a level of precision that is unmatched in the industry.
                  Our team of elite engineers uses proprietary technology to
                  reduce timelines while enhancing safety.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-4 text-white border-b border-[color:var(--teal)] pb-2 hover:gap-6 transition-all"
                >
                  Read the Corporate Profile{" "}
                  <MoveRight className="text-[color:var(--teal)]" />
                </a>
              </div>
              {/* Decorative architectural lines */}
              <div className="absolute -top-20 -right-20 w-64 h-64 border border-white/5 rounded-full"></div>
              <div className="absolute top-0 right-0 w-32 h-32 border border-[color:var(--teal)]/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL SCROLL PROJECTS --- */}
      <section id="projects" className="py-20 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <p className="text-[color:var(--teal)] font-mono text-sm tracking-widest uppercase mb-4">
              Selected Works
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-light">
              Recent Landmarks
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <MoveRight className="rotate-180" />
            </button>
            <button className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
              <MoveRight />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory no-scrollbar">
          <ProjectSlide
            img="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1000"
            title="The Helix Bridge"
            cat="Infrastructure"
            year="2023"
          />
          <ProjectSlide
            img="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1000"
            title="Nexus Tower HQ"
            cat="Commercial"
            year="2024"
          />
          <ProjectSlide
            img="https://images.unsplash.com/photo-1590486803833-1c5dc8ce2fe3?auto=format&fit=crop&q=80&w=1000"
            title="Metro Station 9"
            cat="Public Transport"
            year="2022"
          />
          <ProjectSlide
            img="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000"
            title="Eco-Villas"
            cat="Residential"
            year="2023"
          />
        </div>
      </section>

      {/* --- SERVICES LIST --- */}
      <section id="services" className="py-32 bg-black/20">
        <div className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-6xl text-white font-light mb-6">
            Core Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl">
            We deliver end-to-end solutions for the most demanding environments
            on Earth.
          </p>
        </div>

        <div>
          <ServiceCard
            num="1"
            title="General Contracting"
            desc="Managing complex supply chains and large-scale labor forces to deliver skyscrapers and stadiums on time, every time."
          />
          <ServiceCard
            num="2"
            title="Civil Infrastructure"
            desc="Roads, bridges, dams, and tunnels. We move the earth to connect people and commerce."
          />
          <ServiceCard
            num="3"
            title="Sustainable Energy"
            desc="Solar farms, wind turbines, and hydroelectric plants. Building the power grid of tomorrow."
          />
          <ServiceCard
            num="4"
            title="Industrial Engineering"
            desc="Factories, warehouses, and logistics hubs optimized for automation and high throughput."
          />
        </div>
      </section>

      {/* --- MASSIVE FOOTER --- */}
      <footer
        id="contact"
        className="pt-32 pb-12 bg-black relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[color:var(--navy)] rounded-full opacity-10 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
              <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                Let's Build <br />
                <span className="text-[color:var(--teal)]">The Future.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-md mb-12">
                Ready to discuss your next landmark project? Our engineering
                team is ready to deploy worldwide.
              </p>
              <a
                href="mailto:hello@quadinfra.com"
                className="inline-block text-3xl md:text-5xl text-white hover:text-[color:var(--teal)] transition-colors border-b border-white/20 pb-4"
              >
                hello@quadinfra.com
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-6">
                  Headquarters
                </h4>
                <p className="text-white text-lg leading-relaxed">
                  101 Innovation Blvd,
                  <br />
                  Silicon Docks, Level 45
                  <br />
                  New York, NY 10011
                </p>
              </div>
              <div>
                <h4 className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-6">
                  Contact
                </h4>
                <p className="text-white text-lg leading-relaxed mb-4">
                  +1 (555) 091-2345
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[color:var(--teal)] transition-colors">
                    <Linkedin size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[color:var(--teal)] transition-colors">
                    <Twitter size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-sm font-mono uppercase">
              © 2024 Quad Infra. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-slate-600 hover:text-white text-sm font-mono uppercase transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-white text-sm font-mono uppercase transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- GLOBAL STYLES for Animations --- */}
      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        /* Hide scrollbar for horizontal section */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
