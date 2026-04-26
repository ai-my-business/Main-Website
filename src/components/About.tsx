import { motion } from 'motion/react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-12 mb-16"
        >
           <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500 mb-6">Built For Solo Operators / Small Business</div>
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] mb-8">
             AI Made Practical. <br/>
             <span className="text-indigo-500">No Fluff</span> Allowed.
           </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 grid grid-cols-2 gap-1"
        >
          <div className="col-span-2 bg-slate-900/50 border border-slate-800 p-12 transition-all hover:bg-slate-900">
            <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
              We don't build complex neural networks. We help you use simple, existing AI tools to automate the boring stuff. If a tool doesn't save you time in the first 30 minutes, we don't recommend it.
            </p>
          </div>
          <div className="bg-indigo-950/20 border border-indigo-500/20 p-8 flex flex-col justify-between">
             <span className="text-4xl font-bold text-white mb-2">100+</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Time Leaks Fixed</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 flex flex-col justify-between">
             <span className="text-4xl font-bold text-white mb-2">2 min</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Average Quiz Time</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative h-full"
        >
          <div className="aspect-[4/5] rounded-lg overflow-hidden border border-slate-800 shadow-2xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" 
              alt="Practical Planning" 
              className="w-full h-full object-cover grayscale opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  );
}
