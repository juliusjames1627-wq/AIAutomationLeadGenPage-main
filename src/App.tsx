import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Search,
  BarChart3,
  MessageSquare,
  Zap,
  Clock,
  TrendingUp,
  Users,
  Play,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Globe,
  Building2,
  Loader2,
  Cpu,
  Layers,
} from 'lucide-react';

// --- Data ---

const testimonials = [
  {
    name: "Sarah Chen",
    role: "COO at Nexa Logistics",
    quote: "The audit opened our eyes to 15+ hours of manual data entry we were doing every week. Meridian didn't just point it out; they showed us exactly how to automate it.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, Thorne Media",
    quote: "I was skeptical about a 'free audit,' but the report was incredibly detailed. We've already implemented two of their suggestions and saved 10 hours a week.",
    avatar: "MT"
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Manager, Bloom Health",
    quote: "Clear, jargon-free advice. They understood our specific constraints and provided a roadmap that actually felt achievable for our team size.",
    avatar: "ER"
  }
];

const faqs = [
  {
    question: "What does the audit actually cost?",
    answer: "It's 100% free. No hidden fees, no credit card required. Our goal is to demonstrate value first and see if we're a good fit to work together long-term."
  },
  {
    question: "How long does the process take?",
    answer: "The initial form takes 3 minutes. After that, we do our analysis and meet for a 45-minute walkthrough. You'll have your results within 48 hours of our call."
  },
  {
    question: "What if I'm a small startup?",
    answer: "We typically work with businesses of 10+ employees where operational friction is starting to hit scale. However, if you have high-volume repeatable tasks, the audit is still valuable."
  },
  {
    question: "Do you need access to our sensitive data?",
    answer: "No. During the audit, we only need to understand your workflows and high-level process steps. We never ask for passwords or sensitive customer data at this stage."
  }
];

// --- Components ---

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-teal-400' : 'text-white group-hover:text-teal-400'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-teal-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" />
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="text-gray-400 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

