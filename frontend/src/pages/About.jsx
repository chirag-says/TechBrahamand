import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  Users, Target, ArrowRight, CheckCircle2, Globe, Code2, Wrench,
  LineChart, X, Lightbulb, LayoutTemplate, FileText, Rocket,
  TrendingUp, Zap, Building2, Layers, UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";
import JourneyRoadmap from "../components/JourneyRoadmap";

const E = [0.22, 1, 0.36, 1];
const fUp = (d = 0) => ({ initial:{opacity:0,y:28}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:"-60px"}, transition:{duration:0.7,ease:E,delay:d} });
const fIn = (d = 0) => ({ initial:{opacity:0}, animate:{opacity:1}, transition:{duration:0.6,ease:E,delay:d} });

/* ── Count-up ── */
function useCountUp(raw, dur = 1.4) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    const suf = raw.replace(/[0-9.]/g, "");
    let s = 0, step = num / (dur * 60);
    const t = setInterval(() => {
      s += step;
      if (s >= num) { setVal(raw); clearInterval(t); }
      else setVal(Math.floor(s) + suf);
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [inView, raw, dur]);
  return { val, ref };
}

/* ── Data ── */
const team = [
  { id:1, name:"Abhik Dhar",  role:"Founder & CEO",                image:"/Abhik Dhar.png",  badge:"Founder",     isBoss:true,  photoPosition:"center top",
    bio:"Abhik founded TechBrahmand with the vision of making world-class digital services accessible to every business. He drives strategy, partnerships, and the company's long-term direction." },
  { id:2, name:"Raja Deb",    role:"Co-Founder",                   image:"/Raja Sab.png",    badge:"Leadership",  isBoss:false, photoPosition:"center top",
    bio:"Raja co-founded TechBrahmand and oversees operations and client relationships, ensuring every project is delivered with excellence and on time." },
  { id:3, name:"Chirag",      role:"Full Stack Developer Intern",  image:"/Chirag.jpg",      badge:"Engineering", isBoss:false, photoPosition:"center 30%", photoZoom: 1.9,
    bio:"Chirag is a full stack developer intern at TechBrahmand, contributing to web applications using React and Node.js, and passionate about building clean, scalable products." },
  { id:4, name:"Abhitha E",   role:"Full Stack Developer Intern",  image:"/Abhitha E.jpg",   badge:"Engineering", isBoss:false, photoPosition:"center 20%",
    bio:"Abhitha is a full stack developer intern at TechBrahmand, working across the frontend and backend to deliver premium user experiences and robust APIs." },
];

const services = [
  { icon:Code2,     title:"Build",      desc:"Websites, web apps, SaaS platforms, and complete branding packages built from scratch." },
  { icon:Wrench,    title:"Maintain",   desc:"Bug fixes, hosting, SEO, performance monitoring, and security — so it never skips a beat." },
  { icon:LineChart, title:"Strategise", desc:"SEO audits, UI/UX teardowns, market positioning, and ad strategies for a decisive edge." },
];

const clients     = ["Startups", "Small & Medium Businesses", "Enterprises", "Entrepreneurs"];
const clientIcons = [Zap, Building2, Layers, UserCheck];

const principles = [
  { title:"No templates", desc:"We start every project from zero, tailored to your brand, your audience, and your goals." },
  { title:"Transparent pricing", desc:"Every rupee is accounted for. No surprises, no hidden fees — just clarity." },
  { title:"Your growth is our metric", desc:"We measure our performance by your results. Your wins are our wins." },
];

const compareRows = [
  { feat:"Consultation",  old:"Multiple meetings required",            neo:"AI consultation in minutes"         },
  { feat:"Quotation",     old:"Generic, vague estimates",              neo:"Transparent, itemised pricing"      },
  { feat:"Cost clarity",  old:"Hidden costs revealed late",            neo:"Every rupee is accounted for"       },
  { feat:"Tech stack",    old:"Decided internally, no client input",   neo:"You customise every technology"     },
  { feat:"Planning",      old:"Weeks of back-and-forth planning",      neo:"Instant architecture in one session"},
];

