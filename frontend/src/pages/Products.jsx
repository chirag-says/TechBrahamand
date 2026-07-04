import React,{useState,useRef,useEffect} from 'react';
import {motion,useInView,AnimatePresence} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowRight,ChevronDown,Check,X,Zap,Globe,Smartphone,Server,Brain,Settings,Cloud,RefreshCw,Heart,GraduationCap,TrendingUp,ShoppingBag,Plane,Building,Factory,Coffee,Shield,Star,Layers} from 'lucide-react';
import TypingKeyboard from '../components/TypingKeyboard';
import './Products.css';

const E=[0.22,1,0.36,1];
const fUp=(d=0)=>({initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:true,margin:'-60px'},transition:{duration:0.65,ease:E,delay:d}});

function Counter({target,suffix='',dur=1.8}){
  const ref=useRef(null);
  const inView=useInView(ref,{once:true});
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!inView)return;
    let s=0,step=target/(dur*60);
    const t=setInterval(()=>{s+=step;if(s>=target){setV(target);clearInterval(t);}else setV(Math.floor(s));},1000/60);
    return()=>clearInterval(t);
  },[inView,target,dur]);
  return <span ref={ref}>{v}{suffix}</span>;
}

const sols=[
  {icon:Brain,title:'AI Solution Architect',desc:'Intelligent system that designs your entire software project before development begins.',time:'15 min',price:'Free',
   sectors:['Healthcare','Finance','Retail','Education','SaaS','Manufacturing','Hospitality','Any Industry'],
   features:['Understands your idea in plain language','Recommends the right technology stack','Generates itemised transparent quotation','Creates phased development roadmap']},
  {icon:Globe,title:'Business Websites',desc:'Premium websites and web apps built to convert visitors into clients.',time:'3–6 wks',price:'₹18,000',
   sectors:['Retail','Hospitality','Real Estate','Startups','Professional Services','Healthcare','Education'],
   features:['Custom pixel-perfect design','CMS & blog integration','SEO optimised from day one','Mobile-first responsive']},
  {icon:Smartphone,title:'Mobile Applications',desc:'iOS and Android apps with a single unified codebase using Flutter.',time:'6–12 wks',price:'₹35,000',
   sectors:['Retail','Travel','Healthcare','Food & Delivery','Finance','Fitness','Education'],
   features:['Cross-platform iOS & Android','Offline-first architecture','Push notifications & analytics','App Store deployment']},
  {icon:Server,title:'Enterprise Systems',desc:'Scalable enterprise platforms with microservices and cloud-native architecture.',time:'12–24 wks',price:'₹1,20,000',
   sectors:['Manufacturing','Finance','Logistics','Healthcare','Government','Large Retail'],
   features:['Microservices architecture','Role-based access control','High-availability infrastructure','ERP & CRM integrations']},
  {icon:Brain,title:'AI Solutions',desc:'Custom AI integrations, chatbots, and intelligent automation for your business.',time:'4–8 wks',price:'₹45,000',
   sectors:['Healthcare','Finance','Retail','Customer Support','HR & Recruitment','Legal','SaaS'],
   features:['Custom LLM integrations','AI chatbots & voice agents','Predictive analytics dashboards','Groq & OpenAI powered']},
  {icon:Settings,title:'Automation Platforms',desc:'End-to-end workflow automation that eliminates repetitive tasks.',time:'4–10 wks',price:'₹40,000',
   sectors:['Finance','HR','E-Commerce','Logistics','Healthcare','Manufacturing'],
   features:['Visual workflow builder','API & webhook integrations','Scheduled & event-based triggers','Real-time monitoring']},
  {icon:Cloud,title:'Cloud Solutions',desc:'Cloud migration, DevOps pipelines, and infrastructure management.',time:'3–8 wks',price:'₹30,000',
   sectors:['SaaS','Enterprise','Startups','E-Commerce','Healthcare','FinTech'],
   features:['AWS / Azure / GCP migration','CI/CD pipeline setup','Auto-scaling infrastructure','99.9% uptime SLA']},
  {icon:RefreshCw,title:'Digital Transformation',desc:'Full digital overhaul — legacy to modern, data-driven systems.',time:'16–32 wks',price:'₹2,00,000',
   sectors:['Manufacturing','Government','Healthcare','Banking','Education','Logistics'],
   features:['Legacy system modernisation','Data migration & integration','Change management support','Phased rollout strategy']},
];