function ExpandableChecklist() {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    "CRM & Lead Management workflows",
    "Internal communication & Slack/Email triage",
    "Data entry & reporting bottlenecks",
    "Customer onboarding processes",
    "Document generation & management",
    "Repetitive scheduling & task management"
  ];

  return (
    <div className="mt-6 border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-300">See exactly what gets audited</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-teal-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[400px] border-t border-white/10' : 'max-h-0'}`}>
        <div className="p-5 grid grid-cols-1 gap-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500/50" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExitIntentModal({ onClose, onAccept }: { onClose: () => void, onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="premium-glass border-teal-500/30 rounded-3xl p-10 max-w-lg w-full text-center animate-in fade-in zoom-in duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
        <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-teal-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Wait! Don't leave empty-handed</h3>
        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
          Get our <span className="text-white font-semibold">"Top 5 Automation Wins for 2026"</span> PDF guide for free before you go.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={onAccept}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(20,184,166,0.3)]"
          >
            Send Me the Guide
          </button>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            No thanks, I'll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}

function AuditModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    companySize: '',
    phone: '',
    challenge: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!form.company.trim()) newErrors.company = "Company name is required";
    }
    if (currentStep === 2) {
      if (!form.industry) newErrors.industry = "Industry is required";
      if (!form.companySize) newErrors.companySize = "Company size is required";
    }
    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted to Bolt Database:', {
        ...form,
        timestamp: new Date().toISOString(),
        source: 'audit_modal'
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="premium-glass rounded-3xl p-10 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-teal-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">You're all set</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            We'll review your details and reach out within one business day to schedule your audit at a time that works for you.
          </p>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="premium-glass rounded-3xl p-8 max-w-lg w-full relative my-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-300 transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-white">Request Your Free Audit</h3>
            <span className="text-xs font-medium text-teal-500/70 bg-teal-500/5 px-2 py-1 rounded border border-teal-500/10">Step {step}/3</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Johnson"
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all`}
                  />
                  {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Work Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all`}
                  />
                  {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="Acme Corp"
                  className={`w-full bg-white/5 border ${errors.company ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all`}
                />
                {errors.company && <p className="text-[10px] text-red-400 mt-1">{errors.company}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Industry</label>
                  <select
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.industry ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all appearance-none`}
                  >
                    <option value="" disabled className="bg-[#111]">Select Industry</option>
                    <option value="logistics" className="bg-[#111]">Logistics</option>
                    <option value="saas" className="bg-[#111]">SaaS</option>
                    <option value="healthcare" className="bg-[#111]">Healthcare</option>
                    <option value="finance" className="bg-[#111]">Finance</option>
                    <option value="other" className="bg-[#111]">Other</option>
                  </select>
                  {errors.industry && <p className="text-[10px] text-red-400 mt-1">{errors.industry}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1.5">Company Size</label>
                  <select
                    value={form.companySize}
                    onChange={e => setForm({ ...form, companySize: e.target.value })}
                    className={`w-full bg-white/5 border ${errors.companySize ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-all appearance-none`}
                  >
                    <option value="" disabled className="bg-[#111]">Select size</option>
                    <option value="1-10" className="bg-[#111]">1-10 employees</option>
                    <option value="11-50" className="bg-[#111]">11-50 employees</option>
                    <option value="51-200" className="bg-[#111]">51-200 employees</option>
                    <option value="201+" className="bg-[#111]">201+ employees</option>
                  </select>
                  {errors.companySize && <p className="text-[10px] text-red-400 mt-1">{errors.companySize}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">Biggest operational challenge</label>
                <textarea
                  value={form.challenge}
                  onChange={e => setForm({ ...form, challenge: e.target.value })}
                  placeholder="e.g. Manual data entry, slow onboarding, repetitive reporting..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                />
                <p className="text-[10px] text-gray-500 mt-2">The more detail you provide, the better we can prepare for your audit.</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-[2] bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 text-black font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Submit Request
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-gray-600 text-center">We never share your information with third parties.</p>
            <p className="text-[10px] text-teal-500/70 text-center font-medium italic">You'll hear from us by tomorrow at 9 AM</p>
          </div>
        </form>
      </div>
    </div>
  );
}


function ComparisonSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
  const [position, setPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const newPosition = ((x - container.left) / container.width) * 100;
      
      setPosition(Math.min(Math.max(newPosition, 0), 100));
    };

    const handleEnd = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className="comparison-slider aspect-video relative cursor-ew-resize group select-none touch-none"
      onMouseDown={() => setIsResizing(true)}
      onTouchStart={() => setIsResizing(true)}
    >
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="scan-line" />
      </div>

      {/* Before Image */}
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Manual Chaos" className="comparison-image object-cover h-full w-full grayscale opacity-40 brightness-50" />
        <div className="absolute top-8 left-8 z-10 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Current Reality</span>
          </div>
          <div className="text-sm font-bold text-white uppercase tracking-tight">Manual Chaos</div>
        </div>
        
        {/* Chaos Markers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[20%] left-[30%] px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm animate-pulse-slow">
              <span className="text-[8px] font-bold text-red-400/70 uppercase tracking-widest">Inefficiency Detected</span>
           </div>
           <div className="absolute bottom-[40%] right-[20%] px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm animate-pulse-slow delay-700">
              <span className="text-[8px] font-bold text-red-400/70 uppercase tracking-widest">Lost Hours</span>
           </div>
        </div>
      </div>

      {/* After Image */}
      <div 
        className="comparison-overlay absolute inset-0 z-10 border-r border-teal-500/50"
        style={{ width: `${position}%` }}
      >
        <img src={afterImage} alt="Automated Clarity" className="comparison-image object-cover h-full w-full" />
        <div className="absolute top-8 left-8 z-10 px-4 py-2 bg-teal-500/20 backdrop-blur-xl border border-teal-500/30 rounded-xl shadow-[0_0_30px_rgba(20,184,166,0.2)]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Meridian Optimized</span>
          </div>
          <div className="text-sm font-bold text-white uppercase tracking-tight">System Clarity</div>
        </div>

        {/* Clarity Markers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[15%] left-[25%] px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full backdrop-blur-sm animate-pulse-slow">
              <span className="text-[8px] font-bold text-teal-400/70 uppercase tracking-widest">Autonomous Core</span>
           </div>
           <div className="absolute bottom-[30%] right-[15%] px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full backdrop-blur-sm animate-pulse-slow delay-1000">
              <span className="text-[8px] font-bold text-teal-400/70 uppercase tracking-widest">94% Faster</span>
           </div>
        </div>
      </div>

      {/* Handle */}
      <div 
        className="comparison-handle flex flex-col items-center justify-center gap-3 z-30"
        style={{ left: `${position}%` }}
      >
        <div className="h-full w-px bg-gradient-to-b from-transparent via-teal-500 to-transparent" />
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.5)] border-4 border-[#080808] group-hover:scale-110 transition-transform">
          <div className="flex gap-1">
             <div className="w-0.5 h-3 bg-black rounded-full" />
             <div className="w-0.5 h-3 bg-black rounded-full" />
          </div>
        </div>
        <div className="h-full w-px bg-gradient-to-b from-transparent via-teal-500 to-transparent" />
      </div>

      {/* Drag Hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500 ${isResizing ? 'opacity-0' : 'opacity-100'}`}>
        <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3">
          <div className="flex gap-1 animate-bounce-horizontal">
             <ArrowLeft className="w-3 h-3 text-gray-500" />
             <ArrowRight className="w-3 h-3 text-gray-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Slide to reveal clarity</span>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setExitIntentOpen(true);
        setHasShownExitIntent(true);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_pct = (winScroll / height) * 100;
      setScrollProgress(scrolled_pct);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['hero', 'audit', 'wins', 'process', 'faq'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [hasShownExitIntent]);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans antialiased selection:bg-teal-500/30 grainy-bg">
      {/* Floating Side CTA */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
        <button
          onClick={() => setModalOpen(true)}
          className="premium-glass hover:bg-teal-500 hover:text-black text-teal-400 font-bold py-6 px-2 rounded-l-2xl transition-all duration-500 vertical-text shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:translate-x-[-4px] border-r-0"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Secure Your Free Audit
        </button>
      </div>

      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {videoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <button 
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Workflow Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {modalOpen && <AuditModal onClose={() => setModalOpen(false)} />}
      {exitIntentOpen && (
        <ExitIntentModal 
          onClose={() => setExitIntentOpen(false)} 
          onAccept={() => {
            setExitIntentOpen(false);
            setModalOpen(true);
          }} 
        />
      )}

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${scrolled ? 'premium-glass border-white/10 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-black" fill="currentColor" />
              </div>
              <span className="font-bold text-white tracking-tight text-lg">Meridian AI</span>
            </div>
            
            {scrolled && (
              <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 animate-in fade-in slide-in-from-left-4 duration-500">
                <span className="w-1 h-1 bg-gray-700 rounded-full" />
                <span className="text-teal-500/50">{activeSection}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-sm font-medium transition-colors hidden sm:block ${activeSection === 'process' ? 'text-teal-400' : 'text-gray-400 hover:text-teal-400'}`}
            >
              How it works
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-all"
            >
              Free Audit
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="px-6 pt-32 pb-24 max-w-5xl mx-auto text-center relative overflow-hidden">
        {/* Abstract Background Graphic */}
        <div className="absolute inset-0 -z-10 opacity-40">
           <img 
            src="/assets/hero-bg.png" 
            alt="Abstract Background" 
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/0 via-[#080808]/50 to-[#080808]" />
        </div>

        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-teal-400 text-[10px] font-bold tracking-widest uppercase">Expert AI Automation Consulting</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Stop doing work
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            a system can do
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          We identify operational friction in your business and replace manual workflows with custom AI systems. 
          Maximize your team's output without adding to the payroll.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 mb-16">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300 text-lg group shadow-[0_12px_40px_rgba(20,184,166,0.3)] hover:scale-105 active:scale-95 animate-pulse-teal"
          >
            Secure Your Free Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-300 text-lg group"
            onClick={() => setVideoOpen(true)}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
            See a Workflow in Action
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 mb-16">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080808] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Recently helped <span className="text-gray-300 font-medium">Bolt</span>, <span className="text-gray-300 font-medium">Stripe</span> & <span className="text-gray-300 font-medium">40+ others</span>
          </p>
        </div>

        {/* Integration Row */}
        <div className="pt-12 border-t border-white/5 animate-in fade-in duration-1000">
           <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-8">Built on the world's most reliable automation stacks</p>
           <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                { icon: Cpu, name: 'OpenAI' },
                { icon: Zap, name: 'Zapier' },
                { icon: Layers, name: 'Make.com' },
                { icon: Globe, name: 'Anthropic' },
                { icon: MessageSquare, name: 'Slack' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-teal-400 transition-all duration-300 cursor-default group relative">
                  <div className="absolute inset-0 bg-teal-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-all relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-24 pt-12 border-t border-white/5">
          {[
            { value: '40+', label: 'Workflows automated' },
            { value: '12 hrs', label: 'Avg. saved per week' },
            { value: '94%', label: 'Client satisfaction' },
          ].map(stat => (
            <div key={stat.label} className="group cursor-default">
              <div className="text-3xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Row */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2"><Building2 className="w-5 h-5" /><span className="font-bold text-lg">LOGOTECH</span></div>
            <div className="flex items-center gap-2"><Globe className="w-5 h-5" /><span className="font-bold text-lg">GLOBAL_OPS</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /><span className="font-bold text-lg">SECURE_FLOW</span></div>
            <div className="flex items-center gap-2"><Zap className="w-5 h-5" /><span className="font-bold text-lg">FAST_SCALE</span></div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="audit" className="px-6 py-24 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0c0c0c] to-[#080808]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/[0.03] blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] -z-10" />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                What's included in the free audit
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                A structured, 45-minute review of your current operations. We look at where your team's time goes,
                what's repetitive, and where AI can realistically help.
              </p>

              <div className="grid gap-4">
                {[
                  {
                    icon: Search,
                    title: 'Workflow mapping',
                    desc: 'We document your existing processes to identify high-effort, low-complexity tasks ideal for automation.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Time & cost analysis',
                    desc: 'Estimate how many hours per week could be reclaimed and what that translates to in real dollars.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Prioritized opportunities',
                    desc: 'A ranked list of automation candidates sorted by impact vs. implementation effort.',
                  },
                  {
                    icon: MessageSquare,
                    title: 'Plain-language recommendations',
                    desc: 'No jargon. Practical, honest advice on what makes sense for your team size and tech stack.',
                  },
                ].map(item => (
                  <div key={item.title} className="flex gap-5 p-5 rounded-2xl transition-all premium-shadow-hover group border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                      <item.icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base mb-1">{item.title}</div>
                      <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-6 rounded-2xl bg-red-500/5 border border-red-500/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <TrendingUp className="w-12 h-12 text-red-500" />
                  </div>
                  <h4 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">The Cost of Inaction</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Manual data entry errors cost mid-sized businesses an average of <span className="text-white font-bold">$12,000/month</span> in reclaimed labor and lost opportunities. 
                    <span className="block mt-2 font-medium text-gray-300">That's $144k/year leaking from your bottom line.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Decorative pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Zap className="w-24 h-24" />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Who this is for</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Operations-heavy businesses with 10–200 employees
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8">
                  If your team spends meaningful time on tasks like data entry, report generation, email triage,
                  or internal coordination — this audit is designed for you.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'You have repeatable internal processes',
                    'Your team spends hours on low-judgment tasks',
                    'You want to scale output without hiring proportionally',
                    "You're open to practical AI adoption, not hype",
                  ].map(point => (
                    <div key={point} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                      </div>
                      <span className="text-gray-300 font-medium">{point}</span>
                    </div>
                  ))}
                </div>

                <ExpandableChecklist />

                <div className="mt-10">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(20,184,166,0.3)]"
                  >
                    Start Your Free Audit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                   <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                      <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                      <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                      <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                      <Star className="w-3 h-3 text-teal-400 fill-teal-400" />
                   </div>
                   <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Highly rated by Ops leaders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What our clients say</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real results from growing businesses that chose to automate the mundane.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 premium-shadow-hover group">
                <div className="flex items-center gap-1 mb-6 text-teal-500">
                  <Star className="w-4 h-4 fill-teal-500" />
                  <Star className="w-4 h-4 fill-teal-500" />
                  <Star className="w-4 h-4 fill-teal-500" />
                  <Star className="w-4 h-4 fill-teal-500" />
                  <Star className="w-4 h-4 fill-teal-500" />
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Spotlight */}
          <div className="max-w-4xl mx-auto">
             <div 
               onClick={() => setVideoOpen(true)}
               className="relative group cursor-pointer rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
             >
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070" 
                  className="w-full h-[400px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  alt="Customer Spotlight"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(20,184,166,0.5)] group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black fill-black ml-1" />
                   </div>
                   <div className="mt-6 text-center">
                      <p className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-2">Customer Spotlight</p>
                      <h3 className="text-2xl font-bold text-white">How Bolt saved 400+ hours with Meridian</h3>
                   </div>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Common Wins */}
      <section id="wins" className="px-6 py-24 bg-[#0a0a0a] border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Common Automation Wins</h2>
            <p className="text-gray-400">Real-world examples of what we've solved for similar companies.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Logistics Ops",
                problem: "Manual data entry from 100+ daily manifests into CRM.",
                win: "AI OCR system reduced data entry time by 85%.",
                savings: "20 hours/week"
              },
              {
                title: "SaaS Sales",
                problem: "Lead qualification taking 48 hours per inquiry.",
                win: "AI triage bot now qualifies leads in < 2 minutes.",
                savings: "15% increase in conversion"
              },
              {
                title: "Professional Services",
                problem: "Repetitive reporting and invoice generation.",
                win: "Automated pipeline saved $4k/month in admin costs.",
                savings: "$48,000 annually"
              },
              {
                title: "E-commerce Support",
                problem: "High volume of 'Where is my order?' tickets.",
                win: "AI agent handles 60% of tier-1 support autonomously.",
                savings: "92% faster response time"
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 premium-shadow-hover group relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="scan-line" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">{item.title}</span>
                    <div className="bg-teal-500/10 text-teal-400 text-[10px] font-bold px-2 py-1 rounded">-{item.savings}</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Problem</div>
                      <p className="text-gray-400 text-sm">{item.problem}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-[10px] text-teal-500/70 uppercase font-bold mb-1">Solution & Win</div>
                      <p className="text-white text-sm font-medium">{item.win}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="px-6 py-32 bg-black relative overflow-hidden">
         {/* Background Effects */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
         <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/[0.02] blur-[150px] -z-10" />
         <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[150px] -z-10" />

         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20 relative">
               <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-6">
                  <Layers className="w-3 h-3 text-teal-400" />
                  <span className="text-teal-400 text-[10px] font-bold tracking-widest uppercase">The Transformation</span>
               </div>
               <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  From Operational Friction <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">to System Autonomy</span>
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  Most businesses are held back by manual processes that don't scale. 
                  We replace the chaos of spreadsheets and internal pings with a single, automated operating system.
               </p>
            </div>

            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
               <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl bg-[#080808] z-10">
                  <ComparisonSlider 
                    beforeImage="/assets/transformation-before.png" 
                    afterImage="/assets/transformation-after.png" 
                  />
               </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mt-16">
               {[
                  { 
                    label: 'Workflow speed', 
                    before: '48-72 hours', 
                    after: '< 2 minutes',
                    desc: 'Lead triage and qualification'
                  },
                  { 
                    label: 'Operational Cost', 
                    before: '$12k/mo', 
                    after: '$1.4k/mo',
                    desc: 'Manual data entry labor'
                  },
                  { 
                    label: 'Accuracy Rate', 
                    before: '84%', 
                    after: '99.9%',
                    desc: 'Systemized data integrity'
                  },
               ].map((metric, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 premium-shadow-hover">
                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{metric.label}</div>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="text-sm font-bold text-red-400 line-through opacity-50">{metric.before}</div>
                        <ArrowRight className="w-3 h-3 text-gray-600" />
                        <div className="text-lg font-extrabold text-teal-400">{metric.after}</div>
                     </div>
                     <p className="text-xs text-gray-500 leading-relaxed">{metric.desc}</p>
                  </div>
               ))}
            </div>

            <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-teal-500/10 via-transparent to-transparent border border-teal-500/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/[0.05] to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms]" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                     <h3 className="text-2xl font-bold text-white mb-3">Ready to reclaim your time?</h3>
                     <p className="text-gray-400 text-lg">Our audit identifies exactly which manual tasks are ready for retirement.</p>
                  </div>
                  <button 
                     onClick={() => setModalOpen(true)}
                     className="bg-teal-500 hover:bg-teal-400 text-black font-bold px-10 py-5 rounded-2xl transition-all shadow-[0_10px_40px_rgba(20,184,166,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3 whitespace-nowrap"
                   >
                     Secure My Free Audit
                     <Zap className="w-5 h-5 fill-black" />
                  </button>
               </div>
            </div>
         </div>
         <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      </section>

      {/* Process */}
      <section id="process" className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 uppercase tracking-tight">The 3-Step Process</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A simple, low-friction process. We do the work; you decide whether it makes sense to go further.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-10 h-px" style={{ left: 'calc(16.67% + 1.5rem)', right: 'calc(16.67% + 1.5rem)', borderTop: '1px dashed rgba(255,255,255,0.1)' }} />

            {[
              {
                step: '01',
                icon: MessageSquare,
                title: 'You share context',
                desc: "Fill out a short form about your business and the operational areas where time gets lost. Takes 3 minutes.",
              },
              {
                step: '02',
                icon: Search,
                title: 'We do analysis',
                desc: "Our team reviews your inputs and prepares a structured picture of your automation opportunities.",
              },
              {
                step: '03',
                icon: Clock,
                title: 'Together walk-through',
                desc: "A 45-minute working session where we share findings and give you a clear picture of what's possible.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl p-8 transition-all hover:bg-white/[0.04] group border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                    <item.icon className="w-6 h-6 text-teal-400 group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-sm font-mono text-gray-600 font-bold tracking-widest">{item.step}</span>
                </div>
                <h3 className="font-bold text-white mb-3 text-lg leading-tight group-hover:text-teal-400 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-8 text-center max-w-2xl mx-auto relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              After the session, you'll have a clear view of what automation could look like.
              <span className="text-teal-400 font-bold"> No obligation to continue.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-400">Everything you need to know about the automation audit.</p>
          </div>
          <div className="divide-y divide-white/5 border-y border-white/5">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-28 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-[120px] -z-10" />
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to reclaim your team's time?
          </h2>
          <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-xl mx-auto">
            The audit is free, the analysis is thorough, and the results are yours to keep. Response within one business day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300 text-lg group shadow-[0_10px_40px_rgba(20,184,166,0.3)]"
            >
              Secure Your Free Audit
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-12 opacity-50">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-teal-400" /><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">NDA Protected</span></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-teal-400" /><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">GDPR Compliant</span></div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-teal-400" /><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ISO Certified</span></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-black" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Meridian AI</span>
            </div>
            <p className="text-xs text-gray-600 max-w-xs text-center sm:text-left">
              Helping operations-heavy businesses leverage practical AI to scale efficiency and output.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-6 mb-2">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-[10px] text-gray-800 uppercase tracking-widest font-bold">© 2026 Meridian AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
