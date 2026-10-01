import { ArrowRight, Bot, BriefcaseBusiness, FileText, Gavel, MapPin, Newspaper, ShieldCheck, Video, TrendingUp, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicNav, Brand } from '../components/layout'
import { useEffect, useRef, useState } from 'react'

const future = [
  ['Find Advocates', 'Discover counsel by specialization, location, experience, fee and availability.', Gavel],
  ['Online Consultation', 'Book consultations and connect through secure video sessions in a later phase.', Video],
  ['AskCounsel', 'Get clear, informational guidance on legal provisions and offences.', Bot],
  ['Document Summarization', 'Turn complex legal PDFs into more understandable summaries.', FileText],
  ['Legal & Current News', 'Stay aware of court, government and current-affairs developments.', Newspaper],
  ['Advocate Map', 'Locate advocates around a convenient chamber location.', MapPin],
  ['Secure Documents', 'Manage and share sensitive legal documents with privacy in mind.', BriefcaseBusiness],
  ['Verified Advocates', 'Advocates will progress through a dedicated verification process.', ShieldCheck]
] as const

// --- Animated Stats Graph Component ---
function StatsGraph() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative p-6 sm:p-8 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <TrendingUp size={20} />
            </span>
            Platform Growth
          </h3>
          <p className="text-sm font-medium text-slate-400 mt-2">Active advocates & users</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <TrendingUp size={14} /> +142%
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="relative h-64 w-full mt-4">
        {/* Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
          {[12, 9, 6, 3, 0].map((tick) => (
            <div key={tick} className="flex items-center w-full gap-4 opacity-60">
              <span className="text-[10px] font-semibold text-slate-500 w-6 text-right">{tick}k</span>
              <div className="h-px flex-1 bg-white/[0.03] border-dashed border-white/[0.02]"></div>
            </div>
          ))}
        </div>
        
        {/* SVG Line Graph */}
        <div className="absolute inset-0 left-10 right-2 bottom-8 top-3">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#3b82f6" />
                 <stop offset="50%" stopColor="#818cf8" />
                 <stop offset="100%" stopColor="#d946ef" />
               </linearGradient>
               <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                 <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="2" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>
             
             {/* Fill Area */}
             <path 
               d="M0,90 C25,80 35,55 50,45 C70,30 85,15 100,5 L100,100 L0,100 Z"
               fill="url(#fillGradient)"
               className="transition-opacity duration-1000 ease-in-out"
               style={{ opacity: isVisible ? 1 : 0, transitionDelay: '0.4s' }}
             />
             
             {/* Animated Line */}
             <path 
               d="M0,90 C25,80 35,55 50,45 C70,30 85,15 100,5" 
               fill="none" 
               stroke="url(#lineGradient)" 
               strokeWidth="2.5"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
               strokeDasharray="200"
               strokeDashoffset={isVisible ? "0" : "200"}
               filter="url(#glow)"
             />
          </svg>
          
          {/* HTML Overlay Points for Perfect Scaling */}
          <div className="absolute inset-0 pointer-events-none">
             {/* Point 1 */}
             <div className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000" style={{ opacity: isVisible ? 1 : 0, transform: `translateY(${isVisible ? '0' : '10px'})`, transitionDelay: '1.2s' }}>
                <div className="relative group pointer-events-auto cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-[2.5px] border-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.6)] group-hover:scale-125 transition-transform"></div>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    5,420 active
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
                  </div>
                </div>
             </div>
             {/* Point 2 */}
             <div className="absolute left-[100%] top-[5%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000" style={{ opacity: isVisible ? 1 : 0, transform: `translateY(${isVisible ? '0' : '10px'})`, transitionDelay: '1.5s' }}>
                <div className="relative group pointer-events-auto cursor-pointer z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-[2.5px] border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.6)] group-hover:scale-125 transition-transform"></div>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 opacity-100">
                    12,180 active
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* X Axis Labels */}
        <div className="absolute left-10 right-2 bottom-0 flex justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jan</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Jun</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dec</span>
        </div>
      </div>
    </div>
  )
}

// Social Icons (Lucide removed brand icons)
const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)
const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)
const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
)
const Github = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

