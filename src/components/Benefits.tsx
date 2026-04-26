import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { BENEFITS } from '../constants';

export function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500 mb-6">Advantage / ROI</div>
          <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-tight">Why Choose <br/><span className="text-indigo-500">Ai My Business</span>?</h2>
          <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">
            We don't just implement technology; we solve business problems. Our focus is on tangible outcomes that impact your bottom line.
          </p>
          <div className="w-12 h-1 bg-indigo-600 rounded-full" />
        </div>
        
        <div className="lg:col-span-8 grid md:grid-cols-1 gap-4">
          {BENEFITS.map((benefit, index) => {
            const IconComponent = (Icons as any)[benefit.iconName];
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-8 p-8 rounded bg-slate-900/30 border border-slate-800/50 hover:border-slate-700 transition-all group"
              >
                <div className="shrink-0 w-14 h-14 rounded bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white uppercase tracking-tight">{benefit.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-xl">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
