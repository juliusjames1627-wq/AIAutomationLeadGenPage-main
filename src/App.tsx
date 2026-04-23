import { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Search,
  BarChart3,
  MessageSquare,
  ChevronRight,
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

function AuditModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', challenge: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.company.trim()) newErrors.company = "Company name is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API call to "Bolt Database"
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted to Bolt Database:', {
        ...form,
        timestamp: new Date().toISOString(),
        source: 'audit_modal'
      });
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
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
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative my-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-300 transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold text-white mb-1">Request Your Free Audit</h3>
        <p className="text-gray-400 text-sm mb-6">No commitment required. We'll get back to you within one business day.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1.5">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Alex Johnson"
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.08] transition-all`}
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
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Biggest operational challenge (optional)</label>
            <textarea
              value={form.challenge}
              onChange={e => setForm({ ...form, challenge: e.target.value })}
              placeholder="e.g. Manual data entry, slow onboarding, repetitive reporting..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 text-black font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
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
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-gray-600 text-center">We never share your information with third parties.</p>
            <p className="text-[10px] text-teal-500/70 text-center font-medium italic">You'll hear from us by tomorrow at 9 AM</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans antialiased selection:bg-teal-500/30">
      {modalOpen && <AuditModal onClose={() => setModalOpen(false)} />}

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-black/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-black" fill="currentColor" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">Meridian AI</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm font-medium text-gray-400 hover:text-teal-400 transition-colors hidden sm:block"
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
      <section className="px-6 pt-32 pb-20 max-w-5xl mx-auto text-center relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[120px] -z-10" />

        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-teal-400 text-xs font-medium tracking-wide uppercase">AI Automation Consulting</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Stop doing work
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            a system can do
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          We help growing businesses identify which operations can be automated with AI — and build those systems.
          Less manual work. More consistent output. Fewer errors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base group shadow-[0_8px_32px_rgba(20,184,166,0.25)]"
          >
            Get Your Free Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-base group"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch Demo
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12">
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
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
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
      <section className="px-6 py-24 relative overflow-hidden">
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
                  <div key={item.title} className="flex gap-5 p-5 rounded-2xl transition-all hover:bg-white/[0.04] group border border-white/5 hover:border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                      <item.icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base mb-1">{item.title}</div>
                      <div className="text-gray-500 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
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

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(20,184,166,0.3)]"
                >
                  Start Your Free Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-teal-500/30 transition-all duration-300 group">
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
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-24">
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
            ].map((item, i) => (
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
      <section className="px-6 py-24 bg-black">
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
              Get Your Free Audit
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
