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
  Quote,
  ArrowUp,
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
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
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
    img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ce2fe3?auto=format&fit=crop&q=80&w=1000",
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

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Quad Infra didn't just build a facility; they engineered a legacy. Their attention to structural integrity is unmatched.",
    author: "James Sterling",
    company: "CEO, Sterling Group",
  },
  {
    quote:
      "The most professional team we've worked with in 20 years of development. On time, under budget, and breathtaking results.",
    author: "Elena Rodriguez",
    company: "Director, Urban Future",
  },
];

// --- BRAND COLORS ---
const THEME = {
  navy: "#206E7D",
  darkNavy: "#0F2529",
  teal: "#2B9E9F",
  green: "#35B37D",
  white: "#FFFFFF",
};

// --- HELPER HOOKS ---
const useScrollReveal = (): [
  React.RefObject<HTMLDivElement | null>,
  boolean
] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [ref, isVisible];
};

// --- COMPONENTS ---

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, isVisible] = useScrollReveal();
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

interface NavItemProps {
  onClick: () => void;
  label: string;
  number: string;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, label, number }) => (
  <button
    onClick={onClick}
    className="w-full group flex items-center justify-between border-b border-white/10 py-6 hover:pl-4 transition-all duration-300 text-left"
  >
    <span className="text-3xl font-light text-white group-hover:text-[color:var(--teal)] transition-colors">
      {label}
    </span>
    <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">
      ({number})
    </span>
  </button>
);