function Footer() {
  return (
    <footer className="bg-mist pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Huge Faint Background Text */}
      <div className="absolute -bottom-12 sm:-bottom-24 left-1/2 -translate-x-1/2 text-[8rem] sm:text-[15rem] font-black text-slate-200/60 select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter">
        LEGALSANGAM
      </div>
      
      {/* Floating Card Footer */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column (Brand, text, socials) */}
          <div className="lg:col-span-5">
            <Brand />
            <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-sm">
              LegalSangam empowers users to navigate legal concerns with clarity—making access to advocates and legal insights easier to understand and act on.
            </p>
            {/* Social Icons */}
            <div className="flex gap-5 mt-8 text-ink">
               <a href="#" className="hover:text-brand transition-colors"><Twitter size={20} /></a>
               <a href="#" className="hover:text-brand transition-colors"><Instagram size={20} /></a>
               <a href="#" className="hover:text-brand transition-colors"><Linkedin size={20} /></a>
               <a href="#" className="hover:text-brand transition-colors"><Github size={20} /></a>
            </div>
          </div>
          
          {/* Right Columns (Links) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-ink mb-6 text-sm">Product</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><Link to="/dashboard/advocates" className="hover:text-ink transition-colors">Find Advocates</Link></li>
                <li><Link to="/dashboard/askcounsel" className="hover:text-ink transition-colors">AskCounsel</Link></li>
                <li><Link to="/dashboard/documents" className="hover:text-ink transition-colors">Summarize PDF</Link></li>
                <li><Link to="/dashboard/news" className="hover:text-ink transition-colors">Legal News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-ink mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#how-it-works" className="hover:text-ink transition-colors">How it Works</a></li>
                <li><a href="#services" className="hover:text-ink transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-ink transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-ink mb-6 text-sm">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><a href="#about" className="hover:text-ink transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-ink transition-colors">Contact</a></li>
                <li><Link to="/login" className="hover:text-ink transition-colors">Advocate Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} LegalSangam. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-ink transition-colors underline decoration-slate-300 underline-offset-4">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors underline decoration-slate-300 underline-offset-4">Terms of Service</a>
            <a href="#" className="hover:text-ink transition-colors underline decoration-slate-300 underline-offset-4">Cookies Settings</a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default function Landing() {
  return (
    <>
      <PublicNav />
      <main>
        {/* HERO SECTION */}
        <section 
          className="relative overflow-hidden bg-mist pt-28 pb-20 lg:pt-36 lg:pb-36 min-h-[90vh] flex items-center"
        >
          {/* Absolute Background Image Layer */}
          <div className="absolute inset-0 z-0">
            {/* Image positioned to the right */}
            <img 
              src="/heroImage.png" 
              alt="Professional Legal Consultation" 
              className="absolute top-0 right-0 w-full lg:w-[65%] h-full object-cover object-top lg:object-[center_top] opacity-90"
            />
            {/* Gradient Mask to fade from solid mist (left) to transparent (right) */}
            <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-mist via-mist/95 to-transparent w-full lg:w-[75%] h-full"></div>
            {/* Additional bottom gradient for mobile blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-mist via-transparent to-transparent h-full lg:hidden"></div>
          </div>
          
          <div className="container-page relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Text Content */}
            <div 
              className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out py-10"
            >
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[4.5rem]">
                Your Legal Problem.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-600">
                  The Right Help.
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-slate-700 font-medium">
                LegalSangam helps you discover advocates, understand legal information, manage documents, and connect for consultations with ease and confidence.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link className="btn-primary group shadow-xl shadow-brand/20 text-base py-3.5 px-8" to="/login">
                  Find an Advocate 
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
                </Link>
                <a className="btn-outline bg-white/60 backdrop-blur-sm border-slate-300 text-ink text-base py-3.5 px-8 shadow-sm hover:bg-white" href="#services">
                  Explore Services
                </a>
              </div>
            </div>
            
            {/* Right Side Empty space to let the hero image show through */}
            <div className="hidden lg:block w-full h-full">
            </div>
          </div>
        </section>

        {/* METRICS & ABOUT SECTION */}
        <section id="about" className="section relative bg-ink text-white overflow-hidden py-24 lg:py-32">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none rounded-full bg-brand blur-3xl"></div>
          <div className="container-page grid gap-16 lg:grid-cols-2 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <p className="eyebrow text-gold">About LegalSangam</p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
                Legal support should be <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-400">easier to begin.</span>
              </h2>
              <div className="relative mt-8">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand to-gold rounded-full"></div>
                <p className="text-lg leading-relaxed text-slate-300 pl-8 py-2 font-medium">
                  LegalSangam simplifies the path from understanding a legal concern to finding suitable advocates, preparing consultations, managing documents, and accessing useful legal information.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 pl-8">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle size={18} className="text-brand" /> Verified Network
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                  <CheckCircle size={18} className="text-gold" /> Secure Platform
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <StatsGraph />
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section bg-mist relative py-24 lg:py-32">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="eyebrow justify-center flex items-center gap-2">
                <span className="h-px w-8 bg-brand"></span>
                Platform services
                <span className="h-px w-8 bg-brand"></span>
              </p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-ink tracking-tight leading-[1.1]">A thoughtful foundation for every legal journey.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {future.map(([title, text, Icon]) => (
                <article className="card group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-slate-100 bg-white/80 backdrop-blur-sm p-6 sm:p-8" key={title}>
                  <div className="size-14 rounded-2xl bg-indigo-50 text-brand grid place-items-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300 shadow-sm border border-indigo-100 group-hover:border-transparent">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-ink group-hover:text-brand transition-colors">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="section bg-white py-24 lg:py-32">
          <div className="container-page text-center">
            <p className="eyebrow justify-center">How it works</p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-ink tracking-tight">A clear route to legal guidance.</h2>
            <div className="mt-20 grid gap-10 md:grid-cols-4 relative text-left">
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
              {['Create an Account', 'Find the Right Advocate', 'Book a Consultation', 'Connect & Get Legal Guidance'].map((s, i) => (
                <div key={s} className="relative group hover:-translate-y-2 transition-transform duration-300 bg-white rounded-2xl">
                  <div className="size-16 rounded-2xl bg-white border-2 border-gold grid place-items-center text-2xl font-black text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all shadow-md group-hover:shadow-gold/20">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-xl text-ink leading-tight">{s}</h3>
                  <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">Step {i+1} ensures a seamless and transparent path toward resolving your legal inquiries.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT US WITH 3D COURTROOM */}
        <section id="contact" className="section bg-ink text-white relative overflow-hidden py-24 lg:py-32">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] opacity-10 pointer-events-none rounded-full bg-gradient-to-bl from-brand to-gold blur-3xl"></div>
          
          <div className="container-page grid gap-16 lg:grid-cols-2 relative z-10 items-center">
            
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <p className="eyebrow text-gold">Immersive Experience</p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Step into the future.</h2>
              <p className="mt-6 text-lg text-slate-300 max-w-md mb-10 font-medium">
                Explore our digital courtroom prototype, where future virtual consultations will bring you face-to-face with legal experts in an immersive environment.
              </p>
              
              {/* 3D Sketchfab Embed */}
              <div className="sketchfab-embed-wrapper w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl relative bg-black/40 group">
                <div className="absolute inset-0 bg-brand/5 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <iframe 
                  title="Courtroom - interior and props" 
                  frameBorder="0" 
                  allowFullScreen 
                  className="w-full h-full relative z-0"
                  allow="autoplay; fullscreen; xr-spatial-tracking" 
                  src="https://sketchfab.com/models/b5eb8825260e43dc8df0629dff4ae6b3/embed?autospin=1&ui_infos=0&ui_controls=1&ui_watermark=0"
                ></iframe>
              </div>
            </div>

            <div className="order-1 lg:order-2 glass-card bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <form onSubmit={e => { e.preventDefault(); alert('Thank you. Contact submissions will be enabled in a future release.') }} className="grid gap-6 relative z-10">
                <h3 className="text-3xl font-bold mb-2 tracking-tight">Get in touch</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="text-sm font-bold text-slate-200 tracking-wide">
                    FIRST NAME
                    <input required className="input mt-2.5 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-brand transition-all" placeholder="John"/>
                  </label>
                  <label className="text-sm font-bold text-slate-200 tracking-wide">
                    LAST NAME
                    <input required className="input mt-2.5 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-brand transition-all" placeholder="Doe"/>
                  </label>
                </div>
                <label className="text-sm font-bold text-slate-200 tracking-wide">
                  EMAIL
                  <input required type="email" className="input mt-2.5 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-brand transition-all" placeholder="john@example.com"/>
                </label>
                <label className="text-sm font-bold text-slate-200 tracking-wide">
                  MESSAGE
                  <textarea required rows={4} className="input mt-2.5 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:border-brand transition-all resize-none" placeholder="How can we help you?"/>
                </label>
                <button className="btn-primary mt-4 bg-brand hover:bg-brand/90 border-transparent shadow-xl shadow-brand/20 transition-all hover:scale-[1.02] py-3.5 text-base" type="submit">
                  Send message
                </button>
              </form>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
