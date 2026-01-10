"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Menu,
  X,
  MoveRight,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Twitter,
  Quote,
} from "lucide-react";

// --- TYPES ---

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  value: string;
  desc: string;
  img: string;
}

interface Founder {
  name: string;
  role: string;
  img: string;
  bio: string;
  nothing?: any;
}

interface NavItemProps {
  onClick: () => void;
  label: string;
  number: string;
}

interface ServiceCardProps {
  num: string;
  title: string;
  desc: string;
}

interface ProjectSlideProps {
  project: Project;
  onClick: (p: Project) => void;
}

// --- MOCK DATA ---

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Vertex Sky Tower",
    category: "Commercial",
    year: "2024",
    location: "Dubai, UAE",
    client: "Emaar Properties",
    value: "$850M",
    desc: "A 120-story mixed-use skyscraper defining the new downtown skyline. Features a double-skin facade for thermal regulation and an integrated wind turbine system at the spire.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "The Helix Bridge",
    category: "Infrastructure",
    year: "2023",
    location: "Singapore",
    client: "LTA Singapore",
    value: "$120M",
    desc: "A pedestrian bridge modeled after DNA structure, using duplex stainless steel. The double-helix structure provides incredible strength with minimal material usage.",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Nexus Tower HQ",
    category: "Commercial",
    year: "2024",
    location: "New York, USA",
    client: "Nexus Corp",
    value: "$450M",
    desc: "The smartest building in Manhattan. Fully automated climate control, biophilic interior design, and a net-zero carbon footprint.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    title: "Metro Station 9",
    category: "Public Transport",
    year: "2022",
    location: "London, UK",
    client: "TFL",
    value: "$300M",
    desc: "Underground engineering marvel involving deep-tunnel excavation beneath historic structures without causing surface settlement.",
    img: "https://images.unsplash.com/photo-1556695736-d287caebc48e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHVibGljJTIwdHJhbnNwb3J0fGVufDB8fDB8fHww",
  },
  {
    id: 5,
    title: "Eco-Villas",
    category: "Residential",
    year: "2023",
    location: "Bali, Indonesia",
    client: "GreenStay",
    value: "$80M",
    desc: "Luxury sustainable housing built entirely from locally sourced bamboo and recycled concrete, featuring rainwater harvesting systems.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
  },
];

const FOUNDERS: Founder[] = [
  {
    name: "Alexander Quad",
    role: "Principal Architect",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    bio: "With 30 years in structural engineering, Alexander has overseen the construction of 3 of the world's top 10 tallest buildings.",
  },
  {
    name: "Sarah Chen",
    role: "Chief Operations Officer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    bio: "Sarah ensures the logistics of billion-dollar projects run like clockwork, specializing in supply chain resilience.",
  },
];

// --- THEME CONFIGURATION ---
const THEME = {
  navy: "#003057",
  blue: "#005EB8",
  yellow: "#FCE340",
  bg: "#F0F4F1",
  white: "#FFFFFF",
  slate: "#64748B",
  border: "#E2E8F0",
};

const LOGO_COLORS = {
  bar1: "#085f72",
  bar2: "#209f9d",
  bar3: "#22916e",
};

// --- ANIMATION HOOKS ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return [ref, isVisible] as const;
};

// --- UI COMPONENTS ---

