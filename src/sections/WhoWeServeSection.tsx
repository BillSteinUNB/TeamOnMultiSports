import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { Target, Users, GraduationCap } from 'lucide-react';

const AUDIENCES = [
  {
    icon: Target,
    title: 'High-Performance Athletes',
    description:
      'Triathletes and runners pursuing competitive goals — Kona, Boston, podium finishes.',
    link: '/coaching',
    cta: 'Explore Coaching',
  },
  {
    icon: Users,
    title: 'Youth Athletes',
    description:
      'Developing athletes through LTAD-aligned pathways toward provincial and national goals.',
    link: '/youth-pathway',
    cta: 'Youth Pathway',
  },
  {
    icon: GraduationCap,
    title: 'Coaches',
    description:
      'Mentorship and applied sport science for coaching professionals advancing their practice.',
    link: '/coach-mentorship',
    cta: 'Coach Mentorship',
  },
];

export default function WhoWeServeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.audience-card', {
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
    <section id="who-we-serve" ref={sectionRef} className="section-spacing">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-section">Who We Serve</h2>
        <div className="accent-rule mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {AUDIENCES.map((audience) => (
            <div
              key={audience.title}
              className="audience-card card-light p-6 rounded-lg text-center"
            >
              <audience.icon className="w-12 h-12 mx-auto mb-4 text-[#C41E3A]" />
              <h3 className="font-display text-xl mb-3">{audience.title}</h3>
              <p className="text-gray-600 mb-6">{audience.description}</p>
              <Link to={audience.link} className="btn-primary inline-block">
                {audience.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
