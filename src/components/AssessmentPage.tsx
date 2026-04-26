import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export function AssessmentPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] uppercase font-bold tracking-[0.2em] rounded mb-8"
            >
              Premium 1-on-1 Consulting
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
              Paid AI Tools <br/><span className="text-indigo-500">Assessment.</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-xl mb-10">
              Stop wasting weeks watching YouTube tutorials. Pay for expert guidance and get a custom AI implementation plan in 45 minutes.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <a 
                href="#booking"
                className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-[0.2em] uppercase transition-all shadow-2xl shadow-indigo-600/20"
              >
                Book Your Call — $149
              </a>
              <p className="text-xs text-slate-500 font-medium italic">
                Limited to 4 sessions per week.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">Guaranteed Time Savings</span>
                </div>
                <div className="h-px bg-slate-800" />
                <ul className="space-y-4">
                  {[
                    "Deep-dive into your actual workflow",
                    "Identification of 'Time Leaks'",
                    "Specific AI tool recommendations",
                    "Custom 7-day implementation roadmap"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-32">
          <div className="border-l-4 border-indigo-500 pl-8 mb-16">
            <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white uppercase">The 45-Minute Session</h2>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-medium opacity-50">Expert Guidance / Zero Fluff</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-lg">
              <div className="text-indigo-500 mb-6 font-mono text-sm">STEP_01</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">The Reveal</h3>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "You show us exactly how you work. We look for the friction points where your time is being stolen by manual data entry or repetitive tasks."
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-lg">
              <div className="text-indigo-500 mb-6 font-mono text-sm">STEP_02</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Tool Selection</h3>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "We don't recommend everything. We point out the 2-3 specific AI tools that fit your existing tech stack and skill level."
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-lg">
              <div className="text-indigo-500 mb-6 font-mono text-sm">STEP_03</div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">The Blueprint</h3>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                "You leave the call with a custom plan. Exact steps on what to click, which prompts to use, and how to reclaim your weekend."
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form CTA */}
        <section id="booking" className="scroll-mt-32">
          <div className="bg-indigo-600 rounded-2xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rotate-45 translate-x-32 -translate-y-32 blur-3xl" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter leading-none">
                Stop guessing. <br/>Start automating.
              </h2>
              <p className="text-indigo-100 text-lg mb-10 font-medium">
                Book your session today and stop wasting time figuring out AI yourself. Limited availability.
              </p>
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="WORK EMAIL" 
                  className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 p-4 rounded text-xs font-bold tracking-widest outline-none focus:bg-white/20 transition-all"
                />
                <button className="bg-white text-indigo-600 font-black text-xs uppercase tracking-[0.3em] p-4 rounded hover:bg-slate-100 transition-all">
                  SECURE SPOT
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