const RevealText = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ onClick, label, number }) => (
  <button
    onClick={onClick}
    className="w-full group flex items-center justify-between border-b border-[color:var(--navy)]/10 py-6 md:py-8 hover:pl-8 transition-all duration-500 text-left"
  >
    <span className="text-3xl md:text-5xl font-light text-[color:var(--navy)] group-hover:text-[color:var(--blue)] transition-colors tracking-tight">
      {label}
    </span>
    <span className="text-xs md:text-sm font-mono text-[color:var(--navy)]/40 group-hover:text-[color:var(--navy)] transition-colors">
      ({number})
    </span>
  </button>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ num, title, desc }) => {
  return (
    <div className="group relative border-t border-[color:var(--navy)]/10 py-12 md:py-16 hover:bg-white transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
        <div className="w-12 h-12 rounded-full border border-[color:var(--navy)]/20 flex items-center justify-center text-[color:var(--blue)] font-mono text-sm group-hover:bg-[color:var(--yellow)] group-hover:border-[color:var(--yellow)] group-hover:text-[color:var(--navy)] transition-all duration-500">
          {num}
        </div>
        <div className="flex-1">
          <h3 className="text-3xl md:text-5xl font-light text-[color:var(--navy)] mb-4 md:mb-6 group-hover:translate-x-4 transition-transform duration-500">
            {title}
          </h3>
          <p className="max-w-xl text-slate-600 text-base md:text-lg font-light leading-relaxed opacity-100 md:opacity-0 md:h-0 md:group-hover:opacity-100 md:group-hover:h-auto transition-all duration-500 overflow-hidden">
            {desc}
          </p>
        </div>
        <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform rotate-45 group-hover:rotate-0">
          <ArrowUpRight className="text-[color:var(--blue)] w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

const ProjectSlide: React.FC<ProjectSlideProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="min-w-[85vw] md:min-w-[600px] h-[500px] md:h-[650px] relative group cursor-pointer snap-center overflow-hidden bg-white shadow-sm first:ml-6 md:first:ml-0"
    >
      <div className="w-full h-[80%] md:h-[85%] overflow-hidden relative">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[color:var(--navy)]/0 group-hover:bg-[color:var(--navy)]/10 transition-colors duration-500"></div>
      </div>
      <div className="h-[20%] md:h-[15%] p-6 flex justify-between items-center border-t border-[color:var(--navy)]/5 bg-white relative z-10">
        <div>
          <h3 className="text-xl md:text-2xl text-[color:var(--navy)] font-medium">
            {project.title}
          </h3>
          <p className="text-[color:var(--blue)] font-mono text-xs uppercase tracking-widest mt-1">
            {project.category}
          </p>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[color:var(--bg)] flex items-center justify-center text-[color:var(--navy)] group-hover:bg-[color:var(--yellow)] transition-colors duration-300">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

// --- SUB-PAGES (COMPONENTS) ---

const HomePage = ({
  navigate,
  setProject,
}: {
  navigate: (page: string) => void;
  setProject: (p: Project) => void;
}) => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-start md:items-center pt-32 md:pt-0 md:pb-24 overflow-hidden bg-[color:var(--bg)]">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[color:var(--yellow)]/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[color:var(--blue)]/10 rounded-full blur-[60px] md:blur-[100px] mix-blend-multiply"></div>

        <div className="container mx-auto px-6 relative z-10 md:pt-20 sm:pt-16">
          <div className="max-w-full md:max-w-[90vw]">
            <RevealText className="mb-6">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[color:var(--yellow)] rounded-full border border-[color:var(--navy)]"></div>
                 <span className="text-[color:var(--navy)] font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
                  Global Engineering
                </span> 
              </div>
            </RevealText> 

            <div className="space-y-2 md:space-y-4 mb-12 md:mb-16">
              <RevealText delay={100}>
                <h1 className="text-[14vw] md:text-[8vw] font-bold text-[color:var(--navy)] tracking-tighter leading-[0.9] md:leading-[0.85] mix-blend-darken pb-4">
                  Constructing
                </h1>
              </RevealText>
              <RevealText delay={200}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
                  <h1 className="text-[14vw] md:text-[8vw] font-serif italic font-light text-[color:var(--blue)] tracking-tighter leading-[0.9] md:leading-[0.85]">
                    The Future
                  </h1>
                  <div className="h-[1px] w-24 md:flex-grow bg-[color:var(--navy)]/20 mt-2 md:mt-8"></div>
                </div>
              </RevealText>
            </div>

            <RevealText delay={400}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-t border-[color:var(--navy)]/10 pt-8 md:pt-12">
                <p className="text-[color:var(--navy)] text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
                  QuadFour Infra Pvt Ltd partners with clients to translate financial clarity into buildable engineering solutions across infrastructure and construction projects.
                </p>
                <div className="flex gap-6 w-full md:w-auto">
                  <button
                    onClick={() => navigate("contact")}
                    className="w-full md:w-auto group relative px-8 py-4 overflow-hidden rounded-full bg-[color:var(--navy)] text-white font-bold text-sm uppercase tracking-widest transition-all md:hover:pr-12 flex justify-center md:justify-start items-center"
                  >
                    <span className="relative z-10">Start Project</span>
                    <span className="static md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-[color:var(--yellow)] ml-2 md:ml-0">
                      <ArrowRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 md:py-20 border-y border-[color:var(--navy)]/5 overflow-hidden bg-white">
        <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="text-5xl md:text-8xl font-bold text-transparent stroke-navy opacity-20">
                PRECISION
              </span>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-[color:var(--yellow)] rounded-full self-center"></div>
              <span className="text-5xl md:text-8xl font-serif italic text-[color:var(--navy)]">
                SCALE
              </span>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-[color:var(--yellow)] rounded-full self-center"></div>
              <span className="text-5xl md:text-8xl font-bold text-transparent stroke-navy opacity-20">
                IMPACT
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* INTRODUCTION GRID */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 md:mb-24">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-7xl text-[color:var(--navy)] font-light leading-[1.1] tracking-tight">
                We are the{" "}
                <span className="text-[color:var(--blue)] font-serif italic">
                  architects
                </span>{" "}
                of <br />
                modern civilization.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                From the deepest foundations to the highest spires, QuadFour
                Infra Pvt Ltd brings unmatched precision. We don't just build;
                we define skylines.
              </p>
              <a
                href="#"
                onClick={() => navigate("contact")}
                className="inline-flex items-center gap-4 text-[color:var(--navy)] font-bold border-b border-[color:var(--navy)] pb-1 hover:gap-8 transition-all w-max"
              >
                Read Our Story <MoveRight size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[color:var(--navy)]/5 min-h-[300px] md:min-h-[400px] flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[color:var(--bg)] rounded-full flex items-center justify-center mb-8 group-hover:bg-[color:var(--yellow)] transition-colors">
                <ArrowUpRight size={24} className="text-[color:var(--navy)]" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[color:var(--navy)] mb-2 md:mb-4">
                  25+ Years
                </h3>
                <p className="text-slate-500 text-sm md:text-base">
                  Of defining global infrastructure standards.
                </p>
              </div>
            </div>
            <div className="bg-[color:var(--navy)] p-8 md:p-12 rounded-3xl shadow-sm min-h-[300px] md:min-h-[400px] flex flex-col justify-between text-white group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[color:var(--blue)] rounded-full blur-[60px] md:blur-[80px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Quote className="text-[color:var(--yellow)] w-10 h-10 md:w-12 md:h-12 relative z-10" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
                  "They don't build structures; they build legacies."
                </p>
                <p className="font-mono text-sm text-[color:var(--yellow)]">
                  James Sterling, CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-20 border-t border-[color:var(--navy)]/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12 md:mb-16">
            <h3 className="text-[color:var(--navy)] text-3xl font-light">
              The Visionaries
            </h3>
            <button className="hidden md:block text-[color:var(--blue)] font-bold hover:underline">
              Meet the full team
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {FOUNDERS.map((founder, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-6 items-start group cursor-pointer"
              >
                <div className="w-full md:w-32 h-64 md:h-40 overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={founder.img}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    alt={founder.name}
                  />
                </div>
                <div>
                  <h4 className="text-2xl text-[color:var(--navy)] font-bold group-hover:text-[color:var(--blue)] transition-colors">
                    {founder.name}
                  </h4>
                  <p className="text-sm font-mono text-slate-500 mb-3 uppercase tracking-wider">
                    {founder.role}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 mb-12 md:mb-20">
          <h2 className="text-5xl md:text-8xl text-[color:var(--navy)] font-bold mb-8 opacity-5 md:opacity-10 select-none absolute top-10 left-0 w-full text-center pointer-events-none">
            CAPABILITIES
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-end relative z-10 pt-8 md:pt-12">
            <h2 className="text-3xl md:text-6xl text-[color:var(--navy)] font-light mb-4 md:mb-0">
              What We Do
            </h2>
            <p className="text-slate-500 max-w-md text-left md:text-right">
              End-to-end engineering solutions for the most demanding
              environments.
            </p>
          </div>
        </div>

        <div>
          <ServiceCard
            num="01"
            title="General Contracting"
            desc="Managing complex supply chains and large-scale labor forces to deliver skyscrapers and stadiums on time."
          />
          <ServiceCard
            num="02"
            title="Civil Infrastructure"
            desc="Roads, bridges, dams, and tunnels. We move the earth to connect people and commerce."
          />
          <ServiceCard
            num="03"
            title="Sustainable Energy"
            desc="Solar farms, wind turbines, and hydroelectric plants. Building the power grid of tomorrow."
          />
          <ServiceCard
            num="04"
            title="Industrial Engineering"
            desc="Factories, warehouses, and logistics hubs optimized for automation and high throughput."
          />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 md:py-32 bg-[color:var(--bg)] overflow-hidden">
        <div className="container mx-auto px-6 mb-12 md:mb-16 flex justify-between items-end">
          <div>
            <p className="text-[color:var(--blue)] font-mono text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4">
              Selected Works
            </p>
            <h2 className="text-3xl md:text-6xl text-[color:var(--navy)] font-light">
              Recent Landmarks
            </h2>
          </div>
          <div className="flex gap-4 hidden md:flex">
            <button className="w-14 h-14 rounded-full border border-[color:var(--navy)]/20 flex items-center justify-center hover:bg-[color:var(--navy)] hover:text-white transition-all">
              <ArrowRight className="rotate-180" />
            </button>
            <button className="w-14 h-14 rounded-full border border-[color:var(--navy)]/20 flex items-center justify-center hover:bg-[color:var(--navy)] hover:text-white transition-all">
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-8 px-6 pb-12 snap-x snap-mandatory no-scrollbar pl-6 md:pl-[max(24px,calc((100vw-1280px)/2))]">
          {PROJECTS_DATA.map((p) => (
            <ProjectSlide
              key={p.id}
              project={p}
              onClick={(p) => {
                setProject(p);
                navigate("project_detail");
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

const ProjectsPage = ({
  navigate,
  setProject,
}: {
  navigate: (page: string) => void;
  setProject: (p: Project) => void;
}) => {
  return (
    <div className="pt-24 md:pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="mb-16 md:mb-24 border-b border-[color:var(--navy)]/10 pb-12">
        <h1 className="text-5xl md:text-8xl text-[color:var(--navy)] font-bold tracking-tighter mb-8">
          Our Portfolio
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl">
            A curated selection of our most ambitious engineering feats from
            around the globe.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {["All", "Commercial", "Infrastructure", "Residential"].map(
              (cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-full border border-[color:var(--navy)]/20 text-[color:var(--navy)] hover:bg-[color:var(--navy)] hover:text-white transition-colors text-sm"
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
        {PROJECTS_DATA.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setProject(p);
              navigate("project_detail");
            }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden mb-6 md:mb-8 rounded-sm bg-slate-200 relative">
              <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[color:var(--navy)] z-10">
                {p.category}
              </div>
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="flex justify-between items-end border-b border-[color:var(--navy)]/10 pb-6 group-hover:border-[color:var(--blue)] transition-colors">
              <div>
                <h3 className="text-2xl md:text-4xl text-[color:var(--navy)] font-light mb-2 group-hover:text-[color:var(--blue)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-500 font-mono text-sm">{p.location}</p>
              </div>
              <span className="text-[color:var(--navy)] font-mono text-sm">
                {p.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectDetailPage = ({
  project,
  navigate,
}: {
  project: Project | null;
  navigate: (page: string) => void;
}) => {
  if (!project) return null;

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 mb-12">
        <button
          onClick={() => navigate("projects")}
          className="text-slate-500 hover:text-[color:var(--navy)] flex items-center gap-2 mb-8 md:mb-12 font-medium transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="lg:col-span-8">
            <h1 className="text-4xl md:text-8xl text-[color:var(--navy)] font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-[color:var(--blue)] text-xl md:text-2xl font-light max-w-2xl">
              {project.desc}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 text-sm uppercase tracking-widest">
                Client
              </span>
              <span className="text-[color:var(--navy)] font-medium">
                {project.client}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 text-sm uppercase tracking-widest">
                Location
              </span>
              <span className="text-[color:var(--navy)] font-medium">
                {project.location}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 text-sm uppercase tracking-widest">
                Value
              </span>
              <span className="text-[color:var(--navy)] font-medium">
                {project.value}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500 text-sm uppercase tracking-widest">
                Year
              </span>
              <span className="text-[color:var(--navy)] font-medium">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[50vh] md:h-[70vh] mb-16 md:mb-24 parallax-container overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl">
        <h3 className="text-2xl md:text-3xl text-[color:var(--navy)] font-bold mb-6 md:mb-8 leading-snug">
          Engineering Challenge
        </h3>
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12 font-light">
          The challenge was not just physical, but environmental. By utilizing
          advanced modeling software, we were able to predict wind loads and
          thermal stresses with 99.9% accuracy, resulting in a structure that is
          as efficient as it is beautiful. The structural integrity relies on a
          core-outrigger system that minimizes material usage while maximizing
          floor space.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="h-64 md:h-80 bg-slate-100 rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
            />
          </div>
          <div className="h-64 md:h-80 bg-slate-100 rounded-sm overflow-hidden mt-0 md:mt-16">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 container mx-auto px-6 min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-5">
          <p className="text-[color:var(--blue)] font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[color:var(--blue)] rounded-full"></span>{" "}
            Contact Us
          </p>
          <h1 className="text-5xl md:text-7xl text-[color:var(--navy)] font-bold mb-8 md:mb-12 tracking-tight">
            Let's build something iconic.
          </h1>

          <div className="space-y-8 md:space-y-10">
            <div className="group">
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">
                Call Us
              </p>
              <p className="text-xl md:text-2xl text-[color:var(--navy)] group-hover:text-[color:var(--blue)] transition-colors cursor-pointer">
                +1 (555) 091-2345
              </p>
            </div>
            <div className="group">
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">
                Email Us
              </p>
              <p className="text-xl md:text-2xl text-[color:var(--navy)] group-hover:text-[color:var(--blue)] transition-colors cursor-pointer">
                hello@quadfourinfra.com
              </p>
            </div>
            <div className="group">
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">
                Visit Us
              </p>
              <p className="text-xl md:text-2xl text-[color:var(--navy)]">
                101 Innovation Blvd
                <br />
                New York, NY 10011
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[color:var(--navy)]/5 rounded-3xl shadow-2xl">
          <form
            className="space-y-8 md:space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 group">
                <label className="text-xs text-[color:var(--navy)] font-bold uppercase tracking-widest group-focus-within:text-[color:var(--blue)] transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[color:var(--navy)]/20 py-4 text-[color:var(--navy)] text-lg focus:border-[color:var(--blue)] outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-4 group">
                <label className="text-xs text-[color:var(--navy)] font-bold uppercase tracking-widest group-focus-within:text-[color:var(--blue)] transition-colors">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[color:var(--navy)]/20 py-4 text-[color:var(--navy)] text-lg focus:border-[color:var(--blue)] outline-none transition-colors"
                  placeholder="Organization Inc."
                />
              </div>
            </div>
            <div className="space-y-4 group">
              <label className="text-xs text-[color:var(--navy)] font-bold uppercase tracking-widest group-focus-within:text-[color:var(--blue)] transition-colors">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-[color:var(--navy)]/20 py-4 text-[color:var(--navy)] text-lg focus:border-[color:var(--blue)] outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-4 group">
              <label className="text-xs text-[color:var(--navy)] font-bold uppercase tracking-widest group-focus-within:text-[color:var(--blue)] transition-colors">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-[color:var(--navy)]/20 py-4 text-[color:var(--navy)] text-lg focus:border-[color:var(--blue)] outline-none transition-colors"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button className="w-full bg-[color:var(--navy)] text-white py-6 font-bold uppercase tracking-widest hover:bg-[color:var(--blue)] transition-colors rounded-full mt-4 flex items-center justify-center gap-2 group">
              Send Inquiry{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ENTRY ---

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const style = {
    "--navy": THEME.navy,
    "--blue": THEME.blue,
    "--yellow": THEME.yellow,
    "--bg": THEME.bg,
    "--white": THEME.white,
    "--logo-bar1": LOGO_COLORS.bar1,
    "--logo-bar2": LOGO_COLORS.bar2,
    "--logo-bar3": LOGO_COLORS.bar3,
  } as React.CSSProperties;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page: string) => {
    setView(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={style}
      className="bg-[color:var(--bg)] min-h-[100svh] font-sans selection:bg-[color:var(--yellow)] selection:text-[color:var(--navy)] overflow-x-hidden text-[color:var(--navy)]"
    >
      {/* --- HEADER --- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || menuOpen
          ? "bg-[color:var(--bg)]/90 backdrop-blur-md py-4 border-b border-[color:var(--navy)]/10"
          : "bg-transparent py-8"
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            onClick={() => navigate("home")}
            className="flex items-center gap-3 z-50 relative cursor-pointer"
          >
            {/* Logo */}
            <div className="flex gap-1 h-8 items-end">
              <div className="w-2 h-[60%] bg-[color:var(--logo-bar1)]"></div>
              <div className="w-2 h-[80%] bg-[color:var(--logo-bar2)]"></div>
              <div className="w-2 h-full bg-[color:var(--logo-bar3)]"></div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold tracking-tighter text-[color:var(--navy)] leading-none">
                QUADFOUR
              </span>
              <span className="text-xs font-medium tracking-widest text-[color:var(--blue)] leading-none">
                INFRA PVT LTD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("contact")}
              className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[color:var(--navy)] hover:text-[color:var(--blue)] transition-colors group relative z-50"
            >
              Start Project
              <span className="block w-8 h-[1px] bg-[color:var(--navy)]/30 group-hover:w-12 group-hover:bg-[color:var(--blue)] transition-all"></span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="z-50 relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[color:var(--navy)] hover:bg-[color:var(--blue)] text-white transition-colors"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* --- FULL SCREEN MENU --- */}
      <div
        className={`fixed inset-0 bg-[color:var(--bg)] z-40 flex items-center justify-center transition-all duration-700 ${menuOpen
          ? "opacity-100 visible clip-circle-in"
          : "opacity-0 invisible clip-circle-out pointer-events-none"
          }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-20 md:pt-0">
          <div className="hidden md:block">
            <p className="text-[color:var(--navy)]/40 text-sm font-mono mb-8 uppercase tracking-widest">
              Featured Work
            </p>
            <div
              className="aspect-video bg-slate-200 overflow-hidden relative group cursor-pointer rounded-sm"
              onClick={() => {
                setSelectedProject(PROJECTS_DATA[0]);
                navigate("project_detail");
              }}
            >
              <img
                src={PROJECTS_DATA[0].img}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Menu Feature"
              />
              <div className="absolute bottom-0 left-0 bg-white p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-[color:var(--navy)] text-2xl font-bold">
                  {PROJECTS_DATA[0].title}
                </h4>
                <p className="text-[color:var(--blue)] text-sm font-mono">
                  {PROJECTS_DATA[0].category}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center pl-0 md:pl-20">
            <NavItem
              onClick={() => navigate("home")}
              label="Home"
              number="01"
            />
            <NavItem
              onClick={() => navigate("projects")}
              label="Portfolio"
              number="02"
            />
            <NavItem
              onClick={() => navigate("contact")}
              label="Contact"
              number="03"
            />

            <div className="mt-12 md:mt-16 flex gap-8 text-[color:var(--navy)]">
              <Instagram
                className="hover:text-[color:var(--blue)] cursor-pointer transition-colors"
                size={24}
              />
              <Linkedin
                className="hover:text-[color:var(--blue)] cursor-pointer transition-colors"
                size={24}
              />
              <Twitter
                className="hover:text-[color:var(--blue)] cursor-pointer transition-colors"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- VIEW CONTENT --- */}
      <main className="min-h-[100svh] pt-0">
        {view === "home" && (
          <HomePage navigate={navigate} setProject={setSelectedProject} />
        )}
        {view === "projects" && (
          <ProjectsPage navigate={navigate} setProject={setSelectedProject} />
        )}
        {view === "project_detail" && (
          <ProjectDetailPage project={selectedProject} navigate={navigate} />
        )}
        {view === "contact" && <ContactPage />}
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative bg-[color:var(--navy)] pt-20 md:pt-32 pb-12 overflow-hidden text-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 md:mb-24">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl text-white font-bold tracking-tighter mb-8 leading-[0.9] md:leading-[0.85]">
                Let's Build <br />
                <span className="text-[color:var(--blue)] font-serif italic">
                  Legacy.
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <a
                href="mailto:hello@quadfourinfra.com"
                className="text-2xl md:text-3xl hover:text-[color:var(--yellow)] transition-colors border-b border-white/20 pb-2"
              >
                hello@quadfourinfra.com
              </a>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[color:var(--navy)] transition-all cursor-pointer">
                  <Linkedin size={20} />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[color:var(--navy)] transition-all cursor-pointer">
                  <Instagram size={20} />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[color:var(--navy)] transition-all cursor-pointer">
                  <Twitter size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 md:mb-32 pt-12 border-t border-white/10">
            <div className="space-y-8">
              {/* Footer Logo */}
              <div className="flex gap-1 h-8 items-end">
                <div className="w-2 h-[60%] bg-[color:var(--logo-bar1)]"></div>
                <div className="w-2 h-[80%] bg-[color:var(--logo-bar2)]"></div>
                <div className="w-2 h-full bg-[color:var(--logo-bar3)]"></div>
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-none mb-1">
                  QUADFOUR
                </p>
                <p className="font-medium text-[color:var(--blue)] text-xs tracking-widest leading-none">
                  INFRA PVT LTD
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-[color:var(--yellow)] font-mono text-xs uppercase tracking-widest mb-6">
                Sitemap
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <button
                    onClick={() => navigate("home")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("projects")}
                    className="hover:text-white transition-colors"
                  >
                    Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[color:var(--yellow)] font-mono text-xs uppercase tracking-widest mb-6">
                Services
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>Strategy</li>
                <li>Engineering</li>
                <li>Construction</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[color:var(--yellow)] font-mono text-xs uppercase tracking-widest mb-6">
                Office
              </h4>
              <address className="text-sm text-white/60 not-italic">
                101 Innovation Blvd
                <br />
                New York, NY 10011
                <br />
                United States
              </address>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end relative z-10">
            <h1 className="text-[12vw] md:text-[10vw] font-bold text-white/5 tracking-tighter leading-none select-none -mb-4 md:-mb-6">
              QUADFOUR
            </h1>
            <div className="flex gap-8 text-xs font-mono uppercase text-white/40 mb-4">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <span>© 2024</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        .stroke-text-navy {
          -webkit-text-stroke: 1px rgba(0, 48, 87, 0.3);
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .clip-circle-in {
          clip-path: circle(150% at 100% 0);
        }
        .clip-circle-out {
          clip-path: circle(0% at 100% 0);
        }
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
}