interface ServiceCardProps {
  num: string;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ num, title, desc }) => {
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

interface ProjectSlideProps {
  project: Project;
  onClick: (p: Project) => void;
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({ project, onClick }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="min-w-[85vw] md:min-w-[600px] h-[600px] relative group cursor-pointer snap-center"
    >
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        {/* Note: Using standard img for simplicity. In Next.js, prefer next/image if domains are configured */}
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--darkNavy)] to-transparent opacity-80"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-10 w-full z-10">
        <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-6">
          <div>
            <p className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-2">
              {project.category}
            </p>
            <h3 className="text-4xl md:text-5xl font-light text-white">
              {project.title}
            </h3>
          </div>
          <p className="text-white/40 font-mono text-sm">{project.year}</p>
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

// --- PAGES ---

interface PageProps {
  navigate: (page: string) => void;
  setProject: (p: Project) => void;
}

const HomePage: React.FC<PageProps> = ({ navigate, setProject }) => {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20">
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
                <button
                  onClick={() => navigate("projects")}
                  className="whitespace-nowrap bg-white text-[color:var(--darkNavy)] px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-[color:var(--teal)] hover:text-white transition-colors duration-300"
                >
                  View Our Legacy
                </button>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* STATS MARQUEE */}
      <section className="py-20 border-y border-white/5 overflow-hidden bg-black/20">
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

      {/* ABOUT & FOUNDERS */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-32">
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
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                From the deepest foundations to the highest spires, Quad Infra
                brings a level of precision that is unmatched in the industry.
              </p>
              <button
                onClick={() => navigate("contact")}
                className="inline-flex items-center gap-4 text-white border-b border-[color:var(--teal)] pb-2 hover:gap-6 transition-all"
              >
                Get in Touch <MoveRight className="text-[color:var(--teal)]" />
              </button>
            </div>
          </div>

          {/* FOUNDERS SECTION */}
          <div className="border-t border-white/10 pt-20">
            <p className="text-[color:var(--teal)] font-mono text-sm tracking-widest uppercase mb-12">
              The Visionaries
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {FOUNDERS.map((founder, idx) => (
                <div key={idx} className="group relative">
                  <div className="aspect-[4/5] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl text-white font-light">
                    {founder.name}
                  </h3>
                  <p className="text-[color:var(--teal)] text-sm font-mono mb-4">
                    {founder.role}
                  </p>
                  <p className="text-slate-400 leading-relaxed max-w-md">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 bg-black/20">
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
            desc="Managing complex supply chains and large-scale labor forces to deliver skyscrapers and stadiums on time."
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

      {/* PROJECTS HORIZONTAL */}
      <section className="py-20 overflow-hidden">
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
            <button
              onClick={() => navigate("projects")}
              className="px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-widest"
            >
              View All
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-8 px-6 pb-12 snap-x snap-mandatory no-scrollbar">
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

      {/* TESTIMONIALS */}
      <section className="py-32 bg-[color:var(--darkNavy)] relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="relative p-10 border border-white/5 bg-white/[0.02]"
              >
                <Quote className="text-[color:var(--teal)] w-12 h-12 mb-8 opacity-50" />
                <p className="text-2xl text-white font-light leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-white font-bold">{t.author}</p>
                  <p className="text-slate-500 text-sm">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ProjectsPage: React.FC<PageProps> = ({ navigate, setProject }) => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <h1 className="text-5xl md:text-7xl text-white font-light mb-6">
        Our Portfolio
      </h1>
      <p className="text-slate-400 text-xl max-w-2xl mb-20">
        A curated selection of our most ambitious engineering feats from around
        the globe.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
        {PROJECTS_DATA.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setProject(p);
              navigate("project_detail");
            }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden mb-6 bg-slate-800">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-2">
                  {p.category}
                </p>
                <h3 className="text-3xl text-white font-light group-hover:text-[color:var(--teal)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-500 mt-2">{p.location}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProjectDetailProps {
  project: Project | null;
  navigate: (page: string) => void;
}

const ProjectDetailPage: React.FC<ProjectDetailProps> = ({
  project,
  navigate,
}) => {
  if (!project) return null;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 mb-12">
        <button
          onClick={() => navigate("projects")}
          className="text-slate-500 hover:text-white flex items-center gap-2 mb-8"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Projects
        </button>
        <h1 className="text-5xl md:text-8xl text-white font-light mb-6">
          {project.title}
        </h1>
        <p className="text-[color:var(--teal)] text-xl font-mono">
          {project.category} — {project.year}
        </p>
      </div>

      <div className="w-full h-[60vh] md:h-[80vh] mb-20">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-8">
          <div className="border-t border-white/10 pt-4">
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
              Client
            </p>
            <p className="text-white text-xl">{project.client}</p>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
              Location
            </p>
            <p className="text-white text-xl">{project.location}</p>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
              Value
            </p>
            <p className="text-white text-xl">{project.value}</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h3 className="text-3xl text-white font-light mb-8 leading-snug">
            Project Overview
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            {project.desc}
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            The challenge was not just physical, but environmental. By utilizing
            advanced modeling software, we were able to predict wind loads and
            thermal stresses with 99.9% accuracy, resulting in a structure that
            is as efficient as it is beautiful.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-slate-800"></div>
            <div className="h-64 bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <p className="text-[color:var(--teal)] font-mono text-sm tracking-widest uppercase mb-4">
            Contact Us
          </p>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-8">
            Let's start a conversation.
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-12">
            Whether you have a visionary project in mind or need expert
            consultation on infrastructure challenges, our global team is ready.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[color:var(--teal)] shrink-0">
                <Phone />
              </div>
              <div>
                <p className="text-white text-lg">+1 (555) 091-2345</p>
                <p className="text-slate-500">Mon-Fri, 9am - 6pm EST</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[color:var(--teal)] shrink-0">
                <Mail />
              </div>
              <div>
                <p className="text-white text-lg">hello@quadinfra.com</p>
                <p className="text-slate-500">Online Support 24/7</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[color:var(--teal)] shrink-0">
                <MapPin />
              </div>
              <div>
                <p className="text-white text-lg">101 Innovation Blvd</p>
                <p className="text-slate-500">New York, NY 10011</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] p-10 border border-white/10">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[color:var(--teal)] uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[color:var(--teal)] outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[color:var(--teal)] uppercase tracking-widest">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[color:var(--teal)] outline-none transition-colors"
                  placeholder="Organization Inc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[color:var(--teal)] uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[color:var(--teal)] outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[color:var(--teal)] uppercase tracking-widest">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-[color:var(--teal)] outline-none transition-colors"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button className="w-full bg-white text-[color:var(--darkNavy)] py-4 font-bold uppercase tracking-widest hover:bg-[color:var(--teal)] hover:text-white transition-colors">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP SHELL ---

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<string>("home"); // 'home', 'projects', 'project_detail', 'contact'
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  // Navigation Helper
  const navigate = (page: string) => {
    setView(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={style}
      className="bg-[color:var(--darkNavy)] min-h-screen font-sans selection:bg-[color:var(--teal)] selection:text-white overflow-x-hidden"
    >
      {/* --- HEADER --- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[color:var(--darkNavy)]/90 backdrop-blur-md py-4 border-b border-white/10"
            : "bg-transparent py-8"
        } text-white`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            onClick={() => navigate("home")}
            className="flex items-center gap-3 z-50 relative cursor-pointer"
          >
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
            <button
              onClick={() => navigate("contact")}
              className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[color:var(--teal)] transition-colors group"
            >
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
            <div
              className="aspect-video bg-slate-800 overflow-hidden relative group cursor-pointer"
              onClick={() => {
                setSelectedProject(PROJECTS_DATA[0]);
                navigate("project_detail");
              }}
            >
              <img
                src={PROJECTS_DATA[0].img}
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                alt="Menu Feature"
              />
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-xl">{PROJECTS_DATA[0].title}</h4>
                <p className="text-[color:var(--teal)] text-sm">
                  Construction / 2024
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
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

            <div className="mt-12 flex gap-6 text-white/40">
              <Instagram className="hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="hover:text-white cursor-pointer transition-colors" />
              <Twitter className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* --- VIEW CONTENT --- */}
      <main className="min-h-screen">
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
      <footer className="relative bg-black pt-32 pb-12 overflow-hidden border-t border-white/10">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--navy)_0%,_transparent_40%)] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Top Row: CTA & Newsletter */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24 border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-6 leading-[0.9]">
                Building the{" "}
                <span className="text-[color:var(--teal)] font-serif italic">
                  Unimaginable.
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Join our newsletter for exclusive updates on global
                infrastructure.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form
                className="flex w-full md:w-[400px] border-b border-white/30 focus-within:border-[color:var(--teal)] transition-colors pb-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent w-full text-white placeholder-white/30 outline-none text-lg"
                />
                <button className="text-white hover:text-[color:var(--teal)] transition-colors uppercase text-xs font-bold tracking-[0.2em] ml-4">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Middle Row: Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-40">
            {/* Col 1: Brand */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 h-5">
                  <div className="w-1 h-full bg-[color:var(--navy)]"></div>
                  <div className="w-1 h-full bg-[color:var(--teal)]"></div>
                  <div className="w-1 h-full bg-[color:var(--green)]"></div>
                </div>
                <span className="text-xl font-bold text-white tracking-tighter">
                  QUAD<span className="font-light text-white/60">INFRA</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Global Headquarters
                <br />
                101 Innovation Blvd
                <br />
                New York, NY 10011
              </p>
            </div>

            {/* Col 2: Sitemaps */}
            <div>
              <h4 className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-8">
                Sitemap
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
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
                    onClick={() => navigate("home")}
                    className="hover:text-white transition-colors"
                  >
                    About Agency
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("projects")}
                    className="hover:text-white transition-colors"
                  >
                    Selected Works
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

            {/* Col 3: Socials */}
            <div>
              <h4 className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-8">
                Social
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    LinkedIn <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    Instagram <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    Twitter <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div>
              <h4 className="text-[color:var(--teal)] font-mono text-xs uppercase tracking-widest mb-8">
                Legal
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Massive Background Text */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] leading-none select-none">
            <h1 className="text-[18vw] font-bold text-white tracking-tighter text-center whitespace-nowrap translate-y-[20%]">
              QUAD INFRA
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 pt-8 border-t border-white/5">
            <p className="text-white/30 text-xs font-mono mb-4 md:mb-0">
              © 2024 QUAD INFRA INC. ALL RIGHTS RESERVED.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-white text-xs font-mono uppercase tracking-widest hover:text-[color:var(--teal)] transition-colors group"
            >
              Back to Top{" "}
              <span className="group-hover:-translate-y-1 transition-transform">
                <ArrowUp size={14} />
              </span>
            </button>
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
        /* Hide scrollbar */
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
