import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="border-l-4 border-indigo-500 pl-8 mb-16">
        <h2 className="text-5xl font-bold tracking-tighter mb-4 text-white">Client Impact.</h2>
        <p className="text-slate-400 text-lg uppercase tracking-widest font-medium opacity-50">Validation / Verified Case Studies</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-px bg-slate-800 border border-slate-800 rounded-lg overflow-hidden">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="p-12 md:p-16 bg-slate-950 flex flex-col justify-between group"
          >
            <div>
              <Quote className="w-10 h-10 text-indigo-500/20 mb-8 group-hover:text-indigo-500/40 transition-colors" />
              <p className="text-2xl text-slate-200 font-light leading-relaxed mb-12 italic">
                "{testimonial.content}"
              </p>
            </div>
            
            <div className="flex items-center gap-6 pt-10 border-t border-slate-900">
              <div className="w-12 h-12 rounded-full border border-slate-800 p-1 flex-shrink-0">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-full h-full rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-white font-bold uppercase tracking-widest text-xs mb-1">{testimonial.name}</p>
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-tighter">{testimonial.role} @ {testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
