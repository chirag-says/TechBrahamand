import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Globe, Smartphone, Server, Zap, Cloud, Palette, TrendingUp,
  ChevronDown, ArrowRight, Check, X, Lightbulb, LayoutTemplate,
  FileText, Code2, Rocket, BarChart3, Activity, Building2, Heart,
  GraduationCap, ShoppingCart, Plane, Home, Factory, Bot, Cpu
} from "lucide-react";
import "./Services.css";

const E = [0.22, 1, 0.36, 1];
const G = (n) => ({ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: E, delay: n * 0.09 } } });

/* ── Particles ── */
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 4 + 2, dur: Math.random() * 4 + 5, delay: Math.random() * 5,
  }));
  return (
    <div className="sv-hero__particles">
      {dots.map(d => (
        <span key={d.id} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          background: "oklch(42% 0.18 195)", opacity: 0.2,
          animation: `sv-float ${d.dur}s ${d.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── AI Flow ── */
const FLOW_STEPS = [
  { icon: Lightbulb, label: "Client Idea" },
  { icon: Brain, label: "AI Analysis" },
  { icon: LayoutTemplate, label: "Architecture" },
  { icon: FileText, label: "Quotation" },
  { icon: Rocket, label: "Roadmap" },
  { icon: Code2, label: "Development" },
];

/* ── Services bento data ── */
const SERVICES = [
  { cls: "sv-card--a sv-card--dark", icon: Brain, tag: "Flagship", title: "AI Software Architecture", desc: "Our AI understands your idea, selects the right tech stack, designs the system architecture, and generates a full development roadmap before a single line of code is written." },
  { cls: "sv-card--b", icon: Globe, tag: "Web", title: "Business Websites", desc: "High-converting websites built to represent your brand with precision and speed." },
  { cls: "sv-card--c", icon: Smartphone, tag: "Mobile", title: "Mobile Applications", desc: "iOS & Android apps built with Flutter for a single, performant codebase." },
  { cls: "sv-card--d", icon: Server, tag: "Enterprise", title: "Enterprise Systems", desc: "ERP, CRM, and custom platforms built for scale and reliability." },
  { cls: "sv-card--e", icon: Bot, tag: "AI", title: "AI Automation", desc: "Intelligent automation that eliminates repetitive work across your business." },
  { cls: "sv-card--f", icon: Cloud, tag: "Cloud", title: "Cloud & DevOps", desc: "AWS, Azure infra, CI/CD pipelines, and zero-downtime deployments." },
  { cls: "sv-card--g", icon: Palette, tag: "Design", title: "UI/UX Design", desc: "Apple-level interfaces crafted to convert, delight, and retain." },
  { cls: "sv-card--h", icon: TrendingUp, tag: "Growth", title: "Maintenance & Growth", desc: "Post-launch SEO, A/B testing, performance monitoring, and continuous feature delivery — because building is just the beginning." },
];

/* ── Industries ── */
const INDUSTRIES = [
  { icon: Heart, name: "Healthcare", desc: "AI diagnostics, hospital systems, telemedicine" },
  { icon: BarChart3, name: "Finance", desc: "FinTech, trading platforms, payment gateways" },
  { icon: ShoppingCart, name: "Retail & E-Commerce", desc: "Online stores, inventory, loyalty systems" },
  { icon: GraduationCap, name: "Education", desc: "LMS, EdTech platforms, virtual classrooms" },
  { icon: Factory, name: "Manufacturing", desc: "ERP, supply chain, IoT integration" },
  { icon: Plane, name: "Travel", desc: "Booking systems, itinerary apps, fleet management" },
  { icon: Home, name: "Real Estate", desc: "Property management, CRM, listing platforms" },
  { icon: Cpu, name: "AI Startups", desc: "MVP architecture, AI pipelines, rapid scaling" },
  { icon: Building2, name: "Enterprise", desc: "Digital transformation, legacy modernisation" },
];

/* ── Tech Ecosystem ── */
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';
const TECH_NODES = [
  { label: "React",      color: "#61DAFB", r: 110, angle: 0,   icon: `${DI}/react/react-original.svg` },
  { label: "Next.js",    color: "#0F172A", r: 110, angle: 72,  icon: `${DI}/nextjs/nextjs-plain.svg` },
  { label: "Flutter",    color: "#54C5F8", r: 110, angle: 144, icon: `${DI}/flutter/flutter-original.svg` },
  { label: "Node.js",    color: "#68A063", r: 110, angle: 216, icon: `${DI}/nodejs/nodejs-original.svg` },
  { label: "Python",     color: "#F7CA3B", r: 110, angle: 288, icon: `${DI}/python/python-original.svg` },
  { label: "MongoDB",    color: "#47A248", r: 195, angle: 20,  icon: `${DI}/mongodb/mongodb-original.svg` },
  { label: "PostgreSQL", color: "#336791", r: 195, angle: 80,  icon: `${DI}/postgresql/postgresql-original.svg` },
  { label: "Docker",     color: "#2496ED", r: 195, angle: 140, icon: `${DI}/docker/docker-original.svg` },
  { label: "AWS",        color: "#FF9900", r: 195, angle: 200, icon: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { label: "Redis",      color: "#DC382D", r: 195, angle: 260, icon: `${DI}/redis/redis-original.svg` },
  { label: "Azure",      color: "#0078D4", r: 195, angle: 320, icon: `${DI}/azure/azure-original.svg` },
  { label: "OpenAI",     color: "#10A37F", r: 235, angle: 10,  icon: `${SI}/openai/10A37F` },
  { label: "Claude",     color: "#D97706", r: 235, angle: 90,  icon: `${SI}/anthropic/D97706` },
  { label: "Gemini",     color: "#4285F4", r: 235, angle: 190, icon: `${SI}/googlegemini/4285F4` },
  { label: "Groq",       color: "#F97316", r: 235, angle: 285, icon: `${SI}/groq/F97316` },
];

/* ── Journey ── */
const JOURNEY = [
  { icon: Lightbulb, num: "01", title: "Book Consultation", desc: "Share your vision with our AI Solution Architect in a free 15-minute session. No forms. No friction." },
  { icon: Brain, num: "02", title: "AI Discussion", desc: "The AI asks smart questions about your goals, budget, and users — then designs the technical blueprint in real time." },
  { icon: FileText, num: "03", title: "Receive Proposal", desc: "Get a detailed proposal with tech stack, timeline, milestones, and transparent pricing — all AI-generated." },
  { icon: Check, num: "04", title: "Approve & Sign", desc: "Review, request changes, and approve. No pressure. No hidden clauses." },
  { icon: Code2, num: "05", title: "Development Begins", desc: "Agile sprints, weekly demos, and real progress — not just promises." },
  { icon: Rocket, num: "06", title: "Launch", desc: "We handle hosting, CI/CD, SSL, and go-live. You launch confidently." },
  { icon: TrendingUp, num: "07", title: "Growth", desc: "Post-launch SEO, A/B testing, and continuous improvements to keep you scaling." },
];

/* ── Compare ── */
const OLD_ITEMS = [
  "Generic estimates, no clarity",
  "Months of back-and-forth planning",
  "Tech decided without client input",
  "Hidden costs discovered too late",
  "No updates until delivery",
];
const NEW_ITEMS = [
  "AI-generated transparent quotation",
  "Architecture designed in one session",
  "You choose and customise the stack",
  "Every rupee itemised upfront",
  "Weekly demos, full visibility",
];

/* ── FAQ ── */
const FAQS = [
  { q: "How does the AI Solution Architect work?", a: "The AI holds a structured conversation about your project — goals, users, scale, and budget. It then selects the optimal tech stack, designs the system architecture, estimates costs, and generates a development roadmap. All of this happens in one session before any development begins." },
  { q: "How long does a typical project take?", a: "A business website takes 3–6 weeks. A mobile app or SaaS platform takes 8–20 weeks depending on complexity. Your AI-generated roadmap includes precise milestone timelines before you commit." },
  { q: "Can I customise the tech stack?", a: "Yes. The AI recommends the optimal stack based on your requirements, but you have full control to modify any part of it. The quotation updates in real time as you make changes." },
  { q: "What happens after launch?", a: "We offer post-launch maintenance, performance monitoring, SEO optimisation, A/B testing, and ongoing feature development. Your product is never abandoned." },
  { q: "Do you work with startups?", a: "Absolutely. Startups are one of our core specialisations. We help you launch an MVP fast, validate with real users, and scale the architecture as you grow." },
];

/* ── Section Header ── */
function SHdr({ over, title, sub, center }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className="sv-section-hdr" style={center ? { textAlign: "center", margin: "0 auto 48px" } : { marginBottom: 48 }}
      initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: E }}>
      <p className="sv-over">{over}</p>
      <h2 className="sv-h2">{title}</h2>
      {sub && <p className="sv-sub" style={center ? { margin: "0 auto" } : {}}>{sub}</p>}
    </motion.div>
  );
}


function BentoCard({ s, i }) {
  const Icon = s.icon;
  const ref = React.useRef(null);
  const inV = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={`sv-card ${s.cls}`}
      initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: E, delay: i * 0.07 }}>
      <div className="sv-card__grad-border" />
      <div className="sv-card__icon"><Icon size={20} /></div>
      <span className="sv-card__tag">{s.tag}</span>
      <h3 className="sv-card__title">{s.title}</h3>
      <p className="sv-card__desc">{s.desc}</p>
      <div className="sv-card__glow" />
    </motion.div>
  );
}

function IndCard({ ind, i }) {
  const Icon = ind.icon;
  const ref = React.useRef(null);
  const inV = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className="sv-ind-card"
      initial={{ opacity: 0, y: 24 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: E, delay: i * 0.06 }}>
      <div className="sv-ind-card__icon"><Icon size={20} /></div>
      <h3 className="sv-ind-card__name">{ind.name}</h3>
      <p className="sv-ind-card__desc">{ind.desc}</p>
    </motion.div>
  );
}

export default function Services() {
  const [activeNode, setActiveNode] = useState(2);
  const [openFaq, setOpenFaq] = useState(null);
  const [journeyActive, setJourneyActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveNode(n => (n + 1) % FLOW_STEPS.length);
      setJourneyActive(n => (n + 1) % JOURNEY.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="sv-page">
      {/* BG */}
      <div className="sv-bg">
        <div className="sv-bg__grid" />
        <div className="sv-bg__b1" />
        <div className="sv-bg__b2" />
      </div>

      {/* ── HERO ── */}
      <section className="sv-hero">
        <Particles />
        <div className="sv-hero__glow" />
        <motion.div className="sv-hero__inner" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: E }}>
          <span className="sv-eyebrow"><Activity size={12} />Services</span>
          <h1 className="sv-hero__h1">
            Engineering <span className="sv-hero__accent">Intelligent</span><br />Digital Businesses
          </h1>
          <p className="sv-hero__sub">From AI consultation to enterprise deployment, TechBrahmand designs, builds and scales digital products that grow with your business.</p>
          <div className="sv-hero__ctas">
            <button className="sv-btn-primary" onClick={() => window.location.href = "/chatbot"}>Talk to AI Architect <ArrowRight size={16} /></button>
            <button className="sv-btn-ghost">View Our Work</button>
          </div>
        </motion.div>
        <div className="sv-hero__scroll"><div className="sv-hero__scroll-dot" /></div>
      </section>

      {/* ── AI FLAGSHIP ── */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 0 72px" }}>
        <div className="sv-ai">
          <div className="sv-ai__orb sv-ai__orb--1" />
          <div className="sv-ai__orb sv-ai__orb--2" />
          <div className="sv-ai__inner">
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }}>
              <p className="sv-over sv-ai__over">Flagship Product</p>
              <h2 className="sv-h2 sv-ai__h2">AI Solution Architect</h2>
              <p className="sv-sub sv-ai__sub">The world's first AI that designs your entire software project — architecture, tech stack, quotation, and roadmap — before development begins.</p>
              <div className="sv-ai__badge"><div className="sv-ai__badge-dot" /><span className="sv-ai__badge-text">Live · Free Consultation</span></div>
              <button className="sv-ai__cta" onClick={() => window.location.href = "/chatbot"}>Start AI Consultation <ArrowRight size={16} /></button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E, delay: 0.1 }}>
              <div className="sv-flow">
                {FLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <React.Fragment key={i}>
                      <div className={`sv-flow__node${activeNode === i ? " sv-flow__node--active" : ""}`} onMouseEnter={() => setActiveNode(i)}>
                        <div className="sv-flow__node-circle"><Icon size={18} className="sv-flow__node-icon" /></div>
                        <span className="sv-flow__node-text">{step.label}</span>
                      </div>
                      {i < FLOW_STEPS.length - 1 && <div className="sv-flow__connector" style={{ animationDelay: `${i * 0.4}s` }} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BENTO SERVICES ── */}
      <section className="sv-section">
        <SHdr over="Core Services" title="Everything You Need to Dominate Your Market" sub="Eight specialised capabilities — each backed by AI architecture and transparent pricing." />
        <div className="sv-bento">
          {SERVICES.map((s, i) => <BentoCard key={i} s={s} i={i} />)}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="sv-section">
        <SHdr over="Industries" title="We Build Across Every Sector" />
        <div className="sv-inds-grid">
          {INDUSTRIES.map((ind, i) => <IndCard key={i} ind={ind} i={i} />)}
        </div>
      </section>

      {/* ── TECH ECOSYSTEM ── */}
      <section className="sv-section">
        <SHdr over="Technology Ecosystem" title="The Stack Powering Our Products" center />
        {/* Desktop orbit */}
        <div className="sv-tech sv-tech--desktop">
          <div className="sv-tech__orbit sv-tech__orbit--1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="sv-tech__orbit sv-tech__orbit--2" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="sv-tech__orbit sv-tech__orbit--3" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div className="sv-tech__core">
            <Cpu size={22} color="oklch(70% 0.14 195)" />
            <span className="sv-tech__core-label">Core</span>
            <span className="sv-tech__core-name" style={{ fontSize: 9, textAlign: "center" }}>TechBrahmand</span>
          </div>
          {TECH_NODES.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = 50 + (n.r / 240) * 50 * Math.cos(rad);
            const y = 50 + (n.r / 240) * 50 * Math.sin(rad);
            return (
              <div key={i} className="sv-tech__node" style={{ left: `${x}%`, top: `${y}%` }}>
                <div className="sv-tech__pill">
                  <img src={n.icon} alt={n.label} className="sv-tech__pill-icon" loading="lazy" onError={e => { e.currentTarget.style.display='none'; }} />
                  {n.label}
                </div>
              </div>
            );
          })}
        </div>
        {/* Mobile pill grid */}
        <div className="sv-tech-pills">
          {TECH_NODES.map((n, i) => (
            <div key={i} className="sv-tech__pill">
              <img src={n.icon} alt={n.label} className="sv-tech__pill-icon" loading="lazy" onError={e => { e.currentTarget.style.display='none'; }} />
              {n.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section className="sv-section">
        <SHdr over="Why TechBrahmand" title="Architecture First. Always." center />
        <div className="sv-compare">
          <motion.div className="sv-cmp-panel sv-cmp-panel--old" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }}>
            <span className="sv-cmp-panel__badge">Traditional Agency</span>
            <h3 className="sv-cmp-panel__title">Vague. Slow. Expensive.</h3>
            {OLD_ITEMS.map((item, i) => (
              <div key={i} className="sv-cmp-item">
                <div className="sv-cmp-item__icon sv-cmp-item__icon--x"><X size={10} /></div>
                <span className="sv-cmp-item__text">{item}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="sv-cmp-panel sv-cmp-panel--new" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E, delay: 0.1 }}>
            <span className="sv-cmp-panel__badge">TechBrahmand</span>
            <h3 className="sv-cmp-panel__title" style={{ color: "#fff" }}>Clear. Fast. Precise.</h3>
            {NEW_ITEMS.map((item, i) => (
              <div key={i} className="sv-cmp-item">
                <div className="sv-cmp-item__icon sv-cmp-item__icon--ok"><Check size={10} /></div>
                <span className="sv-cmp-item__text">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="sv-section">
        <SHdr over="Client Journey" title="From Idea to Launch in 7 Steps" center />
        <div className="sv-journey">
          <div className="sv-journey__line" />
          <div className="sv-journey__line-fill" style={{ height: `${((journeyActive + 1) / JOURNEY.length) * 100}%` }} />
          {JOURNEY.map((step, i) => {
            const Icon = step.icon;
            const active = i <= journeyActive;
            return (
              <motion.div key={i} className={`sv-journey__step${active ? " sv-journey__step--active" : ""}`}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}>
                <div className="sv-journey__dot"><Icon size={20} className="sv-journey__dot-icon" /></div>
                <div className="sv-journey__content">
                  <p className="sv-journey__step-num">{step.num}</p>
                  <h3 className="sv-journey__step-title">{step.title}</h3>
                  <p className="sv-journey__step-desc">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sv-section">
        <SHdr over="FAQ" title="Common Questions" center />
        <div className="sv-faqs">
          {FAQS.map((faq, i) => {
            const open = openFaq === i;
            return (
              <motion.div key={i} className={`sv-faq${open ? " sv-faq--open" : ""}`}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease: E, delay: i * 0.07 }}>
                <button className="sv-faq__q" onClick={() => setOpenFaq(open ? null : i)}>
                  {faq.q}
                  <ChevronDown size={18} className="sv-faq__arrow" />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div className="sv-faq__a" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: E }}>
                      <p className="sv-faq__a-inner">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="sv-cta">
          <div className="sv-cta__orb sv-cta__orb--1" />
          <div className="sv-cta__orb sv-cta__orb--2" />
          <div className="sv-cta__inner">
            <p className="sv-cta__over">Ready to Build</p>
            <h2 className="sv-cta__h2">Build Something Extraordinary</h2>
            <p className="sv-cta__sub">Every great product starts with a conversation. Talk to our AI Solution Architect — free, instant, and insightful.</p>
            <button className="sv-cta__btn" onClick={() => window.location.href = "/chatbot"}>
              Talk to AI Solution Architect <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}