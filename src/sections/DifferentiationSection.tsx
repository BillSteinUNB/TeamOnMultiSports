import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Activity, Brain, TrendingUp } from 'lucide-react';

const PILLARS = [
  {
    icon: Activity,
    title: 'Physiological Precision',
    description:
      "Periodized, metric-driven programming that adapts to your body's responses — not generic templates.",
  },
  {
    icon: Brain,
    title: 'Psychological Readiness',
    description:
      'Mental performance integration — not afterthought coaching, but embedded resilience training.',
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Development',
    description:
      'Progression frameworks that prevent burnout and build sustainable performance over years.',
  },
];

export default function DifferentiationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pillar-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="differentiation"
      ref={sectionRef}
      className="section-spacing bg-[#F8F8F8]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-section font-display">Performance Architecture</h2>
        <div className="accent-rule mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="pillar-card card-light text-center p-6">
              <pillar.icon className="w-12 h-12 mx-auto mb-4 text-[#C41E3A]" />
              <h3 className="font-display text-xl mb-3">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
