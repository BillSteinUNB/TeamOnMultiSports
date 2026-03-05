import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import ProgramCard from '@/components/ProgramCard';
import { Trophy, Users, Calendar, GraduationCap } from 'lucide-react';

const PROGRAMS = [
  {
    title: 'High-Performance Coaching',
    description:
      '1-on-1 endurance coaching for competitive triathletes and runners pursuing podium finishes.',
    features: [
      'Personalized training plans',
      'Weekly check-ins',
      'Race strategy',
      'Data analysis',
    ],
    linkTo: '/coaching',
    icon: Trophy,
  },
  {
    title: 'Youth Pathway',
    description:
      'LTAD-aligned development for young athletes pursuing provincial and national goals.',
    features: [
      'Age-appropriate progressions',
      'Multi-sport foundation',
      'Competition prep',
    ],
    linkTo: '/youth-pathway',
    icon: Users,
  },
  {
    title: 'Training Camps',
    description:
      'Intensive training blocks for focused performance gains in triathlon and running.',
    features: [
      'Multi-day immersion',
      'Group dynamics',
      'Structured schedule',
    ],
    linkTo: '/camps',
    icon: Calendar,
  },
  {
    title: 'Coach Mentorship',
    description:
      'Applied sport science and leadership development for coaching professionals.',
    features: [
      'Evidence-based methods',
      'Leadership skills',
      'Professional growth',
    ],
    linkTo: '/coach-mentorship',
    icon: GraduationCap,
  },
];

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.program-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="section-spacing">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-section">Programs</h2>
        <div className="accent-rule mb-12" />
        <div className="grid md:grid-cols-2 gap-8">
          {PROGRAMS.map((program) => (
            <div key={program.title} className="program-card">
              <ProgramCard
                title={program.title}
                description={program.description}
                features={program.features}
                linkTo={program.linkTo}
                icon={<program.icon className="w-8 h-8" />}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
