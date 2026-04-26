import { motion } from 'motion/react';
import { Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/#services' },
    { name: 'Process', href: '/#how-it-works' },
    { name: 'Founder', href: '/#ceo' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">Ai <span className="text-indigo-500 font-black not-italic tracking-tighter">My</span> Business</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <Link 
            to="/assessment"
            className={`px-6 py-2 border font-bold text-[11px] uppercase tracking-wider transition-all ${
              location.pathname === '/assessment' 
              ? 'bg-indigo-600 border-indigo-600 text-white' 
              : 'border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-white'
            }`}
          >
            Tools Assessment
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
