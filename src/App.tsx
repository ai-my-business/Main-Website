/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Clock,
  CheckCircle2,
  Brain,
  AlertCircle, 
  ChevronDown, 
  Search, 
  FileText, 
  Users, 
  Lightbulb,
  MousePointer2,
  Workflow,
  Sparkles,
  Menu,
  X,
  Video,
  BarChart3,
  ShieldCheck,
  XCircle,
  Calendar,
  MessageSquare,
  Lock,
  Zap,
  TrendingUp,
  ShieldAlert,
  Rocket
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: string) => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-white">Ai My Business</span>
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <button onClick={() => handleNav('problem')} className={`hover:text-white transition-colors ${currentView === 'problem' ? 'text-white underline underline-offset-4' : ''}`}>The Problem</button>
          <button onClick={() => handleNav('solution')} className={`hover:text-white transition-colors ${currentView === 'solution' ? 'text-white underline underline-offset-4' : ''}`}>The Solution</button>
          <button onClick={() => handleNav('results')} className={`hover:text-white transition-colors ${currentView === 'results' ? 'text-white underline underline-offset-4' : ''}`}>The Results</button>
          <button onClick={() => handleNav('quiz')} className={`hover:text-white transition-colors ${currentView === 'quiz' ? 'text-white underline underline-offset-4' : ''}`}>AI Quiz</button>
          <button onClick={() => handleNav('about')} className={`hover:text-white transition-colors ${currentView === 'about' ? 'text-white underline underline-offset-4' : ''}`}>About</button>
          <button onClick={() => handleNav('contact')} className={`hover:text-white transition-colors ${currentView === 'contact' ? 'text-white underline underline-offset-4' : ''}`}>Contact</button>
          <button 
            onClick={() => handleNav('book')} 
            className="bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all font-bold text-sm"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-6 items-center border border-white/10">
            <button onClick={() => handleNav('home')} className="text-lg font-medium">Home</button>
            <button onClick={() => handleNav('problem')} className="text-lg font-medium">The Problem</button>
            <button onClick={() => handleNav('solution')} className="text-lg font-medium">The Solution</button>
            <button onClick={() => handleNav('results')} className="text-lg font-medium">The Results</button>
            <button onClick={() => handleNav('quiz')} className="text-lg font-medium">AI Quiz</button>
            <button onClick={() => handleNav('about')} className="text-lg font-medium">About Us</button>
            <button onClick={() => handleNav('contact')} className="text-lg font-medium">Contact</button>
            <button 
              onClick={() => handleNav('book')} 
              className="w-full bg-white text-black px-5 py-3 rounded-xl font-bold"
            >
              Book Now
            </button>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ children, badge, align = 'center' }: { children: React.ReactNode, badge?: string, align?: 'center' | 'left' }) => (
  <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} mb-16 px-4`}>
    {badge && (
      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
      {children}
    </h2>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-white/80 transition-colors"
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-zinc-500 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>
      {isOpen && (
        <div className="overflow-hidden">
          <p className="pb-6 text-zinc-400 leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

// --- Pages ---

const Home = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
  <>
    {/* Hero Section */}
    <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/HeroImage.jpg)" }}
      />
      {/* Uniform overlay so image shows through across full width */}
      <div className="absolute inset-0 bg-zinc-950/65" />
      {/* Bottom fade into site background */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            Ready to Win Back <span className="text-gradient">5–10 Hours</span> a Week?<br className="hidden lg:block" /> Save Time & <span className="text-gradient">Automate</span> Your Business!
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            No tech skills. No complicated setups. Just clear, practical improvements to your daily workflow. Find AI opportunities with our free 3-Min Ai Audit Quiz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => onNavigate("quiz")}
              className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10"
            >
              Free AI Audit Quiz
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-400 font-medium">
            <span>✓ Takes 3 mins</span>
            <span>✓ Completely Free</span>
            <span>✓ Immediate recommendations</span>
          </div>
        </div>
      </div>
    </section>

    {/* Short Problem Summary */}
    <section className="py-24 px-6 bg-white/[0.01]">
       <div className="max-w-7xl mx-auto">
          <SectionHeading badge="How It Works">From first call to real results</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               {
                 icon: Video,
                 title: "1. 30-Min Discovery Call",
                 text: "A focused conversation to understand your business, current tools, and biggest time drains before we dive deeper.",
                 action: () => onNavigate("book")
               },
               {
                 icon: Search,
                 title: "2. Audit",
                 text: "A thorough business deep dive into your real workflows, identifying exactly where AI can deliver the highest ROI.",
                 action: () => onNavigate("book")
               },
               {
                 icon: FileText,
                 title: "3. Proposal",
                 text: "A clear, tailored proposal outlining the recommended AI systems, expected time savings, and implementation roadmap.",
                 action: () => onNavigate("book")
               },
               {
                 icon: Rocket,
                 title: "4. Implementation & Review",
                 text: "We build and deploy your AI systems, then review performance to ensure you're seeing real, measurable results.",
                 action: () => onNavigate("book")
               }
             ].map((item, i) => (
                <div key={i} className="p-8 glass rounded-3xl border-white/5 flex flex-col h-full">
                   <item.icon className="w-8 h-8 text-blue-400 mb-6" />
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-grow">{item.text}</p>
                   <button onClick={item.action} className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform mt-auto group">
                      Get Started <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => onNavigate('book')}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-zinc-400 font-medium mt-6">
            <span>✓ Guided Every Step of the Way</span>
            <span>✓ Money Back Guarantee</span>
            <span>✓ Results-Focused Solutions</span>
          </div>
       </div>
    </section>

    {/* Quote */}
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl md:text-2xl text-zinc-400 italic font-light leading-relaxed">
          "The gap between early AI adopters and the rest is widening every week."
        </p>
      </div>
    </section>

    {/* Support CTA */}
    <section className="py-24 px-6">
       <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Audience">Who this is designed for</SectionHeading>

          <div className="max-w-3xl mx-auto">
             <div className="p-10 glass rounded-[2.5rem] border-green-500/10 bg-green-500/[0.01]">
                <h3 className="text-2xl font-bold mb-8 text-green-400">You'll feel right at home if…</h3>
                <ul className="space-y-6">
                   {[
                     "You're juggling a solo or small business and don't know what to start with AI.",
                     "You've experimented with tools like ChatGPT but don't have a clear system in place.",
                     "You're frustrated with tutorials that assume you already know a dozen other tools.",
                     "You're after quick, practical wins this week—not another 10-hour course. You want value not content."
                   ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                         </div>
                         <span className="text-zinc-300 text-lg leading-relaxed">{item}</span>
                      </li>
                   ))}
                </ul>
             </div>
             <div className="flex justify-center mt-8">
               <button
                 onClick={() => onNavigate('problem')}
                 className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
               >
                 See Where You're Wasting Time <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          </div>
       </div>
    </section>

    {/* Support CTA Footer */}
    <section className="py-32 px-6">
       <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden border-white/10">
          <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Stop Guessing Where to Start with AI</h2>
             <p className="text-lg text-zinc-400 mb-12">Take a quick quiz to identify what kind of opportunities are available for your business.</p>
             <button onClick={() => onNavigate('quiz')} className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all">
                Free AI Audit Quiz
             </button>
          </div>
       </div>
    </section>
  </>
);

const ProblemPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading badge="The Reality" align="left">Still Not Using AI in Your Business?</SectionHeading>

        <div className="mb-24">
           <div className="space-y-12">
              <div className="space-y-6">
                 <h3 className="text-3xl font-bold text-white leading-tight">While others are saving time and cutting costs, most businesses are still stuck figuring out where to start.</h3>
                 <p className="text-xl text-zinc-400 leading-relaxed font-light">
                    We'll show you exactly where AI can deliver results.
                 </p>
              </div>

              <div className="p-10 glass rounded-[2.5rem] border-blue-500/10 bg-blue-500/[0.02] relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <AlertCircle className="w-24 h-24 text-blue-400" />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <p className="text-xl text-zinc-300 leading-relaxed">
                       Because the real issue isn't access to AI—it's <strong>clarity on what to actually do first.</strong>
                    </p>
                    <div className="space-y-4">
                       <p className="text-zinc-400">So you stay stuck doing 10+ hours a week of work that should take minutes:</p>
                       <ul className="space-y-3">
                          {[
                            "Following up with leads manually",
                            "Posting to social media inconsistently — or not at all",
                            "Missing calls and losing enquiries after hours",
                            "Pulling data from spreadsheets by hand every week",
                            "Answering the same repetitive questions over and over"
                          ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-zinc-200 font-medium">
                                <XCircle className="w-5 h-5 text-red-500/50" />
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                    <p className="text-zinc-500 italic font-medium">Week after week.</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <p className="text-lg text-zinc-400 leading-relaxed">
                    Meanwhile, competitors are quietly automating those exact tasks and pulling ahead.
                 </p>
              </div>

              {/* Five problem areas */}
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold text-white">Here's where it's costing you most:</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        title: "Lead Generation",
                        problems: [
                          "Manually trawling LinkedIn and databases for prospects",
                          "Inconsistent outreach with no repeatable system",
                          "Paying for cold leads that are already stale"
                        ]
                      },
                      {
                        title: "Lead Follow-Up",
                        problems: [
                          "Warm leads fall through the cracks after the first touch",
                          "No consistent follow-up process — just memory and good intentions",
                          "Revenue lost to competitors who simply stayed in touch"
                        ]
                      },
                      {
                        title: "Social Media Engine",
                        problems: [
                          "Hours creating content only to post sporadically",
                          "No strategy — just posting whenever you remember",
                          "Great ideas buried in notes, never repurposed or published"
                        ]
                      },
                      {
                        title: "Voice Receptionist",
                        problems: [
                          "Missing calls while in meetings or with clients",
                          "Paying someone to answer repetitive FAQs all day",
                          "After-hours enquiries go cold — no one picks up"
                        ]
                      },
                      {
                        title: "Data Dashboards",
                        problems: [
                          "Key numbers scattered across spreadsheets, CRMs, and inboxes",
                          "Weekly reports rebuilt from scratch every single time",
                          "Decisions made on last week's data — or worse, gut feel"
                        ]
                      }
                    ].map((area, i) => (
                      <div key={i} className="p-6 glass rounded-2xl border-white/5">
                        <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500/50 shrink-0" />
                          {area.title}
                        </h4>
                        <ul className="space-y-2">
                          {area.problems.map((prob, j) => (
                            <li key={j} className="text-xs text-zinc-500 leading-relaxed flex gap-2">
                              <span className="text-zinc-700 shrink-0">—</span>
                              {prob}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-16 border-t border-white/5 space-y-12">
                 <SectionHeading badge="The Opportunity" align="left">Imagine this instead:</SectionHeading>
                 
                 <div className="space-y-8">
                    <p className="text-xl text-zinc-300 leading-relaxed">
                       A clear, prioritised AI roadmap built specifically for your business—showing you exactly what to automate first based on your workflows and biggest time drains.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { title: "No Guesswork", desc: "Know exactly what to touch first." },
                         { title: "No Overwhelm", desc: "Focus on the 20% that gives 80% results." },
                         { title: "Custom Fit", desc: "No generic 'top 10' lists that don't apply." }
                       ].map((item, i) => (
                          <div key={i} className="p-6 glass rounded-2xl border-white/5">
                             <CheckCircle2 className="w-5 h-5 text-blue-400 mb-3" />
                             <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                             <p className="text-xs text-zinc-500">{item.desc}</p>
                          </div>
                       ))}
                    </div>

                    <p className="text-lg text-zinc-400 leading-relaxed">
                       Just a simple, step-by-step plan you can implement this week to immediately start saving hours.
                    </p>
                    
                    <div className="pt-8">
                      <button 
                        onClick={() => onNavigate('solution')}
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-3"
                      >
                        See How We Solve It <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const SolutionPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading badge="The Solution" align="center">How We Help You</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {[
             {
               icon: Workflow,
               title: "Process Redesigns",
               desc: "We don't just layer AI on top of mess. We rebuild your workflows from the ground up to be lean, logical, and designed for maximum efficiency before automation even begins."
             },
             {
               icon: Zap,
               title: "Automations & Improvements",
               desc: "Connecting your tools so they talk to each other. From lead capture to client delivery, we build bridges that move data for you while you sleep.",
               examples: ["Lead Generation", "Lead Follow-Up", "Social Media Engine", "Voice Receptionist", "Data Dashboards"]
             },
             {
               icon: TrendingUp,
               title: "Training & Strategy",
               desc: "We don't just leave you with a tool; we give you the skill. Custom training sessions ensure you and your team actually use the systems we build."
             },
             {
               icon: Brain,
               title: "Knowledge Systems / Custom GPTs",
               desc: "Centralise your business knowledge into one intelligent system, that you can access. Consolidating and Creating a single source of truth that compounds over time."
             },
             {
               icon: MousePointer2,
               title: "Custom Workflows",
               desc: "Bespoke systems built for your unique bottlenecks. If you have a repetitive task that feels 'too complex' for AI, we'll find a way to streamline it."
             },
             {
               icon: Users,
               title: "On-going Support",
               desc: "AI moves fast. We provide ongoing maintenance and strategic updates to ensure your systems stay ahead of the curve as new tools emerge."
             }
           ].map((service, i) => (
              <div
                key={i}
                className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col items-start gap-6 hover:bg-white/[0.03] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                   <service.icon className="w-7 h-7 text-blue-400" />
                </div>
                <div className="space-y-3 w-full">
                   <h3 className="text-xl font-bold text-white">{service.title}</h3>
                   <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
                   {'examples' in service && service.examples && (
                     <div className="pt-3 space-y-2">
                       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/60">Examples we build</p>
                       <div className="flex flex-wrap gap-2">
                         {(service.examples as string[]).map((ex, j) => (
                           <span key={j} className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{ex}</span>
                         ))}
                       </div>
                     </div>
                   )}
                </div>
              </div>
           ))}
        </div>

        <div className="mb-24 text-center">
           <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              These services aren't just technical implementations—they are strategic moves that translate into measurable ROI and reclaimed time for your business.
           </p>
           <button 
             onClick={() => onNavigate('results')} 
             className="text-white font-bold flex items-center gap-2 mx-auto hover:text-blue-400 transition-colors group"
           >
              See the Results <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="max-w-4xl mx-auto p-12 md:p-20 glass rounded-[4rem] text-center relative border-white/10 bg-blue-500/[0.01]">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Invest in Systems, Not Just Tools</h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                 Our pricing is transparent and discussed directly with you after we understand your unique workflows. No generic packages—just tailored value.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => onNavigate('book')} className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3">
                   Book Now <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => onNavigate('quiz')} className="px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10">
                   Free AI Audit Quiz
                </button>
              </div>
           </div>
        </div>

        {/* Is This Right for You? */}
        <div className="mt-32 space-y-8">
          <SectionHeading badge="Compatibility">Is This Right for You?</SectionHeading>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-10 glass border-green-500/10 rounded-[2.5rem] bg-green-500/[0.01]">
              <h3 className="text-xl font-bold mb-8 text-green-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                This is for you if…
              </h3>
              <ul className="space-y-4 text-zinc-200">
                {[
                  "You're run off your feet with admin and low-value work, and it's crowding out the things that actually grow the business",
                  "You've tried ChatGPT, but it still feels manual and you can't see how AI fits your actual day",
                  "You've got a folder of tools you saved and never set up",
                  "Your information lives in ten different places and nothing talks to each other",
                  "You want a clear first step, not another course you'll half-finish",
                  "You'll put a few hours in this week to save days every month after",
                  "You care about the result, not the technology"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 shrink-0 mt-1 rounded-full bg-green-400/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 glass border-red-500/10 rounded-[2.5rem] bg-red-500/[0.01]">
              <h3 className="text-xl font-bold mb-8 text-red-400 uppercase tracking-widest flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                This probably isn't for you if…
              </h3>
              <ul className="space-y-4 text-zinc-200">
                {[
                  "You want to learn it all yourself rather than have it built and working",
                  "You're not willing to change how a handful of tasks get done",
                  "You're after the cheapest tool, not the outcome",
                  "You're just starting out and don't have real processes to streamline yet"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 shrink-0 mt-1 rounded-full bg-red-400/10 flex items-center justify-center">
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-32 space-y-16">
          <SectionHeading badge="Key Insights">AI for your business, without the hype</SectionHeading>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto text-center -mt-8">
            Software that takes the repetitive reading, sorting, drafting and following-up off your plate — so you can get back to the work only you can do. No robots. No jargon. Just hours back in your week.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Stop being the bottleneck",
                body: "In most small businesses, everything waits for the owner. Quotes, replies, the follow-up you meant to make on Tuesday. AI takes the first pass so things stop sitting for three days. You still decide — you just stop being the hold-up."
              },
              {
                icon: Zap,
                title: "Win the jobs you're currently losing",
                body: "A customer who emails at 10am and hears back at 6pm has usually already called someone else. AI sends a useful first reply the moment an enquiry lands, then keeps nudging until you can take over."
              },
              {
                icon: BarChart3,
                title: "Get your week back from admin",
                body: "Reading invoices, copying details between systems, answering the same questions. None of it grows the business — all of it has to happen. One firm cut invoice processing from 40 hours a month to about six. That's the work AI is built for."
              },
              {
                icon: Users,
                title: "Cover jobs you can't justify hiring for",
                body: "You don't need a full wage to answer FAQs or book appointments. AI handles 40–60% of everyday customer questions on its own and passes you only the ones that need a human."
              },
              {
                icon: TrendingUp,
                title: "Never drop a follow-up again",
                body: "Most lost sales aren't a no — they're a never-got-back-to-them. AI doesn't get distracted. It keeps every lead and overdue invoice moving without you holding it all in your head."
              },
              {
                icon: ShieldCheck,
                title: "The opportunity is using it well",
                body: "Two-thirds of Australian small businesses already use AI, but only 5% are set up to get the full benefit. The gap isn't whether to use it — it's using it well."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col gap-5 hover:bg-white/[0.03] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Honest Answers */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-8 text-center">A few honest answers</h3>
            <div className="space-y-4">
              {[
                {
                  q: "Will it replace my team?",
                  a: "The opposite, usually. It removes the tasks nobody enjoys and frees your people for the work that needs a human."
                },
                {
                  q: "Is it expensive?",
                  a: "Entry tools cost less than a phone plan. The real barrier is knowing where to start — which is exactly what we solve."
                },
                {
                  q: "Is it for a business like mine?",
                  a: "Two-thirds of Australian small businesses already use AI, but only 5% are set up to get the full benefit. The opportunity isn't whether to use it. It's using it well."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 glass rounded-2xl border-white/5 flex gap-6">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{item.q}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Where we come in */}
          <div className="max-w-3xl mx-auto p-10 glass rounded-[2.5rem] border-blue-500/10 bg-blue-500/[0.01] text-center">
            <Lightbulb className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Where we come in</h3>
            <p className="text-zinc-400 leading-relaxed">
              We start with the one task costing you the most time, automate it properly, and prove the hours it gives back before moving to the next. No overhaul, no disruption — just one win at a time.
            </p>
            <button
              onClick={() => onNavigate('book')}
              className="mt-8 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all inline-flex items-center gap-2"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading badge="Help Center" align="center">Common Questions & Concerns</SectionHeading>
        
        <div className="glass rounded-[3rem] p-8 md:p-14 border-white/10 mb-20">
          {[
            { 
              question: "What if I'm not technical at all?", 
              answer: "That's actually ideal—this was built with you in mind. Everything is explained in plain business language, not developer jargon. Every step is broken down so it's easy to follow. If you can follow a simple set of instructions, you can make this work." 
            },
            { 
              question: "How is this different from watching YouTube tutorials?", 
              answer: "Most tutorials offer broad advice for broad audiences. This is tailored to you—your workflows, your bottlenecks, your business. Instead of generic chips, you get a focused, personalised roadmap built around your exact situation." 
            },
            { 
              question: "What if I've tried automation before and it didn't work?", 
              answer: "Automation often fails because the underlying process isn't solid. Our approach is Audit, Improve, Automate—we fix the workflow first, then layer automation on top. The goal isn't just speed—it's better systems overall."
            },
            { 
              question: "How is this different from an AI online course?", 
              answer: "Courses give you Theory. We give you a Map. Instead of learning 100 features you'll never use, we find the 3 that will save you 10 hours a week immediately. It's about Practical Implementation, not academic learning." 
            },
            { 
              question: "Is my business data safe with these AI tools?", 
              answer: "We prioritize security. We recommend tools and configurations (like Team/Enterprise accounts) that don't train on your data, ensuring your internal processes stay private and protected." 
            },
            { 
              question: "Do you build the automations for me?", 
              answer: "This gives you a clear plan to execute on your own, and most people can implement the quick wins without outside help. If you prefer a done-for-you option, we can connect you with trusted partners—but that's a separate service and investment." 
            },
            { 
              question: "What industries do you work with?", 
              answer: "We primarily support service-based businesses—coaches, consultants, real estate professionals, small agencies, and other professional services. If your business relies on repeatable workflows that take up your time, this applies." 
            },
            { 
               question: "What results can I realistically expect?", 
               answer: "Most people uncover 5–10 hours per week in potential time savings. Many are able to implement their first improvement within a few days of receiving their roadmap. Outcomes vary depending on your business and how quickly you take action." 
            },
            { 
               question: "Can't I just hire a Virtual Assistant (VA)?", 
               answer: "A VA is another person to manage and pay. AI systems are fixed costs, work 24/7 without error, and don't need management once set up. Scaling your business with AI is significantly more profitable than scaling with head-count." 
            },
            { 
               question: "What tools are required?", 
               answer: "Usually just basic AI tools like ChatGPT and lightweight automation apps like Zapier or Make. We keep your stack as simple as possible to avoid 'Tool Bloom' and high monthly costs." 
            },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="text-center">
           <p className="text-zinc-500 mb-8 italic">Still have a specific question?</p>
           <button className="text-white font-bold inline-flex items-center gap-2 border-b-2 border-white/10 pb-2 hover:border-white transition-all">
              Send us a message <ArrowRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading badge="The Story" align="center">From Aerospace Engineering to AI Systems</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
            <p>
              I started my career as an **Aerospace Engineer**, working in high-stakes environments where precision wasn't just a goal—it was a requirement. In an office full of complex calculations and manual data handling, I realized something critical: we were wasting incredible amounts of creative energy on repetitive, mechanical tasks.
            </p>
            <p>
              I began experimenting with custom workflows at a major corporation, looking for ways to reclaim that lost time. By going "deep" into AI and automation, I successfully architected systems that **saved hundreds of hours of manual work** every single month.
            </p>
            <p className="font-bold text-white">
              That's when it clicked.
            </p>
            <p>
              The same impact I made at a massive company could be even more life-changing for small business owners. I realized I could help people stop drowning in their own workflows and start growing again.
            </p>
          </div>
          <div className="relative group">
            <div className="aspect-[3/4] glass rounded-[3rem] border-white/10 bg-white/[0.02] flex items-center justify-center overflow-hidden relative">
               {/* Portrait Placeholder */}
               <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50" />
               <Users className="w-24 h-24 text-white/10 absolute" />
               
               <div className="relative z-10 text-center p-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <Rocket className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Founder & CEO</h3>
                  <p className="text-zinc-500 text-xs italic">Ai My Business</p>
               </div>

               {/* Decorative elements to suggest a photo space */}
               <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/20" />
               <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/20" />
               <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/20" />
               <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/20" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border-white/20 bg-zinc-950 shadow-2xl">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Our Promise</p>
              <p className="text-sm font-medium text-white italic">Real results or your money back.</p>
            </div>
          </div>
        </div>

        <div className="p-10 md:p-16 glass rounded-[3.5rem] border-white/5 bg-white/[0.01] text-center">
          <h2 className="text-3xl font-bold mb-6">My Promise</h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            "If you give me the chance to work with you, I promise I'll provide actual, measurable results or you'll get your money back. I'm not here to sell you hype. I'm here to provide you <strong className="text-white">real value.</strong>"
          </p>
          <div className="flex flex-col items-center gap-2">
             <span className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Owner & Chief Systems Architect</span>
             <p className="text-white font-display text-xl">Ai My Business</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading badge="Track Record" align="center">Real Impact, Measured in Hours</SectionHeading>
        
        {/* Story Summary */}
        <div className="mb-24 glass p-10 md:p-16 rounded-[3.5rem] border-white/10 bg-white/[0.01]">
            <div className="max-w-3xl mx-auto space-y-8 text-center">
               <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <Rocket className="w-8 h-8 text-blue-400" />
               </div>
               <h3 className="text-3xl font-bold text-white">From Engineering Efficiency to Business Scale</h3>
               <p className="text-xl text-zinc-400 leading-relaxed font-light">
                  When I worked as an <strong className="text-white">Aerospace Engineer</strong>, I realised the real benefit automation could bring to a business. I developed a tool for a large company that could save potentially millions of dollars in engineering hours.
               </p>
               <p className="text-xl text-zinc-400 leading-relaxed font-light">
                  Today, I am inspired to solve other businesses problems and hope to deliver as much value as I can.
               </p>
            </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-16">
           <SectionHeading badge="Proof" align="center">What Our Clients Say</SectionHeading>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "I was spending every Sunday doing admin. In just two weeks, Ai My Business helped me automate 90% of my lead follow-ups. I've literally got my weekends back.",
                  author: "Sarah J.",
                  role: "Consultant"
                },
                {
                  quote: "The Aerospace Engineer background really shows. The workflows are logical, simple to use, and they just work. No more messy spreadsheets.",
                  author: "Marcus T.",
                  role: "Agency Owner"
                },
                {
                  quote: "I was skeptical about AI, but the assessment was worth every penny. The custom roadmap showed me exactly where I was losing time.",
                  author: "Elena R.",
                  role: "E-commerce Founder"
                }
              ].map((test, i) => (
                 <div
                   key={i}
                   className="p-8 glass rounded-[2.5rem] border-white/5 bg-white/[0.01] flex flex-col justify-between"
                 >
                    <div className="space-y-6">
                       <MessageSquare className="w-6 h-6 text-blue-500/20" />
                       <p className="text-zinc-300 italic leading-relaxed">"{test.quote}"</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                          <Users className="w-5 h-5 text-blue-400" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{test.author}</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{test.role}</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Why Work With Us */}
        <div className="mt-32 space-y-8">
          <SectionHeading badge="Why Us" align="center">Why Work With Us</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "One person, start to finish.",
                body: "The person who plans your automation builds it. No agency handoff, no juniors on your project, no being passed around."
              },
              {
                title: "One win first, not a big overhaul.",
                body: "We automate the task costing you the most time and show you the hours it gives back before touching anything else. Low risk, fast payback."
              },
              {
                title: "Built around your business.",
                body: "Your automations fit how you actually work, not a generic template you have to bend yourself around."
              },
              {
                title: "A real engineering technical background.",
                body: "We build automations that fix the right problem and keep working after go-live, not generic advice you're left to implement alone."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col gap-3">
                <p className="font-bold text-white text-lg">{item.title}</p>
                <p className="text-zinc-400 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center">
           <h2 className="text-3xl font-bold mb-8">Want Results Like These?</h2>
           <button
             onClick={() => onNavigate('book')}
             className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl shadow-blue-500/10"
           >
              Book Your Free 30-Min Chat
           </button>
        </div>
      </div>
    </div>
  );
};

interface ChoiceQuizQuestion {
  id: string; kind: 'choice'; question: string;
  options: { label: string; points: number }[];
  scoreGroup: 'opportunity' | 'readiness' | 'none';
}
interface TextQuizQuestion {
  id: string; kind: 'text'; question: string; placeholder: string;
}
interface MultiSelectQuizQuestion {
  id: string; kind: 'multiselect'; question: string; options: string[]; allowOther: boolean;
}
type QuizQuestion = ChoiceQuizQuestion | TextQuizQuestion | MultiSelectQuizQuestion;

const QuizPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [multiSelectAnswer, setMultiSelectAnswer] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
  const [actionPlan, setActionPlan] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [scores, setScores] = useState({ opportunity: 0, readiness: 0 });

  useEffect(() => { window.scrollTo(0, 0); }, [step, showResults]);

  const questions: QuizQuestion[] = [
    // --- Opportunity questions ---
    {
      id: 'admin_time', kind: 'choice', scoreGroup: 'opportunity',
      question: "Roughly how many hours a week does your team lose to repetitive admin?",
      options: [
        { label: "Under 5", points: 1 },
        { label: "5–10", points: 2 },
        { label: "10–20", points: 3 },
        { label: "20+", points: 4 },
        { label: "Not sure", points: 2 },
      ]
    },
    {
      id: 'repeat_questions', kind: 'choice', scoreGroup: 'opportunity',
      question: "How often does your team answer the same customer questions by hand?",
      options: [
        { label: "Rarely", points: 1 },
        { label: "A few times a week", points: 2 },
        { label: "Daily", points: 3 },
        { label: "Constantly", points: 4 },
      ]
    },
    {
      id: 'internal_processes', kind: 'choice', scoreGroup: 'opportunity',
      question: "How are your internal processes mostly handled?",
      options: [
        { label: "Mostly in people's heads or on paper", points: 4 },
        { label: "Spreadsheets and email", points: 3 },
        { label: "Several tools that don't talk to each other", points: 2 },
        { label: "Connected systems, little automation", points: 1 },
        { label: "Largely automated already", points: 0 },
      ]
    },
    {
      id: 'moving_info', kind: 'choice', scoreGroup: 'opportunity',
      question: "How often does someone manually move information from one tool to another?",
      options: [
        { label: "Rarely", points: 1 },
        { label: "Weekly", points: 2 },
        { label: "Daily", points: 3 },
        { label: "Constantly", points: 4 },
      ]
    },
    {
      id: 'bottlenecks', kind: 'choice', scoreGroup: 'opportunity',
      question: "How often do things stall waiting on one person or a manual step?",
      options: [
        { label: "Rarely", points: 1 },
        { label: "Occasionally", points: 2 },
        { label: "Weekly", points: 3 },
        { label: "Constant problem", points: 4 },
      ]
    },
    // --- Motivation (unscored) ---
    {
      id: 'motivation', kind: 'choice', scoreGroup: 'none',
      question: "If you could remove 20–40% of manual workload in your business, what would that mean for you?",
      options: [
        { label: "Minimal impact", points: 0 },
        { label: "Helpful but not critical", points: 0 },
        { label: "Significant time and cost savings", points: 0 },
        { label: "Game-changing growth opportunity", points: 0 },
      ]
    },
    // --- Readiness questions ---
    {
      id: 'ai_use', kind: 'choice', scoreGroup: 'readiness',
      question: "Are you using any AI tools in the business today?",
      options: [
        { label: "No", points: 0 },
        { label: "Tried it informally", points: 1 },
        { label: "A few people use it ad hoc", points: 2 },
        { label: "Built into one or two workflows", points: 3 },
        { label: "Embedded across several areas", points: 4 },
      ]
    },
    {
      id: 'data_foundation', kind: 'choice', scoreGroup: 'readiness',
      question: "Where does your business information live?",
      options: [
        { label: "Scattered across people, paper and inboxes", points: 0 },
        { label: "Mostly spreadsheets", points: 1 },
        { label: "A few systems that don't connect", points: 2 },
        { label: "Mostly centralised and tidy", points: 3 },
      ]
    },
    {
      id: 'strategy', kind: 'choice', scoreGroup: 'readiness',
      question: "Do you have a plan for how AI fits your business?",
      options: [
        { label: "Haven't thought about it", points: 0 },
        { label: "Curious, no plan", points: 1 },
        { label: "Rough idea", points: 2 },
        { label: "Clear plan we're working to", points: 3 },
      ]
    },
    {
      id: 'measurement', kind: 'choice', scoreGroup: 'readiness',
      question: "Do you know the time or cost of your main repeat tasks?",
      options: [
        { label: "No", points: 0 },
        { label: "Roughly, in my head", points: 1 },
        { label: "Some of it", points: 2 },
        { label: "Yes, we track it", points: 3 },
      ]
    },
    {
      id: 'governance', kind: 'choice', scoreGroup: 'readiness',
      question: "Do you have any rules for how your team uses AI?",
      options: [
        { label: "No", points: 0 },
        { label: "Haven't needed to", points: 1 },
        { label: "Informal understanding", points: 2 },
        { label: "Written guidelines", points: 3 },
      ]
    },
    // --- Open questions ---
    {
      id: 'situation', kind: 'text',
      question: "What best describes your current business situation?",
      placeholder: "e.g. Solo consultant juggling too many clients, small team spending hours on manual admin..."
    },
    {
      id: 'outcome', kind: 'text',
      question: "What outcome would you like to achieve in the next 90 days?",
      placeholder: "e.g. Halve the time I spend on follow-ups, build a system for onboarding new clients..."
    },
    {
      id: 'obstacle', kind: 'text',
      question: "What's stopping you — or what have you tried that hasn't worked?",
      placeholder: "e.g. Started with Zapier but couldn't connect it to our CRM, tried ChatGPT but don't have a system..."
    },
    {
      id: 'solution', kind: 'multiselect', allowOther: true,
      question: "Which solution do you think would suit you best?",
      options: [
        "Process Redesign",
        "Automations & Integrations",
        "AI Training & Strategy",
        "Knowledge System / Custom GPT",
        "Custom Workflow Build",
        "Ongoing Support & Maintenance",
      ]
    },
    {
      id: 'anything_else', kind: 'text',
      question: "Is there anything else we should know about your business?",
      placeholder: "Optional — any context that helps us prepare for our conversation."
    },
  ];

  const computeScores = () => {
    let opportunity = 0, opportunityMax = 0;
    let readiness = 0, readinessMax = 0;
    for (const q of questions) {
      if (q.kind !== 'choice') continue;
      const max = Math.max(...q.options.map(o => o.points));
      const selected = q.options.find(o => o.label === answers[q.id]);
      if (q.scoreGroup === 'opportunity') {
        opportunityMax += max;
        if (selected) opportunity += selected.points;
      } else if (q.scoreGroup === 'readiness') {
        readinessMax += max;
        if (selected) readiness += selected.points;
      }
    }
    return {
      opportunity: opportunityMax > 0 ? Math.round((opportunity / opportunityMax) * 100) : 0,
      readiness: readinessMax > 0 ? Math.round((readiness / readinessMax) * 100) : 0,
    };
  };

  const getResultProfile = (opp: number, ready: number) => {
    if (opp >= 60 && ready < 50) return {
      label: "High potential, not yet set up",
      copy: "You have significant manual work that AI can remove — and you're not yet set up to get there alone. This is exactly who we help most. One focused engagement could recover hours every week.",
      highlight: true,
    };
    if (opp >= 60 && ready >= 50) return {
      label: "Ready to scale fast",
      copy: "You have both the need and the foundations. The right systems could have a measurable impact within weeks.",
      highlight: false,
    };
    if (opp < 60 && ready >= 50) return {
      label: "Good foundations, lower urgency",
      copy: "Your operations are relatively lean and you've started building AI habits. The opportunity is there, but the wins will be more incremental than transformational right now.",
      highlight: false,
    };
    return {
      label: "Early stage",
      copy: "Starting with one small automation will build the confidence and habits that compound over time. The groundwork you lay now pays off fast.",
      highlight: false,
    };
  };

  const advance = () => {
    if (step < questions.length - 1) setStep(s => s + 1);
    else setStep(questions.length);
  };

  const handleChoiceAnswer = (label: string) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: label }));
    advance();
  };

  const handleTextNext = () => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: textInput }));
    setTextInput('');
    advance();
  };

  const handleMultiSelectNext = () => {
    const combined = otherText ? [...multiSelectAnswer, `Other: ${otherText}`] : multiSelectAnswer;
    setAnswers(prev => ({ ...prev, [questions[step].id]: combined.join(', ') }));
    setMultiSelectAnswer([]);
    setOtherText('');
    advance();
  };

  const toggleMultiSelect = (option: string) => {
    setMultiSelectAnswer(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const fallbackPlan = "Start by mapping your highest-volume manual task end-to-end. Identify which steps are repetitive and predictable — those are your first automation targets. Most businesses find a meaningful quick win within the first workflow they map out.";

  const generateActionPlan = async () => {
    setIsSubmitting(true);
    const computed = computeScores();
    setScores(computed);

    fetch('/.netlify/functions/send-quiz-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactInfo.name,
        email: contactInfo.email,
        answers: Object.entries(answers).map(([id, val]) => `${id}: ${val}`),
        opportunityScore: computed.opportunity,
        readinessScore: computed.readiness,
      }),
    }).then(r => { if (r.ok) setEmailSent(true); }).catch(() => {});

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const qaSummary = questions.map(q => `${q.question}: ${answers[q.id] || '(skipped)'}`).join('\n');
      const prompt = `You are an AI Systems Architect. A small business owner completed an AI readiness audit.

