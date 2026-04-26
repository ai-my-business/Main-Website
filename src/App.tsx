/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { CEO } from './components/CEO';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AssessmentPage } from './components/AssessmentPage';

function LandingPage() {
  return (
    <main className="max-w-[1440px] mx-auto overflow-hidden">
      <section id="hero">
        <Hero />
      </section>
      
      <section id="about" className="py-24 border-y border-slate-900 bg-slate-900/10">
        <About />
      </section>

      <section id="services" className="py-24 border-b border-slate-900">
        <Services />
      </section>

      <section id="how-it-works" className="py-24 border-b border-slate-900 bg-slate-900/5">
        <HowItWorks />
      </section>

      <section id="benefits" className="py-24 border-b border-slate-900">
        <Benefits />
      </section>

      <section id="ceo" className="py-24 border-b border-slate-900 bg-indigo-950/10">
        <CEO />
      </section>

      <section id="testimonials" className="py-24">
        <Testimonials />
      </section>

      <section id="contact" className="py-24 bg-indigo-600/5">
        <ContactForm />
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

