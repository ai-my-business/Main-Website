import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export function ContactForm() {
  return (
    <div id="quiz" className="max-w-4xl mx-auto px-8 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 border border-slate-800 p-10 md:p-16 rounded-xl shadow-[0_0_50px_rgba(30,27,75,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rotate-45 translate-x-16 -translate-y-16 border-l border-b border-indigo-500/10" />
        
        <div className="relative z-10 text-center mb-12">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500 mb-4">Step 01: The Audit</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Take the AI Readiness Quiz.</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm italic">
            Find out exactly where you're wasting time. Receive your personalized "Quick Win" action plan via email.
          </p>
        </div>

        <form className="space-y-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text" 
              className="bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none p-4 text-xs font-medium uppercase tracking-widest text-white transition-all rounded"
              placeholder="YOUR NAME"
            />
            <input 
              type="email" 
              className="bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none p-4 text-xs font-medium uppercase tracking-widest text-white transition-all rounded"
              placeholder="WORK EMAIL"
            />
          </div>
          
          <div className="space-y-4">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Which best describes your business?</p>
             <div className="grid sm:grid-cols-3 gap-2">
                {['Solo Operator', 'Small Team (<10)', 'Agency'].map((opt) => (
                  <button key={opt} type="button" className="p-3 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-indigo-500 hover:text-white transition-all rounded">
                    {opt}
                  </button>
                ))}
             </div>
          </div>

          <textarea 
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none p-4 text-xs font-medium uppercase tracking-widest text-white transition-all rounded resize-none"
            placeholder="WHAT'S YOUR CURRENT BIGGEST TIME WASTE?"
          />

          <button 
            type="submit"
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/10 active:scale-[0.98]"
          >
            Start Quiz →
          </button>
          
          <p className="text-[10px] text-center text-slate-500 italic mt-6">
            You'll get an immediate score + a personalized PDF plan.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