Scores:
- Automation Opportunity: ${computed.opportunity}% (higher = more manual work that could be automated)
- AI Readiness: ${computed.readiness}% (higher = better set up to adopt AI today)

Their answers:
${qaSummary}

Write a "Quick Action Plan" tailored to their situation. Lead with 2–3 immediate wins (actionable this week), then 2–3 medium-term system gains. Reference their specific answers where relevant. If opportunity is high and readiness is low, focus on foundation-first steps. Under 250 words. Plain language, no jargon.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      setActionPlan(response.text || fallbackPlan);
      setShowResults(true);
    } catch {
      setActionPlan(fallbackPlan);
      setShowResults(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateActionPlan();
  };

  if (showResults) {
    const profile = getResultProfile(scores.opportunity, scores.readiness);
    return (
      <div className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-[3.5rem] p-10 md:p-20 border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Your AI Readiness Report</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3">Automation Opportunity</p>
                <span className="text-5xl font-bold text-white block mb-4">{scores.opportunity}%</span>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${scores.opportunity}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-3">How much manual work could be automated</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3">AI Readiness</p>
                <span className="text-5xl font-bold text-white block mb-4">{scores.readiness}%</span>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${scores.readiness}%` }} />
                </div>
                <p className="text-xs text-zinc-500 mt-3">How set up you are to adopt AI now</p>
              </div>
            </div>

            <div className={`p-8 rounded-3xl mb-10 ${profile.highlight ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-white/[0.02] border border-white/10'}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.25em] mb-2 ${profile.highlight ? 'text-blue-400' : 'text-zinc-500'}`}>Your Profile</p>
              <h3 className="text-xl font-bold text-white mb-3">{profile.label}</h3>
              <p className="text-zinc-400 leading-relaxed">{profile.copy}</p>
            </div>

            <div className="space-y-12">
              <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" /> Quick Action Plan
                </h3>
                <div className="text-zinc-300 leading-relaxed space-y-4 prose prose-invert max-w-none">
                  {actionPlan.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 glass rounded-2xl border-white/5">
                    <p className="font-bold text-white mb-2">Check Your Email</p>
                    <p className="text-sm text-zinc-500">
                      {emailSent
                        ? `A copy of this report has been sent to ${contactInfo.email}.`
                        : `Your report is being sent to ${contactInfo.email} — check your inbox shortly.`}
                    </p>
                  </div>
                  <div className="p-6 glass rounded-2xl border-blue-500/20 bg-blue-500/5">
                    <p className="font-bold text-white mb-2">Want a Full Custom Roadmap?</p>
                    <p className="text-sm text-zinc-500 mb-4">Book a free 30-minute Discovery Call and we'll map out exactly what to automate — and in what order — for your specific business.</p>
                    <button
                      onClick={() => onNavigate('book')}
                      className="text-sm font-bold text-blue-400 flex items-center gap-2"
                    >
                      Book Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = step < questions.length ? questions[step] : null;

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">AI Readiness Quiz</span>
            <span className="text-zinc-500 text-xs font-mono">{Math.min(step + 1, questions.length)} / {questions.length}</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div>
          {currentQuestion ? (
            <div className="space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {currentQuestion.question}
              </h2>

              {currentQuestion.kind === 'choice' && (
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleChoiceAnswer(option.label)}
                      className="w-full p-6 text-left glass rounded-2xl border-white/5 hover:border-blue-500/50 hover:bg-white/[0.03] transition-all group flex items-center justify-between"
                    >
                      <span className="text-lg text-zinc-300 group-hover:text-white transition-colors">{option.label}</span>
                      <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.kind === 'text' && (
                <div className="space-y-4">
                  <textarea
                    rows={4}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                  <button
                    onClick={handleTextNext}
                    className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    {textInput ? 'Continue' : 'Skip'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {currentQuestion.kind === 'multiselect' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, i) => {
                      const selected = multiSelectAnswer.includes(option);
                      return (
                        <button
                          key={i}
                          onClick={() => toggleMultiSelect(option)}
                          className={`w-full p-5 text-left rounded-2xl border transition-all flex items-center gap-4 ${selected ? 'bg-blue-500/10 border-blue-500/40 text-white' : 'glass border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'}`}
                        >
                          <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${selected ? 'bg-blue-500 border-blue-500' : 'border-zinc-600'}`}>
                            {selected && <div className="w-2 h-2 bg-white rounded-sm" />}
                          </div>
                          <span className="text-base">{option}</span>
                        </button>
                      );
                    })}
                    {currentQuestion.allowOther && (
                      <div className="p-5 glass rounded-2xl border border-white/5">
                        <p className="text-sm text-zinc-500 mb-2 font-medium">Other</p>
                        <input
                          type="text"
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder="Describe what you're looking for..."
                          className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-zinc-600"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleMultiSelectNext}
                    className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    {(multiSelectAnswer.length > 0 || otherText) ? 'Continue' : 'Skip'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass p-10 md:p-16 rounded-[3rem] border-white/10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Almost Done!</h2>
                <p className="text-zinc-400">Where should we send your report?</p>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">First Name</label>
                  <input
                    required
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Generating Your Report...' : 'Get My Report'} <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[10px] text-zinc-600">
                  By clicking, you agree to receive a one-time AI readiness report and occasional updates.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading badge="Get In Touch" align="center">We'd Love to Hear From You</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let's solve your bottlenecks.</h3>
              <p className="text-zinc-400 leading-relaxed">
                Whether you have a specific question about an automation or just want to see if we're the right fit, drop us a line. We respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Email Us</p>
                  <p className="text-white font-medium">hello@ai-my-business.com.au</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Response Time</p>
                  <p className="text-white font-medium">&lt; 24 Hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border-white/10 bg-white/[0.02]">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-5 py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Thanks, {form.name.split(' ')[0]}. We'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setForm({ name: '', email: '', message: '' }); setStatus('idle'); }}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder="Tell us about your business..."
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-400 text-sm px-2">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookPage = ({ hasPaid = false }: { hasPaid?: boolean }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; const s: HTMLScriptElement = d.createElement('script'); s.src = A; d.head.appendChild(s); cal.loaded = true; }
        if (args[0] === L) { const api: any = (...a: any[]) => p(api, a); const ns = args[1]; api.q = []; if (typeof ns === 'string') { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], args); p(cal, ['-', ns, api]); } else { p(cal, args); } return; }
        p(cal, args);
      };
    })(window as any, 'https://app.cal.com/embed/embed.js', 'init');
    const Cal = (window as any).Cal;
    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', { elementOrSelector: '#cal-inline-book', calLink: 'ai-my-business/30min', layout: 'month_view' });
    Cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#0058da' } }, hideEventTypeDetails: false, layout: 'month_view' });
  }, []);

  useEffect(() => {
    if (!hasPaid) return;
    const Cal = (window as any).Cal;
    if (!Cal) return;
    Cal('inline', { elementOrSelector: '#cal-inline-audit', calLink: 'ai-my-business/audit', layout: 'month_view' });
    Cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#0058da' } }, hideEventTypeDetails: false, layout: 'month_view' });
  }, [hasPaid]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    setPaymentError('');
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Payment setup failed');
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setPaymentError('Could not start payment. Please try again.');
      setPaymentLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Free 30-Min Chat */}
        <SectionHeading badge="Free Chat" align="center">Not Sure Yet? Start Here.</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           <div className="lg:col-span-1 space-y-8">
              <div className="p-8 glass rounded-[2.5rem] border-blue-500/10 bg-blue-500/[0.01]">
                 <h3 className="text-xl font-bold text-white mb-4">Free 30-Min Intro Chat</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Not sure how AI applies to your setup? Start here. No pressure — just a brief conversation to see what's possible for your business.
                 </p>
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Questions?</p>
                    <p className="text-sm text-zinc-500">
                       Email hello@ai-my-business.com.au or use the contact page.
                    </p>
                 </div>
              </div>

              <div className="p-8 glass rounded-[2.5rem] border-white/5">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-600 mb-6 underline underline-offset-8">What to Expect</h3>
                 <ul className="space-y-4">
                    {[
                      "Direct audit of workflows",
                      "Priority action items",
                      "Tool recommendations",
                      "Growth assessment"
                    ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-blue-500/50" />
                          {item}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="lg:col-span-2">
             <div className="glass rounded-[3.5rem] border-white/10 overflow-hidden bg-white/[0.02]">
                <div className="p-4 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                    <div className="w-3 h-3 rounded-full bg-green-400/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-zinc-600" />
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Free 30-Min Chat</span>
                  </div>
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
                </div>
                <div className="w-full min-h-[700px] relative bg-zinc-950">
                  <div id="cal-inline-book" style={{ width: '100%', height: '900px', overflow: 'scroll' }} />
                </div>
              </div>
           </div>
        </div>

        {/* AI Audit Section */}
        <div className="border-t border-white/5 pt-24">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">AI Audit</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Know that you definitely want to automate with us? Get a Tailored Roadmap by booking an <span className="text-gradient">Audit Call</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
              No Hiring, No Coding, No Need to Become an AI Pro. Just clear, actionable paths designed specifically for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">

            {/* How It Works */}
            <div className="p-10 glass rounded-[2.5rem] bg-white/[0.02] border-white/10">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 text-white">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold uppercase tracking-widest">How It Works</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Video, title: "1. 30-Min Discovery Call", desc: "A focused conversation to understand your business, current tools, and biggest time drains before we dive deeper." },
                  { icon: Search, title: "2. Audit", desc: "A thorough business deep dive into your real workflows, identifying exactly where AI can deliver the highest ROI." },
                  { icon: FileText, title: "3. Proposal", desc: "A clear, tailored proposal outlining the recommended AI systems, expected time savings, and implementation roadmap." },
                  { icon: Rocket, title: "4. Implementation & Review", desc: "We build and deploy your AI systems, then review performance to ensure you're seeing real, measurable results." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA with price */}
            <div className="p-12 md:p-20 glass rounded-[3.5rem] border-white/20 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">Ready to Stop Drowning in Admin Work?</h2>
                <div className="space-y-8 mb-12">
                  <p className="text-xl text-zinc-400 font-light">You've got two choices:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-6 glass rounded-2xl border-white/5 flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      <p className="text-sm text-zinc-500">Keep spending 10+ hours every week on tasks that could be streamlined or automated.</p>
                    </div>
                    <div className="p-6 glass rounded-2xl border-blue-500/10 flex gap-4 bg-blue-500/[0.02]">
                      <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-sm text-zinc-200">Or invest a couple of hours with us and walk away with a clear, actionable plan to take back your time.</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <p className="text-lg text-zinc-400">
                      The Audit Call is <span className="text-white font-bold">$300</span>. If this Audit Call helps you save just a couple hours per week, it pays for itself within the first week. Most clients uncover <span className="text-white font-bold">at least 5–10 hours</span> of weekly time savings. If you decide to work with us for implementation we will deduct the cost of the Audit off the price.
                    </p>
                    <p className="text-base text-zinc-400">
                      <span className="text-white font-bold">✓</span> Value Guarantee — if you don't find the Audit Call valuable, you can have your money back.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment gate / calendar */}
            <div className="space-y-12">
              <SectionHeading badge="AI Audit Booking" align="center">Select a Time for Your Audit Session</SectionHeading>

              {!hasPaid ? (
                <div className="max-w-xl mx-auto text-center glass p-12 rounded-[3.5rem] border-white/10">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                    <Lock className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Secure Your Audit Slot</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    Secure your AI Audit for $300 and unlock our live booking calendar to choose your session time.
                  </p>
                  {paymentError && <p className="text-red-400 text-sm mb-4">{paymentError}</p>}
                  <button
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="w-full py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
                  >
                    {paymentLoading ? 'Redirecting to payment...' : 'Book Your Slot'}
                    {!paymentLoading && <ArrowRight className="w-5 h-5" />}
                  </button>
                  <p className="text-[10px] text-zinc-600 mt-4">Secured by Stripe. Money-back guarantee if you don't find value.</p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Payment confirmed — select your session time below</span>
                    </div>
                  </div>
                  <div className="glass rounded-[3.5rem] border-white/10 overflow-hidden bg-white/[0.02]">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/50">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                        <div className="w-3 h-3 rounded-full bg-green-400/20" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-zinc-600" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">AI Audit • Secure Booking</span>
                      </div>
                      <div className="w-12 h-1 bg-white/5 rounded-full" />
                    </div>
                    <div className="w-full min-h-[700px] relative bg-zinc-950">
                      <div id="cal-inline-audit" style={{ width: '100%', height: '900px', overflow: 'scroll' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const AssessmentPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; const s: HTMLScriptElement = d.createElement('script'); s.src = A; d.head.appendChild(s); cal.loaded = true; }
        if (args[0] === L) { const api: any = (...a: any[]) => p(api, a); const ns = args[1]; api.q = []; if (typeof ns === 'string') { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], args); p(cal, ['-', ns, api]); } else { p(cal, args); } return; }
        p(cal, args);
      };
    })(window as any, 'https://app.cal.com/embed/embed.js', 'init');
    const Cal = (window as any).Cal;
    Cal('init', { origin: 'https://cal.com' });
    Cal('inline', { elementOrSelector: '#cal-inline-assessment', calLink: 'ai-my-business/audit', layout: 'month_view' });
    Cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#0058da' } }, hideEventTypeDetails: false, layout: 'month_view' });
  }, []);

  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">AI Tools Assessment</span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Get a Tailored Roadmap to Win Back <span className="text-gradient">5–10 Hours Each Week</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
            No Hiring, No Coding, No Need to Become an AI Pro. Just clear, actionable paths designed specifically for your business.
          </p>
        </div>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-1 gap-12 mb-24">

          {/* What You Get */}
          <div className="p-10 glass rounded-[2.5rem] bg-white/[0.02] border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Video, title: "1. 30-Min Discovery Call", desc: "A focused conversation to understand your business, current tools, and biggest time drains before we dive deeper." },
                { icon: Search, title: "2. Audit", desc: "A thorough business deep dive into your real workflows, identifying exactly where AI can deliver the highest ROI." },
                { icon: FileText, title: "3. Proposal", desc: "A clear, tailored proposal outlining the recommended AI systems, expected time savings, and implementation roadmap." },
                { icon: Rocket, title: "4. Implementation & Review", desc: "We build and deploy your AI systems, then review performance to ensure you're seeing real, measurable results." }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="p-12 md:p-24 glass rounded-[3.5rem] border-white/20 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">Ready to Stop Drowning in Admin Work?</h2>
              
              <div className="space-y-8 mb-12">
                <p className="text-xl text-zinc-400 font-light">You've got two choices:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="p-6 glass rounded-2xl border-white/5 flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                      <X className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <p className="text-sm text-zinc-500">Keep spending 10+ hours every week on tasks that could be streamlined or automated.</p>
                  </div>
                  
                  <div className="p-6 glass rounded-2xl border-blue-500/10 flex gap-4 bg-blue-500/[0.02]">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-sm text-zinc-200">Or invest a couple of hours with us and walk away with a clear, actionable plan to take back your time.</p>
                  </div>
                </div>

                <p className="text-lg text-zinc-400 pt-4">
                  The assessment is <span className="text-white font-bold">$500</span>. If this assessment helps you save just a couple hours per week, it pays for itself in time within the first week. Most clients uncover <span className="text-white font-bold">at least 5–10 hours</span> of weekly time savings.
                </p>
              </div>
              
              <button 
                onClick={() => {
                  document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-blue-500/30"
              >
                <span>Book Your Assessment</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Calendar Booking Section */}
          <div id="booking-calendar" className="mt-24 space-y-12">
            <SectionHeading badge="Scheduling">Select a Time for Your Session</SectionHeading>
            <div className="glass rounded-[3.5rem] border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="p-4 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                  <div className="w-3 h-3 rounded-full bg-green-400/20" />
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">30-Minute Audit • Secure Booking</span>
                </div>
                <div className="w-12 h-1 bg-white/5 rounded-full" />
              </div>
              <div className="w-full min-h-[700px] relative bg-zinc-950">
                <div id="cal-inline-assessment" style={{ width: '100%', height: '900px', overflow: 'scroll' }} />
              </div>
            </div>
            <p className="text-center text-zinc-600 text-sm italic">
              Can't find a time that works? <button className="text-blue-400 font-bold hover:underline">Contact us</button> for special availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Error Boundary ---

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crash:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
          <div style={{ textAlign: 'center', color: '#94a3b8', maxWidth: '400px' }}>
            <p style={{ fontSize: '36px', marginBottom: '16px' }}>⚠️</p>
            <h1 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Something went wrong</h1>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>Please refresh the page. If the problem persists, contact us at hello@ai-my-business.com.au</p>
            <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '99px', fontWeight: 700, cursor: 'pointer' }}>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- App ---

export default function App() {
  const [view, setView] = useState('home');
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get('paid');
    if (paid) {
      setHasPaid(true);
      setView('book');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleNavigate = (newView: string) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen relative overflow-x-hidden bg-zinc-950">
      <Navbar onNavigate={handleNavigate} currentView={view} />

      <div>
        {view === 'home' && <Home onNavigate={handleNavigate} />}
        {view === 'assessment' && <AssessmentPage onNavigate={handleNavigate} />}
        {view === 'problem' && <ProblemPage onNavigate={handleNavigate} />}
        {view === 'solution' && <SolutionPage onNavigate={handleNavigate} />}
        {view === 'results' && <ResultsPage onNavigate={handleNavigate} />}
        {view === 'quiz' && <QuizPage onNavigate={handleNavigate} />}
        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactPage />}
        {view === 'book' && <BookPage hasPaid={hasPaid} />}
        {view === 'faq' && <FAQPage />}
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
              <Brain className="w-4 h-4 text-blue-400" />
            </div>
            <span className="font-display font-medium text-lg text-zinc-200">Ai My Business</span>
          </div>
          <p className="text-xs text-zinc-600">© 2024 Ai My Business. Practical systems only.</p>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest text-zinc-500 font-bold">
            <button onClick={() => setView('results')} className="hover:text-white transition-colors">Results</button>
            <button onClick={() => setView('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => setView('contact')} className="hover:text-white transition-colors">Contact</button>
            <button onClick={() => setView('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
