import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../constants';

export function Services() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 pb-8 border-b border-slate-900">
        <div>
          <h2 className="text-4xl font-bold mb-4">Core <span className="text-indigo-500">Solutions.</span></h2>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
            Detailed workflow analysis and custom implementations to drive high-yield ROI.
          </p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Capabilities / 04</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((service, index) => {
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-lg hover:border-indigo-500/40 transition-all flex flex-col h-full group"
            >
              <div className="text-indigo-500 text-sm font-mono mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-tight">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-normal flex-grow">{service.description}</p>
              <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-end">
                <div className="w-6 h-6 border-b border-r border-indigo-500/20" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
