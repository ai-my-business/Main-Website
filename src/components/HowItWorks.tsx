import { motion } from 'motion/react';
import { HOW_IT_WORKS } from '../constants';

export function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <h6 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-6 border-l-2 border-indigo-500 pl-4">
            Implementation Framework
          </h6>
          <h2 className="text-5xl font-bold mb-8 tracking-tighter leading-tight">
            How We <br/><span className="text-indigo-500">Scale</span> Ops.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            A precise four-stage deployment model ensuring seamless AI integration without disrupting current momentum.
          </p>
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:gap-4 transition-all">
            View full blueprint →
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center gap-6 p-6 transition-all ${
                index === 2 
                ? 'bg-indigo-950/20 border border-indigo-500/20 text-indigo-400' 
                : 'bg-slate-900/40 border border-slate-800'
              } rounded-lg group`}
            >
              <span className={`text-xs font-mono ${index === 2 ? 'text-indigo-500' : 'text-slate-500'}`}>
                0{step.id}
              </span>
              <span className="text-sm font-bold uppercase tracking-widest shrink-0">
                {step.title}
              </span>
              <div className={`h-px flex-grow ${index === 2 ? 'bg-indigo-500/30' : 'bg-slate-800 transition-colors group-hover:bg-slate-700'}`} />
              <div className="hidden md:block text-[10px] text-slate-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                PHASE_0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