const flowSteps = [
  { num:"01", icon:Lightbulb,     color:"#F59E0B", bg:"rgba(245,158,11,0.1)",  title:"Idea",         desc:"You share your vision. We listen, ask smart questions, and understand your goals, audience, and constraints." },
  { num:"02", icon:LayoutTemplate,color:"oklch(42% 0.18 195)", bg:"oklch(42% 0.18 195 / 0.1)",  title:"Architecture", desc:"We design the technical blueprint — stack, structure, integrations — before a single line of code is written." },
  { num:"03", icon:FileText,      color:"#3B82F6", bg:"rgba(59,130,246,0.1)",  title:"Quotation",    desc:"Transparent, itemised pricing with timeline milestones. No hidden charges, no vague estimates." },
  { num:"04", icon:Code2,         color:"#10B981", bg:"rgba(16,185,129,0.1)",  title:"Development",  desc:"Agile sprints with weekly updates. You see real progress — not promises — at every stage." },
  { num:"05", icon:Rocket,        color:"#F97316", bg:"rgba(249,115,22,0.1)",  title:"Deployment",   desc:"We handle hosting, CI/CD, domain, SSL, and go-live — so you launch confidently, not nervously." },
  { num:"06", icon:TrendingUp,    color:"#EC4899", bg:"rgba(236,72,153,0.1)",  title:"Growth",       desc:"Post-launch SEO, performance tracking, A/B testing, and ongoing support to keep you scaling." },
];

/* ── Stat item ── */
function StatItem({ target, label }) {
  const { val, ref } = useCountUp(target);
  return (
    <div className="ab-hero-stat" ref={ref}>
      <span className="ab-hero-stat__num">{val}</span>
      <span className="ab-hero-stat__label">{label}</span>
    </div>
  );
}