const divs=[
  {name:'BRAHMA',sub:'Create',emoji:'🌅',color:'oklch(42% 0.18 195)',desc:'For startups and innovative ideas. We build from the ground up — clean architecture, scalable code, and future-proof design.',tags:['Startups','New Products','MVPs','Greenfield']},
  {name:'VISHNU',sub:'Scale',emoji:'⚡',color:'#0D9488',desc:'Modernise and optimise existing systems. We enhance performance, improve UX, and scale infrastructure without breaking what works.',tags:['Modernisation','Optimisation','Migration','Scale']},
  {name:'MAHESH',sub:'Dominate',emoji:'🔥',color:'#EC4899',desc:'Build software that outperforms every competitor. Maximum performance, AI-powered features, and enterprise-grade architecture.',tags:['Enterprise','AI Systems','High-Scale','Competitors']},
];

const TECHS=[
  {id:'react',label:'React',cost:8000,weeks:0.5},
  {id:'nextjs',label:'Next.js',cost:10000,weeks:0.5},
  {id:'flutter',label:'Flutter',cost:15000,weeks:1},
  {id:'node',label:'Node.js',cost:8000,weeks:0.5},
  {id:'python',label:'Python',cost:10000,weeks:0.5},
  {id:'mongo',label:'MongoDB',cost:5000,weeks:0},
  {id:'postgres',label:'PostgreSQL',cost:6000,weeks:0},
  {id:'aws',label:'AWS',cost:8000,weeks:0.5},
  {id:'docker',label:'Docker',cost:5000,weeks:0.5},
  {id:'groq',label:'Groq AI',cost:6000,weeks:0.5},
  {id:'openai',label:'OpenAI',cost:8000,weeks:0.5},
  {id:'tf',label:'TensorFlow',cost:12000,weeks:1},
];

const inds=[
  {icon:Heart,name:'Healthcare',sols:'AI Diagnostics, Hospital Systems'},
  {icon:GraduationCap,name:'Education',sols:'LMS, EdTech Platforms'},
  {icon:TrendingUp,name:'Finance',sols:'FinTech, Trading Platforms'},
  {icon:ShoppingBag,name:'Retail',sols:'E-Commerce, Inventory'},
  {icon:Plane,name:'Travel',sols:'Booking Systems, Apps'},
  {icon:Building,name:'Real Estate',sols:'Property Management'},
  {icon:Factory,name:'Manufacturing',sols:'ERP, Supply Chain'},
  {icon:Coffee,name:'Hospitality',sols:'POS, Reservation'},
  {icon:Layers,name:'SaaS',sols:'Multi-tenant Platforms'},
];

const steps=['Idea','AI Consultation','Architecture','Proposal','Development','Testing','Deployment','Growth'];

const faqs=[
  {q:'Can I change technologies after the consultation?',a:'Yes. Our AI lets you swap any technology before development starts. Budget and timeline update instantly.'},
  {q:'How accurate is the AI budget estimate?',a:'Our estimates are itemised per feature and technology. Final variance is typically under 5%.'},
  {q:'Do you build for international clients?',a:'Yes. We serve clients globally. All proposals are available in INR and USD.'},
  {q:'What happens after the AI consultation?',a:'You receive a full architecture proposal. You review, customise, approve — then development begins.'},
  {q:'Can I upgrade my division later?',a:'Absolutely. Start with BRAHMA, scale to VISHNU or MAHESH as your product grows.'},
  {q:'Is the AI consultation really free?',a:'100% free. No login required. No credit card. Start immediately.'},
];

const marqueeItems=['React','Next.js','Flutter','Python','Node.js','AWS','Azure','MongoDB','PostgreSQL','Redis','Docker','TensorFlow','OpenAI','Groq','GraphQL','Kubernetes'];

