export function Footer() {
  return (
    <footer className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 border-t border-slate-800 px-12 py-8 uppercase tracking-[0.3em] gap-8">
      <div className="flex gap-10 flex-wrap justify-center">
        <span>© {new Date().getFullYear()} Ai My Business LLC</span>
        <span>Melbourne / Sydney / Remote</span>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
      </div>
    </footer>
  );
}
