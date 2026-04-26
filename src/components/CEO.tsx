import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

export function CEO() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Photo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:order-1"
        >
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-2xl p-10 flex flex-col justify-between aspect-square relative shadow-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-slate-800 rounded-full border-2 border-indigo-500 p-1 flex-shrink-0 group overflow-hidden">
                 <div className="w-full h-full bg-slate-700 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                      className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700"
                      alt="Marcus Vane"
                      referrerPolicy="no-referrer"
                    />
                 </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl mb-1 tracking-tight">Marcus Vane</h4>
                <p className="text-indigo-400 text-[10px] uppercase font-bold tracking-widest">Founding Partner</p>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 italic mb-8 border-l-4 border-indigo-500/40 pl-6 leading-relaxed">
              "I work directly with every client to ensure our AI implementation drives actual ROI, not just hype."
            </p>
            
            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-6 font-bold uppercase tracking-widest flex items-center justify-between">
              <span>Expertise: RAG, Process Ops</span>
              <div className="flex gap-4">
                <Linkedin className="w-4 h-4 hover:text-indigo-400 transition-colors cursor-pointer" />
                <Mail className="w-4 h-4 hover:text-indigo-400 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Text */}
        <div className="lg:col-span-7 lg:order-2 space-y-8">
          <div className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-4 px-4 py-1 border border-slate-800">
            Founder's Note
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tighter">
            Bridging the gap between <span className="text-indigo-500">Intelligence</span> and <span className="text-white">Bottom Line.</span>
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed max-w-2xl">
            <p>
              Founded on the principle that cutting-edge AI shouldn't just be for big tech giants, Ai My Business bridges the gap for small and medium-sized businesses.
            </p>
            <p>
              I work hands-on with my team to transform complex manual legacy workflows into streamlined, autonomous pipelines. No bloated agencies, no buzzword-only strategies—just real, production-ready AI.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-900 max-w-lg">
             <div>
                <span className="block text-2xl font-bold text-white mb-2">15+ Years</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tech Ops Experience</span>
             </div>
             <div>
                <span className="block text-2xl font-bold text-white mb-2">40% Savings</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Average Client ROI</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