/* ── Solution Panel ── */
function SolutionPanel({sol,onClose}){
  const Icon=sol.icon;
  useEffect(()=>{
    const h=(e)=>{if(e.key==='Escape')onClose();};
    document.body.style.overflow='hidden';
    window.addEventListener('keydown',h);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',h);};
  },[onClose]);
  return(
    <AnimatePresence>
      <motion.div className="sp-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.22}} onClick={(e)=>{if(e.target===e.currentTarget)onClose();}}>
        <motion.div className="sp-panel" initial={{opacity:0,y:40,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:40,scale:0.95}} transition={{duration:0.38,ease:[0.22,1,0.36,1]}}>
          <button className="sp-close" onClick={onClose}><X size={15}/></button>

          <div className="sp-head">
            <div className="sp-head__icon"><Icon size={22} strokeWidth={1.8}/></div>
            <div>
              <p className="sp-head__over">Digital Solution</p>
              <h3 className="sp-head__title">{sol.title}</h3>
            </div>
          </div>

          <div className="sp-body">
            <div className="sp-col">
              <p className="sp-col__label">Industries We Serve</p>
              <div className="sp-sectors">
                {sol.sectors.map(s=><span key={s} className="sp-sector">{s}</span>)}
              </div>
            </div>
            <div className="sp-col">
              <p className="sp-col__label">What's Included</p>
              <div className="sp-features">
                {sol.features.map(f=>(
                  <div key={f} className="sp-feature"><Check size={13}/><span>{f}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="sp-footer">
            <div className="sp-footer__meta">
              <span className="flex items-center gap-1"><Clock size={11}/>{sol.time}</span>
              <span>From {sol.price}</span>
            </div>
            <Link to="/chatbot" onClick={onClose}>
              <motion.button className="sp-cta" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>
                Start AI Consultation <ArrowRight size={14}/>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Products(){
  const [selTechs,setSelTechs]=useState(['react','node','mongo']);
  const [openFaq,setOpenFaq]=useState(null);
  const [activeSol,setActiveSol]=useState(null);

  const BASE=20000,BASE_W=2;
  const budget=selTechs.reduce((s,id)=>{const t=TECHS.find(x=>x.id===id);return s+(t?t.cost:0);},BASE);
  const weeks=selTechs.reduce((s,id)=>{const t=TECHS.find(x=>x.id===id);return s+(t?t.weeks:0);},BASE_W);

  const toggle=(id)=>setSelTechs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  return(
    <div className="pd-page">
      <div className="pd-bg"><div className="pd-bg__b1"/><div className="pd-bg__b2"/><div className="pd-bg__grid"/></div>

      {/* HERO */}
      <section className="pd-hero">
        <div className="pd-hero__left">
          <motion.div className="pd-hero__pill" {...fUp(0)}><Zap size={11}/>AI-Powered Architecture Studio</motion.div>
          <motion.h1 className="pd-hero__h1" initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.8,ease:E,delay:0.1}}>
            AI-Powered<br/><span className="pd-accent">Digital Solutions</span>
          </motion.h1>
          <motion.p className="pd-hero__sub" {...fUp(0.35)}>Every solution begins with intelligent architecture. Our AI analyses your business, recommends technologies, estimates your budget and designs your roadmap — before development begins.</motion.p>
          <motion.div className="pd-hero__btns" {...fUp(0.5)}>
            <Link to="/chatbot"><motion.button className="pd-btn-primary" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>Start AI Consultation <ArrowRight size={15}/></motion.button></Link>
            <button className="pd-btn-ghost" onClick={()=>document.getElementById('solutions')?.scrollIntoView({behavior:'smooth'})}>Explore Solutions</button>
          </motion.div>
        </div>
        <motion.div className="pd-hero__card" initial={{opacity:0,y:40,rotate:-2}} animate={{opacity:1,y:0,rotate:0}} transition={{duration:0.9,ease:E,delay:0.3}}>
          <div className="pd-keyboard-wrap">
            <TypingKeyboard
              scale={0.65}
              accentColor="oklch(42% 0.18 195)"
              secondaryAccent="#8b5cf6"
              autoTypeText="Analyzing project idea... Recommending BRAHMA division... Stack: React, Node, PostgreSQL... Budget: Rs.68,000... Timeline: 6 Weeks... Architecture ready. Lets build.       "
              typingSpeed={[45, 110]}
            />
          </div>
        </motion.div>
      </section>

      {/* AI ARCHITECT FEATURES */}
      <section className="pd-section">
        <motion.div className="pd-section-hdr" {...fUp(0)}>
          <p className="pd-over">Flagship Product</p>
          <h2 className="pd-title">Meet The AI Solution Architect</h2>
          <p className="pd-sub">The world's first AI that designs complete software architecture before a developer is involved.</p>
        </motion.div>
        <div className="pd-features-grid">
          {['Understands your business idea in plain language','Recommends BRAHMA, VISHNU or MAHESH division','Selects the right technologies for your product','Generates a transparent itemised quotation','Creates complete software architecture','Builds a phased development roadmap','Lets you customise every technology choice','Updates budget instantly on every change'].map((f,i)=>(
            <motion.div key={i} className="pd-feature-item" initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.5,ease:E,delay:i*0.07}}>
              <div className="pd-feature-item__check"><Check size={13}/></div>
              <span>{f}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="pd-feature-cta" {...fUp(0.4)}>
          <Link to="/chatbot"><motion.button className="pd-btn-primary" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>Try It Free — No Signup <ArrowRight size={15}/></motion.button></Link>
        </motion.div>
      </section>

      {/* SOLUTIONS */}
      <section className="pd-section" id="solutions">
        <motion.div className="pd-section-hdr" {...fUp(0)}>
          <p className="pd-over">Digital Solutions</p>
          <h2 className="pd-title">What We Build</h2>
          <p className="pd-sub">Eight specialised solutions — each backed by AI architecture and transparent pricing.</p>
        </motion.div>
        <div className="pd-sols-grid">
          {sols.map((s,i)=>{const Icon=s.icon;return(
            <motion.div
              key={i}
              className="pd-sol-card"
              initial={{opacity:0,y:36,scale:0.96}}
              whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true,margin:'-40px'}}
              transition={{duration:0.6,ease:E,delay:i*0.08}}
              whileHover={{y:-8,transition:{duration:0.3,ease:E}}}
            >
              <div className="pd-sol-card__icon"><Icon size={20} strokeWidth={1.8}/></div>
              <h3 className="pd-sol-card__title">{s.title}</h3>
              <p className="pd-sol-card__desc">{s.desc}</p>
              <div className="pd-sol-card__meta"><span>⏱ {s.time}</span><span>From {s.price}</span></div>
              <button className="pd-sol-card__cta" onClick={()=>setActiveSol(s)}>Explore <ArrowRight size={12}/></button>
              <div className="pd-sol-card__border"/>
              <div className="pd-sol-card__shine"/>
            </motion.div>
          );})}
        </div>
      </section>

      {/* TECH BUILDER */}
      <section className="pd-section pd-builder">
        <motion.div className="pd-section-hdr" {...fUp(0)}>
          <p className="pd-over">Live Technology Builder</p>
          <h2 className="pd-title">Build Your Stack. See Your Price.</h2>
          <p className="pd-sub">Toggle technologies. Watch your budget and timeline update instantly.</p>
        </motion.div>
        <motion.div className="pd-builder-wrap" {...fUp(0.2)}>
          <div className="pd-techs-grid">
            {TECHS.map(t=>(
              <button key={t.id} className={`pd-tech-pill${selTechs.includes(t.id)?' pd-tech-pill--on':''}`} onClick={()=>toggle(t.id)}>
                {selTechs.includes(t.id)&&<Check size={11}/>}{t.label}
              </button>
            ))}
          </div>
          <div className="pd-builder-result">
            <div className="pd-builder-result__item">
              <p className="pd-builder-result__label">Estimated Budget</p>
              <p className="pd-builder-result__value">₹{budget.toLocaleString('en-IN')}</p>
            </div>
            <div className="pd-builder-result__sep"/>
            <div className="pd-builder-result__item">
              <p className="pd-builder-result__label">Timeline</p>
              <p className="pd-builder-result__value">{weeks} Weeks</p>
            </div>
            <div className="pd-builder-result__sep"/>
            <div className="pd-builder-result__item">
              <p className="pd-builder-result__label">Technologies</p>
              <p className="pd-builder-result__value">{selTechs.length} Selected</p>
            </div>
          </div>
          <p className="pd-builder-note">This is a live preview. Get an accurate itemised proposal via AI Consultation.</p>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="pd-marquee-wrap">
        <div className="pd-marquee">
          {[...marqueeItems,...marqueeItems].map((t,i)=><span key={i} className="pd-marquee__item">{t}</span>)}
        </div>
      </div>



      {/* COUNTERS */}
      <section className="pd-section pd-metrics">
        {[{n:150,s:'+',l:'Projects Designed'},{n:300,s:'+',l:'AI Consultations'},{n:18,s:'+',l:'Industries'},{n:99,s:'%',l:'Client Satisfaction'},{n:20,s:'+',l:'Technologies'}].map((m,i)=>(
          <motion.div key={i} className="pd-metric" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55,ease:E,delay:i*0.1}}>
            <div className="pd-metric__num"><Counter target={m.n} suffix={m.s}/></div>
            <div className="pd-metric__label">{m.l}</div>
          </motion.div>
        ))}
      </section>

      {/* TRUST BADGES */}
      <section className="pd-section pd-trust">
        {['Enterprise Ready','Cloud Native','AI Powered','Scalable Architecture','Secure by Design','Future Proof'].map((b,i)=>(
          <motion.div key={i} className="pd-trust-badge" initial={{opacity:0,scale:0.85}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.45,ease:E,delay:i*0.07}}>
            <Shield size={14}/>{b}
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="pd-cta">
        <div className="pd-cta__bg"><div className="pd-cta__orb pd-cta__orb--1"/><div className="pd-cta__orb pd-cta__orb--2"/></div>
        <motion.div className="pd-cta__inner" {...fUp(0)}>
          <p className="pd-cta__over">Ready To Build?</p>
          <h2 className="pd-cta__h2">Ready To Architect Your<br/>Next Digital Product?</h2>
          <p className="pd-cta__sub">Describe your idea. Our AI recommends the right division, technologies, timeline and transparent pricing within minutes.</p>
          <Link to="/chatbot">
            <motion.button className="pd-cta__btn" whileHover={{scale:1.05,boxShadow:'0 0 50px rgba(255,255,255,0.22)'}} whileTap={{scale:0.97}}>
              Start AI Consultation <ArrowRight size={16}/>
            </motion.button>
          </Link>
        </motion.div>
      </section>
      {activeSol && <SolutionPanel sol={activeSol} onClose={()=>setActiveSol(null)}/>}
    </div>
  );
}