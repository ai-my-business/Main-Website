import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] uppercase font-bold tracking-[0.2em] rounded mb-8"
          >
            Stop the Time Leaks
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-[5.5rem] font-bold leading-[0.85] tracking-tighter text-white mb-8"
          >
            Identify <br/><span className="text-indigo-500">Time Leaks</span> <br/>In seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-sm mb-8"
          >
            We help solo operators and small service businesses fix inefficiencies using simple AI tools. Reclaim 10+ hours a week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#quiz"
              className="px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-2xl shadow-indigo-600/20"
            >
              Take Free AI Quiz
            </a>
            <Link 
              to="/assessment"
              className="px-8 py-5 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 font-bold text-xs tracking-widest uppercase transition-all"
            >
              Book Time Audit
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1635350736475-c8cef4b21906?auto=format&fit=crop&q=80&w=800" 
              alt="Time Concept" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="p-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Average Saving</p>
                  <p className="text-2xl font-bold text-white tracking-widest">12.4 HOURS / WK</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
