import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { TrendingUp, Heart, Compass } from 'lucide-react';

const PILLARS = [
  {
    icon: TrendingUp,
    title: 'Competence',
    description:
      "Structured progression that builds confidence through measurable growth. Every training block has a purpose.",
  },
  {
    icon: Heart,
    title: 'Connection',
    description:
      "Community and coach relationship that sustains motivation. You're not training alone.",
  },
  {
    icon: Compass,
    title: 'Choice',
    description:
      'Athlete autonomy in your development journey. We guide — you decide.',
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philosophy-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
      });
      gsap.from('.philosophy-quote', {
        scrollTrigger: { trigger: '.philosophy-quote', start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="section-spacing">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-section font-display text-center text-[#1A1A1A]">Our Philosophy</h2>
        <div className="accent-rule w-20 mx-auto mb-12" />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="philosophy-card text-center p-6">
              <pillar.icon className="w-12 h-12 mx-auto mb-4 text-[#C41E3A]" />
              <h3 className="font-display text-xl mb-3">{pillar.title}</h3>
              <p className="text-[#4A4A4A]">{pillar.description}</p>
            </div>
          ))}
        </div>

        <blockquote className="philosophy-quote text-center max-w-3xl mx-auto">
          <span className="quote-mark text-[#C41E3A]">"</span>
          <p className="text-xl md:text-2xl text-[#4A4A4A] italic mb-4">
            Training should build you up, not break you down. Every session is
            an investment in the athlete you're becoming.
          </p>
          <footer className="font-mono-label text-sm text-[#6B6B6B]">
            — Coach Mike On
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