/* ── TeamCard — 3D tilt + cursor glow + spinning gradient border ── */
function TeamCard({ person, index, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const inViewRef = useRef(null);
  const inView = useInView(inViewRef, { once: true, margin: "-50px" });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    setTilt({ x: ((y - cy) / cy) * -7, y: ((x - cx) / cx) * 7 });
    setGlow({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setGlow({ x: 50, y: 50 }); setHovered(false); };

  return (
    <motion.div
      ref={(el) => { cardRef.current = el; inViewRef.current = el; }}
      className={`ab-tcard${hovered ? " ab-tcard--hovered" : ""}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 8 : 0}px)`,
        transition: hovered ? "transform 0.08s linear" : "transform 0.55s cubic-bezier(.22,1,.36,1)",
        "--gx": `${glow.x}%`,
        "--gy": `${glow.y}%`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: E, delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={() => onOpen(person)}
    >
      {/* Spinning gradient border */}
      <div className="ab-tcard__spin-border" />

      {/* Cursor glow */}
      <div className="ab-tcard__cursor-glow" />

      {/* Photo */}
      <div className="ab-tcard__photo-wrap">
        <img src={person.image} alt={person.name} className="ab-tcard__photo" loading="lazy"
             style={{ objectPosition: person.photoPosition || "center center", transform: person.photoZoom ? `scale(${person.photoZoom})` : undefined, transformOrigin: person.photoPosition || "center center" }} />

        {/* Shine sweep on hover */}
        <div className="ab-tcard__shine" />

        {/* Overlay: slides up */}
        <div className="ab-tcard__overlay">
          <div className="ab-tcard__overlay-content">
            <span className="ab-tcard__view-pill">View Profile ↗</span>
          </div>
        </div>

        {person.isBoss && <span className="ab-tcard__founder">Founder</span>}
      </div>

      {/* Info */}
      <div className="ab-tcard__info">
        <span className="ab-tcard__badge">{person.badge}</span>
        <p className="ab-tcard__name">{person.name}</p>
        <p className="ab-tcard__role">{person.role}</p>
        <div className="ab-tcard__role-line" />
      </div>
    </motion.div>
  );
}

/* ── Process step ── */
function ProcessStep({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      className="ab-step"
      style={{ "--sc": step.color, "--sb": step.bg }}
      initial={{ opacity:0, y:36 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, ease:E, delay:index * 0.1 }}
    >
      <div className="ab-step__top">
        <div className="ab-step__icon"><Icon size={20} strokeWidth={1.8} /></div>
        <span className="ab-step__num">{step.num}</span>
      </div>
      <h3 className="ab-step__title">{step.title}</h3>
      <p className="ab-step__desc">{step.desc}</p>
      <div className="ab-step__accent" />
    </motion.div>
  );
}

/* ── Team Modal ── */
function TeamModal({ person, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="ab-modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="ab-modal-backdrop__blur" onClick={onClose} />
        <motion.div className="ab-modal" initial={{scale:0.88,y:28,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{scale:0.88,y:28,opacity:0}} transition={{duration:0.4,ease:E}}>
          <button className="ab-modal__close" onClick={onClose}><X size={16} /></button>
          <div className="ab-modal__photo"><img src={person.image} alt={person.name} loading="lazy"
            style={{ objectPosition: person.photoPosition || "center center", transform: person.photoZoom ? `scale(${person.photoZoom})` : undefined, transformOrigin: person.photoPosition || "center center" }} /></div>
          <div className="ab-modal__body">
            <span className="ab-modal__badge">{person.badge}</span>
            <h2 className="ab-modal__name">{person.name}</h2>
            <p className="ab-modal__role">{person.role}</p>
            <p className="ab-modal__bio">{person.bio}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══ PAGE ══ */
export default function About() {
  const [selected, setSelected] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroO = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <div className="ab-page">
      {/* BG layers */}
      <div className="ab-bg" aria-hidden="true">
        <div className="ab-bg__blob ab-bg__blob--1" />
        <div className="ab-bg__blob ab-bg__blob--2" />
        <div className="ab-bg__blob ab-bg__blob--3" />
        <div className="ab-bg__grid" />
      </div>

      {/* ══ HERO ══ */}
      <section className="ab-hero" ref={heroRef}>
        <motion.div className="ab-hero__inner" style={{ y: heroY, opacity: heroO }}>
          <motion.div className="ab-hero__eyebrow" {...fIn(0)}>
            <Globe size={11} /><span>About TechBrahmand</span>
          </motion.div>

          <h1 className="ab-hero__h1">
            {"Your Complete".split("").map((ch, i) => (
              <motion.span key={i} className="ab-hero__ch"
                initial={{ opacity:0, y:48, filter:"blur(4px)" }}
                animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                transition={{ duration:0.55, ease:E, delay:0.1 + i * 0.022 }}>
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
            <br />
            {"Digital Partner".split("").map((ch, i) => (
              <motion.span key={i} className="ab-hero__ch ab-hero__ch--teal"
                initial={{ opacity:0, y:48, filter:"blur(4px)" }}
                animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                transition={{ duration:0.55, ease:E, delay:0.42 + i * 0.028 }}>
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h1>

          <motion.p className="ab-hero__sub" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:E,delay:0.9}}>
            TechBrahmand is a full-service digital agency that builds, maintains,
            and strategises for businesses of all sizes — currently serving clients
            across India with aspirations to go global.
          </motion.p>

          <motion.div className="ab-hero__stats" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,ease:E,delay:1.1}}>
            <StatItem target="63+" label="Projects" />
            <div className="ab-hero__stat-sep" />
            <StatItem target="18" label="Industries" />
            <div className="ab-hero__stat-sep" />
            <StatItem target="99%" label="Retention" />
          </motion.div>
        </motion.div>

        <motion.div className="ab-hero__scroll" {...fIn(1.5)}>
          <div className="ab-hero__scroll-dot" />
        </motion.div>
      </section>

      {/* ══ IDENTITY CARDS ══ */}
      <section className="ab-section ab-identity">
        <div className="ab-identity__cards">
          <motion.div className="ab-icard ab-icard--light"
            initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-80px"}}
            transition={{duration:0.8,ease:E}} whileHover={{y:-10,transition:{duration:0.4,ease:E}}}>
            <div className="ab-icard__glow" />
            <div className="ab-icard__icon"><Users size={22} /></div>
            <p className="ab-icard__over">Who We Are</p>
            <h2 className="ab-icard__h2">Builders, designers &amp; strategists</h2>
            <p className="ab-icard__body">
              A passionate team who believe your digital presence should work as hard as
              you do. We handle everything from building your first website to
              outmanoeuvring your competitors — under one roof.
            </p>
            <div className="ab-icard__tags">
              {["Web Development","Maintenance & AMC","Competitive Strategy","Branding"].map(t => (
                <span key={t} className="ab-icard__tag">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className="ab-icard ab-icard--dark"
            initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-80px"}}
            transition={{duration:0.8,ease:E,delay:0.12}} whileHover={{y:-10,transition:{duration:0.4,ease:E}}}>
            <div className="ab-icard__glow ab-icard__glow--dark" />
            <div className="ab-icard__icon ab-icard__icon--dark"><Target size={22} /></div>
            <p className="ab-icard__over ab-icard__over--dark">Why We Exist</p>
            <h2 className="ab-icard__h2 ab-icard__h2--dark">One partner for everything digital</h2>
            <p className="ab-icard__body ab-icard__body--dark">
              Too many businesses struggle with unreliable agencies, scattered freelancers,
              and platforms that don't grow with them. We exist to be the one partner you
              need — for everything digital.
            </p>
            <Globe size={200} className="ab-icard__deco" />
          </motion.div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="ab-section ab-team">
        <motion.div className="ab-section-hdr" {...fUp(0)}>
          <p className="ab-section-hdr__over">The People Behind It</p>
          <h2 className="ab-section-hdr__title">Meet the Team</h2>
        </motion.div>
        <div className="ab-team__grid">
          {team.map((p, i) => (
            <TeamCard key={p.id} person={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="ab-section ab-services">
        <motion.div className="ab-section-hdr" {...fUp(0)}>
          <p className="ab-section-hdr__over">What We Do</p>
          <h2 className="ab-section-hdr__title">One roof. Everything digital.</h2>
        </motion.div>
        <div className="ab-services__grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} className="ab-svc-card"
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.6,ease:E,delay:i*0.1}} whileHover={{y:-8,transition:{duration:0.35,ease:E}}}>
                <div className="ab-svc-card__icon"><Icon size={20} strokeWidth={1.8} /></div>
                <h3 className="ab-svc-card__title">{s.title}</h3>
                <p className="ab-svc-card__desc">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══ PROCESS — Premium Interactive Roadmap ══ */}
      <JourneyRoadmap />

      {/* ══ COMPARE ══ */}
      <section className="ab-section ab-compare">
        <motion.div className="ab-section-hdr" {...fUp(0)}>
          <p className="ab-section-hdr__over">Why Clients Choose Us</p>
          <h2 className="ab-section-hdr__title">The TechBrahmand difference</h2>
          <p className="ab-section-hdr__sub">We're not just another agency. Here's what sets us apart.</p>
        </motion.div>
        <motion.div className="ab-ctable"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}}
          transition={{duration:0.75,ease:E,delay:0.1}}>
          <div className="ab-ctable__head">
            <div className="ab-ctable__hcol ab-ctable__hcol--l">
              <span className="ab-ctable__badge ab-ctable__badge--old">Traditional Agency</span>
            </div>
            <div className="ab-ctable__hcol ab-ctable__hcol--c">Feature</div>
            <div className="ab-ctable__hcol ab-ctable__hcol--r">
              <span className="ab-ctable__badge ab-ctable__badge--new">✦ TechBrahmand</span>
            </div>
          </div>
          {compareRows.map((row, i) => (
            <motion.div key={row.feat} className="ab-ctable__row"
              initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
              transition={{duration:0.5,ease:E,delay:0.25+i*0.07}}>
              <div className="ab-ctable__cell ab-ctable__cell--old">
                <span className="ab-ctable__x">✕</span>{row.old}
              </div>
              <div className="ab-ctable__cell ab-ctable__cell--feat">{row.feat}</div>
              <div className="ab-ctable__cell ab-ctable__cell--new">
                <span className="ab-ctable__chk">✓</span>{row.neo}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══ BOTTOM GRID (serve + principles) ══ */}
      <section className="ab-section ab-bottom">
        {/* Who We Serve */}
        <motion.div className="ab-serve" {...fUp(0)}>
          <p className="ab-section-hdr__over">Clients</p>
          <h3 className="ab-serve__title">Who We Serve</h3>
          <div className="ab-serve__grid">
            {clients.map((c, i) => {
              const Icon = clientIcons[i];
              return (
                <motion.div key={c} className="ab-serve-pill"
                  initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
                  transition={{duration:0.45,ease:E,delay:i*0.07}} whileHover={{scale:1.04,transition:{duration:0.25}}}>
                  <Icon size={14} className="ab-serve-pill__icon" />
                  <span>{c}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Principles */}
        <motion.div className="ab-principles" {...fUp(0.1)}>
          <p className="ab-section-hdr__over">How We Work</p>
          <h3 className="ab-serve__title">Our Principles</h3>
          <div className="ab-principles__list">
            {principles.map((p, i) => (
              <motion.div key={p.title} className="ab-principle"
                initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:0.5,ease:E,delay:i*0.09}} whileHover={{x:4,transition:{duration:0.25}}}>
                <CheckCircle2 size={16} className="ab-principle__icon" />
                <div>
                  <p className="ab-principle__title">{p.title}</p>
                  <p className="ab-principle__desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ CTA ══ */}
      <section className="ab-cta">
        <div className="ab-cta__bg" aria-hidden="true">
          <div className="ab-cta__orb ab-cta__orb--1" />
          <div className="ab-cta__orb ab-cta__orb--2" />
        </div>
        <motion.div className="ab-cta__inner" {...fUp(0)}>
          <p className="ab-cta__over">Let's Work Together</p>
          <h2 className="ab-cta__h2">Ready to get started?</h2>
          <p className="ab-cta__sub">Tell us about your project and we'll get back to you within 24 hours.</p>
          <Link to="/contact">
            <motion.button className="ab-cta__btn"
              whileHover={{scale:1.04,boxShadow:"0 0 40px rgba(255,255,255,0.2)"}}
              whileTap={{scale:0.98}}>
              Get In Touch <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Modal */}
      {selected && <TeamModal person={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}