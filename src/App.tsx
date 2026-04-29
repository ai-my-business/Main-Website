/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
          <button onClick={() => handleNav('assessment')} className={`hover:text-white transition-colors ${currentView === 'assessment' ? 'text-white underline underline-offset-4' : ''}`}>AI Assessment</button>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 flex flex-col gap-6 items-center border border-white/10"
          >
            <button onClick={() => handleNav('home')} className="text-lg font-medium">Home</button>
            <button onClick={() => handleNav('problem')} className="text-lg font-medium">The Problem</button>
            <button onClick={() => handleNav('solution')} className="text-lg font-medium">The Solution</button>
            <button onClick={() => handleNav('results')} className="text-lg font-medium">The Results</button>
            <button onClick={() => handleNav('assessment')} className="text-lg font-medium">AI Assessment</button>
            <button onClick={() => handleNav('about')} className="text-lg font-medium">About Us</button>
            <button onClick={() => handleNav('contact')} className="text-lg font-medium">Contact</button>
            <button 
              onClick={() => handleNav('book')} 
              className="w-full bg-white text-black px-5 py-3 rounded-xl font-bold"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, badge, align = 'center' }: { children: React.ReactNode, badge?: string, align?: 'center' | 'left' }) => (
  <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} mb-16 px-4`}>
    {badge && (
      <motion.span 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight"
    >
      {children}
    </motion.h2>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Pages ---

const Home = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
  <>
    {/* Hero Section */}
    <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
              Stop Wasting <span className="text-gradient">5–10 Hours</span> <br className="hidden lg:block" /> a Week. Get Ahead!
            </h1>
            <div className="space-y-4 mb-10">
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl lg:mx-0 mx-auto font-light leading-relaxed">
                Simple AI systems. No tech skills. No complicated setups. Just clear, practical improvements to your daily workflow.
              </p>
              <p className="text-sm text-blue-400/80 font-medium tracking-wide lg:text-left text-center">
                Value Guarantee — If you don’t find the assessment valuable, we’ll refund you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => onNavigate('assessment')}
                className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 overflow-hidden shadow-xl shadow-white/5"
              >
                <span>👉 Book Your Assessment</span>
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Visual representation */}
        <motion.div className="hidden lg:block flex-1 max-w-xl">
           <div className="p-8 glass rounded-[3rem] border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                   <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Manual Work Drain</span>
                   <span className="text-red-400 font-mono">-12h/wk</span>
                </div>
                <div className="space-y-3">
                   {[
                     { label: 'Email Follow-ups', val: '80%' },
                     { label: 'Data Entry', val: '95%' },
                     { label: 'Report Generation', val: '70%' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] text-zinc-600">
                           <span>{item.label}</span>
                           <span>{item.val} Automatable</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500/40" style={{ width: item.val }} />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-xs text-zinc-400 italic">"Most business owners are paying a 'Manual Tax' they don't even realize exists."</p>
                </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>

    {/* Short Problem Summary */}
    <section className="py-24 px-6 bg-white/[0.01]">
       <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Path">From AI to ROI in 3 simple steps</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { 
                 icon: Search, 
                 title: "Audit", 
                 text: "Start with the 2-minute AI Readiness Quiz. It quickly highlights where you’re losing time across admin, marketing, and delivery—so you can see exactly where AI can give you back hours.",
                 action: () => onNavigate('problem')
               },
               { 
                 icon: BarChart3, 
                 title: "Assessment", 
                 text: "Looking for a full roadmap instead of just quick wins? Book a 45-minute AI Tools Assessment. We’ll review your workflows together and send you a tailored report showing how to free up 5–10 hours each week—without adding complexity.",
                 action: () => onNavigate('assessment')
               },
               { 
                 icon: Rocket, 
                 title: "Implementation", 
                 text: "We take your roadmap and implement AI into your business for you. We streamline workflows, integrate the right tools, and remove bottlenecks so you can reclaim hours each week without the guesswork or overwhelm.",
                 action: () => onNavigate('assessment')
               }
             ].map((item, i) => (
                <div key={i} className="p-8 glass rounded-3xl border-white/5 flex flex-col h-full">
                   <item.icon className="w-8 h-8 text-blue-400 mb-6" />
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-grow">{item.text}</p>
                   <button onClick={item.action} className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform mt-auto group">
                      {item.title === 'Audit' ? 'Learn More' : 'Get Started'} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             ))}
          </div>
       </div>
    </section>

    {/* Support CTA */}
    <section className="py-24 px-6">
       <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Audience">Who this is designed for</SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Positive Fit */}
             <div className="p-10 glass rounded-[2.5rem] border-green-500/10 bg-green-500/[0.01]">
                <h3 className="text-2xl font-bold mb-8 text-green-400">You’ll feel right at home if…</h3>
                <ul className="space-y-6">
                   {[
                     "You’re running a solo or small service-based business and juggling everything yourself.",
                     "You’ve experimented with tools like ChatGPT but don’t have a clear system in place.",
                     "You’re frustrated with tutorials that assume you already know a dozen other tools.",
                     "You’re after quick, practical wins this week—not another 10-hour course."
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

             {/* Negative Fit */}
             <div className="p-10 glass rounded-[2.5rem] border-red-500/10 bg-red-500/[0.01]">
                <h3 className="text-2xl font-bold mb-8 text-red-500/80">This isn’t for you if…</h3>
                <ul className="space-y-6">
                   {[
                     "You expect someone else to build everything while you stay hands-off.",
                     "You’re not willing to spend 30–60 minutes learning something that could save you 5–10 hours.",
                     "You’re chasing a magic solution instead of a realistic, actionable plan."
                   ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                            <XCircle className="w-4 h-4 text-red-400" />
                         </div>
                         <span className="text-zinc-500 text-lg leading-relaxed">{item}</span>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
       </div>
    </section>

    {/* Support CTA Footer */}
    <section className="py-32 px-6">
       <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden border-white/10">
          <div className="mesh-gradient-1 opacity-20" />
          <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Stop Guessing Where to Start with AI</h2>
             <p className="text-lg text-zinc-400 mb-12">Take a quick quiz to identify what kind of opportunities are available for your business.</p>
             <button onClick={() => onNavigate('assessment')} className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all">
                Book Your Free Audit
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
        <SectionHeading badge="The Reality" align="left">The Growth Gap</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
           <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                 <h3 className="text-3xl font-bold text-white leading-tight">You already know AI can transform your business.</h3>
                 <p className="text-xl text-zinc-400 leading-relaxed font-light">
                    You’ve saved the tools. Watched the tutorials. Read the threads.
                 </p>
                 <p className="text-2xl font-bold text-white">But nothing’s changed.</p>
              </div>

              <div className="p-10 glass rounded-[2.5rem] border-blue-500/10 bg-blue-500/[0.02] relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <AlertCircle className="w-24 h-24 text-blue-400" />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <p className="text-xl text-zinc-300 leading-relaxed">
                       Because the real issue isn’t access to AI—it’s <strong>clarity on what to actually do first.</strong>
                    </p>
                    <div className="space-y-4">
                       <p className="text-zinc-400">So you stay stuck doing 10+ hours a week of work that should take minutes:</p>
                       <ul className="space-y-3">
                          {[
                            "Following up with leads manually",
                            "Formatting and re-formatting documents",
                            "Answering the same repetitive questions"
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

           <div className="lg:col-span-4 lg:block hidden">
              <div className="sticky top-32 space-y-6">
                 <div className="p-8 glass rounded-[2.5rem] border-white/10 bg-white/[0.01]">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">The Compound Cost</h4>
                    <div className="space-y-8">
                       {[
                         { label: "Lost Weekly", val: "10 Hours" },
                         { label: "Lost Yearly", val: "520 Hours" },
                         { label: "Mental Drain", val: "High" }
                       ].map((item, i) => (
                          <div key={i} className="space-y-2">
                             <p className="text-[10px] uppercase font-bold text-zinc-600">{item.label}</p>
                             <p className="text-2xl font-bold text-white">{item.val}</p>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-8 glass rounded-[2.5rem] border-white/5 text-center">
                    <p className="text-zinc-500 text-sm italic">"The gap between early adopters and the rest is widening every week."</p>
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
        <SectionHeading badge="The Solution" align="center">How We Help You Win Back Your Time</SectionHeading>
        
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
               desc: "Connecting your tools so they talk to each other. From lead capture to client delivery, we build bridges that move data for you while you sleep."
             },
             {
               icon: TrendingUp,
               title: "Training & Strategy",
               desc: "We don't just leave you with a tool; we give you the skill. Custom training sessions ensure you and your team actually use the systems we build."
             },
             {
               icon: Brain,
               title: "Knowledge Systems / Custom GPTs",
               desc: "Upload your business brain into a system. We build custom AI assistants trained specifically on your brand voice, policies, and internal documentation."
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
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 glass rounded-[2.5rem] border-white/5 flex flex-col items-start gap-6 hover:bg-white/[0.03] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                   <service.icon className="w-7 h-7 text-blue-400" />
                </div>
                <div className="space-y-3">
                   <h3 className="text-xl font-bold text-white">{service.title}</h3>
                   <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
           ))}
        </div>

        <div className="max-w-4xl mx-auto p-12 md:p-20 glass rounded-[4rem] text-center relative border-white/10 bg-blue-500/[0.01]">
           <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Invest in Systems, Not Just Tools</h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                 Our pricing is transparent and discussed directly with you after we understand your unique workflows. No generic packages—just tailored value.
              </p>
              <button onClick={() => onNavigate('assessment')} className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mx-auto">
                 Book Your Assessment <ArrowRight className="w-5 h-5" />
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
              question: "What if I’m not technical at all?", 
              answer: "That’s actually ideal—this was built with you in mind. Everything is explained in plain business language, not developer jargon. Every step is broken down so it’s easy to follow. If you can follow a simple set of instructions, you can make this work." 
            },
            { 
              question: "How is this different from watching YouTube tutorials?", 
              answer: "Most tutorials offer broad advice for broad audiences. This is tailored to you—your workflows, your bottlenecks, your business. Instead of generic chips, you get a focused, personalised roadmap built around your exact situation." 
            },
            { 
              question: "What if I’ve tried automation before and it didn’t work?", 
              answer: "Automation often fails because the underlying process isn’t solid. Our approach is “Audit, Improve, Automate”—we fix the workflow first, then layer automation on top. The goal isn’t just speed—it’s better systems overall." 
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
              answer: "This gives you a clear plan to execute on your own, and most people can implement the quick wins without outside help. If you prefer a done-for-you option, we can connect you with trusted partners—but that’s a separate service and investment." 
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
            "If you give me the chance to work with you, I promise I'll provide actual, measurable results or you'll get your money back. I'm not here to sell you hype—I'm here to build your business systems."
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
                  When I worked as an **Aerospace Engineer**, I saw first-hand how manual data entry and inefficient communication could ground high-level projects. I spent years perfecting custom AI-driven workflows at a large corporation, eventually creating systems that **saved hundreds of hours of manual labor** every single week.
               </p>
               <p className="text-xl text-zinc-400 leading-relaxed font-light">
                  Today, I bring that same engineering mindset to small businesses. Every workflow we design is built for precision, reliability, and maximum time reclamation.
               </p>
               <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { label: "Hours Saved Weekly", val: "5-15h" },
                     { label: "Average ROI", val: "10x+" },
                     { label: "Systems Built", val: "50+" }
                  ].map((stat, i) => (
                     <div key={i} className="text-center">
                        <p className="text-3xl font-bold text-white mb-1">{stat.val}</p>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                     </div>
                  ))}
               </div>
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
                },
                {
                  quote: "This isn't about 'ChatGPT tips.' It's about building a real system that talks to your tools. Game changer for my workflow.",
                  author: "David L.",
                  role: "Real Estate Professional"
                },
                {
                  quote: "The 'Real Results or Money Back' promise meant I had zero risk. But I wouldn't dream of asking for a refund—the value is clear.",
                  author: "Jessica M.",
                  role: "Creative Director"
                },
                {
                  quote: "If you're doing more than $200k/year and still handling your own admin, you need this. It's the best investment I made this year.",
                  author: "Tom H.",
                  role: "SaaS Sales Lead"
                }
              ].map((test, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
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
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
           <h2 className="text-3xl font-bold mb-8">Want Results Like These?</h2>
           <button 
             onClick={() => onNavigate('book')}
             className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl shadow-blue-500/10"
           >
              Book Your Free 15-Min Chat
           </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Tell us about your business..." />
              </div>
              <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookPage = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading badge="Schedule" align="center">Ready to Reclaim Your Time?</SectionHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           <div className="lg:col-span-1 space-y-8">
              <div className="p-8 glass rounded-[2.5rem] border-blue-500/10 bg-blue-500/[0.01]">
                 <h3 className="text-xl font-bold text-white mb-4">Uncertain?</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    If you're not quite sure how AI applies to your specific setup, book a **Free 15-Minute Intro Chat**. No pressure, just a brief conversation to see what we can deliver for you.
                 </p>
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">Questions?</p>
                    <p className="text-sm text-zinc-500">
                       Email us at **hello@ai-my-business.com.au** or message us on the contact page.
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
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Secure Booking Portal</span>
                  </div>
                  <div className="w-12 h-1 bg-white/5 rounded-full" />
                </div>
                <div className="w-full min-h-[700px] relative bg-zinc-950">
                  <div 
                    className="calendly-inline-widget" 
                    data-url="https://calendly.com/hello-ai-my-business?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=363636&text_color=ffffff&primary_color=0058da" 
                    style={{ minWidth: '320px', height: '900px' }}
                  ></div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    // Standard way to load Calendly in React/SPAs to ensure it initializes when the div is ready
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-4 block">AI Tools Assessment</span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Get a Tailored Roadmap to Win Back <span className="text-gradient">5–10 Hours Each Week</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
            No Hiring, No Coding, No Need to Become an AI Pro. Just clear, actionable paths designed specifically for your business.
          </p>
        </motion.div>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-1 gap-12 mb-24">
          {/* Is This Right for You? */}
          <div className="space-y-8">
            <SectionHeading badge="Compatibility">Is This Right for You?</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Negative Fit */}
              <div className="p-10 glass border-red-500/10 rounded-[2.5rem] bg-red-500/[0.01]">
                <h3 className="text-xl font-bold mb-8 text-red-400 uppercase tracking-widest flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  This is NOT for you if…
                </h3>
                <ul className="space-y-4 text-zinc-500">
                  {[
                    "You want someone to handle everything for you (this is a system you’ll apply yourself)",
                    "You’re hoping for instant results or “push-button” success",
                    "You’re unwilling to invest 30–60 minutes learning a tool to reclaim 5–10 hours weekly",
                    "You’ve never used ChatGPT or any AI tools before",
                    "You haven’t started generating revenue or built processes worth optimizing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <X className="w-5 h-5 shrink-0 mt-1 text-red-500/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Positive Fit */}
              <div className="p-10 glass border-green-500/10 rounded-[2.5rem] bg-green-500/[0.01]">
                <h3 className="text-xl font-bold mb-8 text-green-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  This IS for you if…
                </h3>
                <ul className="space-y-4 text-zinc-200">
                  {[
                    "You’re earning $150K–$500K/year and overwhelmed with admin tasks",
                    "You’ve used ChatGPT but aren’t sure how to weave AI into your daily workflows",
                    "You keep saving tools but never actually implement them",
                    "You want a clear starting point—not another course that overloads you",
                    "You’re ready to put in a few hours THIS WEEK to save countless hours later",
                    "You care more about execution than theory"
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
            </div>
          </div>

          {/* What You Get */}
          <div className="p-10 glass rounded-[2.5rem] bg-white/[0.02] border-white/10">
            <div className="flex items-center gap-4 mb-10 text-white">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase tracking-widest text-center md:text-left">Here's What You Get</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[ 
                { icon: Search, title: "1. Pre-Call Questionnaire", desc: "Short assessment about current tools and time drains to ensure every minute counts." },
                { icon: Video, title: "2. 45-Min Zoom Session", desc: "A live deep dive into your real workflows to uncover inefficiencies you haven't considered yet." },
                { icon: FileText, title: "3. Custom Report", desc: "Delivered within 48 hours, featuring identified pain points, ROI summary, and a 7-day implementation plan." }
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
            <div className="mesh-gradient-2 opacity-20" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">Ready to Stop Drowning in Admin Work?</h2>
              
              <div className="space-y-8 mb-12">
                <p className="text-xl text-zinc-400 font-light">You’ve got two choices:</p>
                
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
                    <p className="text-sm text-zinc-200">Or invest 45 minutes with us and walk away with a clear, actionable plan to take back your time.</p>
                  </div>
                </div>

                <p className="text-lg text-zinc-400 pt-4">
                  The assessment is <span className="text-white font-bold">$999</span>. The real cost of doing nothing is the hours you lose every single week.
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
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">45-Minute Assessment • Secure Booking</span>
                </div>
                <div className="w-12 h-1 bg-white/5 rounded-full" />
              </div>
              <div className="w-full min-h-[700px] relative bg-zinc-950">
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/hello-ai-my-business?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=363636&text_color=ffffff&primary_color=0058da" 
                  style={{ minWidth: '320px', height: '900px' }}
                ></div>
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

// --- App ---

export default function App() {
  const [view, setView] = useState('home');

  const handleNavigate = (newView: string) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-zinc-950">
      <div className="mesh-gradient-1" />
      <div className="mesh-gradient-2" />
      
      <Navbar onNavigate={handleNavigate} currentView={view} />

      <AnimatePresence mode="wait">
        <motion.div
           key={view}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2 }}
        >
          {view === 'home' && <Home onNavigate={handleNavigate} />}
          {view === 'assessment' && <AssessmentPage />}
          {view === 'problem' && <ProblemPage onNavigate={handleNavigate} />}
          {view === 'solution' && <SolutionPage onNavigate={handleNavigate} />}
          {view === 'results' && <ResultsPage onNavigate={handleNavigate} />}
          {view === 'about' && <AboutPage />}
          {view === 'contact' && <ContactPage />}
          {view === 'book' && <BookPage />}
          {view === 'faq' && <FAQPage />}
        </motion.div>
      </AnimatePresence>

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
  );
}
