/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  X
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-medium text-xl tracking-tight text-white">Ai My Business</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
          <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
          <a href="#process" className="hover:text-white transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <button className="bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all font-semibold text-sm">
            Free AI Audit
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
            <a href="#problem" onClick={() => setIsOpen(false)} className="text-lg font-medium">The Problem</a>
            <a href="#process" onClick={() => setIsOpen(false)} className="text-lg font-medium">How It Works</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="text-lg font-medium">FAQ</a>
            <button className="w-full bg-white text-black px-5 py-3 rounded-xl font-bold">
              Free AI Audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, badge }: { children: React.ReactNode, badge?: string }) => (
  <div className="flex flex-col items-center text-center mb-16 px-4">
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

// --- App ---

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950">
      <div className="mesh-gradient-1" />
      <div className="mesh-gradient-2" />
      
      <Navbar />

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
                Get Back <span className="text-gradient">5–10 Hours</span> <br className="hidden lg:block" /> Every Week.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl lg:mx-0 mx-auto font-light leading-relaxed">
                Simple AI systems. No tech skills. No complicated setups. Just clear, practical improvements to your daily workflow.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 overflow-hidden shadow-xl shadow-white/5">
                  <span>👉 Start Free AI Time Audit</span>
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                  Learn how it works
                </button>
              </div>

              {/* Quick Value Points */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-[10px] text-blue-400 shrink-0">✓</div>
                  <p className="text-sm text-zinc-500">
                    <span className="text-zinc-200 block font-medium">Remove Manual Work</span> 
                    Automate repetitive emails and admin.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-[10px] text-blue-400 shrink-0">✓</div>
                  <p className="text-sm text-zinc-500">
                    <span className="text-zinc-200 block font-medium">Instant Delivery</span> 
                    Speed up client communication.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block flex-1 max-w-xl"
          >
            <div className="p-1 glass rounded-[3rem]">
              <div className="bg-zinc-900/50 rounded-[2.8rem] p-10 relative overflow-hidden backdrop-blur-3xl border border-white/5">
                <div className="absolute top-0 right-0 p-8">
                   <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/10">
                      <Brain className="w-6 h-6 text-blue-400" />
                   </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-4 bg-white/5 rounded-full w-1/3" />
                  <div className="space-y-3">
                    <div className="h-10 bg-white/5 rounded-2xl border border-white/5 flex items-center px-4 gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="h-2 bg-white/10 rounded-full w-2/3" />
                    </div>
                    <div className="h-10 bg-white/5 rounded-2xl border border-white/5 flex items-center px-4 gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <div className="h-2 bg-white/10 rounded-full w-1/2" />
                    </div>
                  </div>
                  
                  <div className="pt-8">
                     <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Average Weekly Saving</p>
                     <div className="flex items-end gap-3">
                        <span className="text-6xl font-bold">+8.5h</span>
                        <div className="flex gap-1 h-12 items-end mb-2">
                           <div className="w-2 h-1/4 bg-blue-500/20 rounded-t" />
                           <div className="w-2 h-1/2 bg-blue-500/40 rounded-t" />
                           <div className="w-2 h-3/4 bg-blue-500/60 rounded-t" />
                           <div className="w-2 h-full bg-blue-500 rounded-t" />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="problem" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Problem">What’s Holding You Back</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Admin Overload", text: "Constant admin tasks eating into your focused work." },
              { icon: Workflow, title: "Tool Fragmentation", text: "Switching between too many disconnected tools." },
              { icon: FileText, title: "Repetitive Tasks", text: "Rewriting the same emails, posts, or proposals." },
              { icon: Users, title: "Inefficient Onboarding", text: "Manually handling onboarding or client updates." },
              { icon: AlertCircle, title: "Lack of Systems", text: "Using AI tools without a clear system behind them." },
              { icon: Sparkles, title: "Slow Progress", text: "Your days feel packed but progress feels slow." },
            ].map((item, id) => (
              <motion.div 
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.1 }}
                className="p-10 glass rounded-[2.5rem] hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:bg-blue-500/10 transition-colors">
                  <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/5 pt-12 text-center max-w-3xl mx-auto">
            <p className="text-xl text-zinc-500 font-light leading-relaxed">
              "Even with modern tools, most people never set things up in a way that actually saves time."
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 md:py-32 px-6 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-indigo-400 mb-4 block">The Compass</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1]">What This Solves</h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                We help you uncover exactly where your time is being lost—and replace that with simple AI-driven workflows.
              </p>
              <ul className="space-y-6">
                {[
                  "No overwhelm. No technical learning curve.",
                  "Bespoke strategy tailored to your work.",
                  "Simple AI improvements you can actually use.",
                  "Practical systems that scale automatically."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-zinc-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <div className="relative p-8 glass rounded-[3rem]">
               <div className="aspect-square bg-zinc-900/50 rounded-[2.5rem] flex flex-col justify-center p-12 gap-8 border border-white/5">
                  <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/10">
                     <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Goal</p>
                     <p className="text-2xl font-medium">Reclaim 10h / Week</p>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm text-zinc-500 mb-2">
                        <span>Efficiency</span>
                        <span>94%</span>
                     </div>
                     <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: '94%' }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 glass rounded-2xl text-center">
                        <p className="text-xs text-zinc-500 mb-1">Status</p>
                        <p className="font-bold text-green-400">Optimized</p>
                     </div>
                     <div className="p-4 glass rounded-2xl text-center">
                        <p className="text-xs text-zinc-500 mb-1">Impact</p>
                        <p className="font-bold">High</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The solution">Our 3-Step Process</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "1", 
                title: "Audit", 
                text: "A quick 2–3 minute assessment that highlights your biggest inefficiencies and time-leaks." 
              },
              { 
                step: "2", 
                title: "AI assessment", 
                text: "You’ll get a personalised breakdown showing your main drains and immediate improvements." 
              },
              { 
                step: "3", 
                title: "Hands-On Support", 
                text: "We can design and optimise your workflows so everything runs more efficiently for you." 
              },
            ].map((item, id) => (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.1 }}
                className="p-10 glass rounded-[2.5rem] bg-white/[0.02] border-white/5 flex flex-col items-start gap-8 group"
              >
                <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center font-display font-bold text-2xl group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                  {item.step}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-lg">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[3.5rem] border-white/10 relative overflow-hidden">
          <div className="mesh-gradient-2 opacity-30" />
          <h2 className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight relative z-10">What This Helps You Achieve</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {[
              "Free up 5–10 hours every week",
              "Remove repetitive manual work",
              "Speed up writing and delivery",
              "Reduce daily decision overload",
              "Consistent background systems",
              "Scale without burning out"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-xl font-medium text-zinc-200">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading badge="The Audience">Who It’s For</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Freelancers", text: "Managing everything yourself." },
              { title: "Coaches", text: "Working with multiple clients." },
              { title: "Small Biz", text: "Business owners doing too much." },
              { title: "AI Enthusiasts", text: "Using AI but not seeing gains." },
            ].map((item, id) => (
              <div key={id} className="p-8 glass rounded-[2rem] border-white/5 hover:bg-white/[0.05] transition-all">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading badge="Help Center">Common Questions</SectionHeading>
          
          <div className="glass rounded-[3rem] p-8 md:p-14 border-white/5">
            {[
              { 
                question: "Do I need technical experience?", 
                answer: "Not at all. Everything is designed to be simple, actionable, and accessible. If you can handle an email, you can handle these systems." 
              },
              { 
                question: "How quickly can I use this?", 
                answer: "Most improvements can be applied in under an hour per workflow. You'll see immediate results from the first setup." 
              },
              { 
                question: "Is this just about AI theory?", 
                answer: "No—this is strictly focused on real, working systems you can set up and use immediately. No fluff, just practical utility." 
              },
              { 
                question: "What tools are required?", 
                answer: "Usually just basic AI tools like ChatGPT and lightweight apps like Zapier or Make. We keep your stack as simple as possible." 
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-bold mb-10 text-white tracking-tighter">
            Stop Losing <br /> Hours Every Week
          </h2>
          <p className="text-xl md:text-2xl text-zinc-500 mb-12 max-w-2xl mx-auto font-light">
            You don’t need more effort—you need better systems. Start by identifying where your time is disappearing.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-blue-500/20">
              <span>Take the Free AI Audit</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

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
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
