import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { ArrowRight, GraduationCap, Trophy, Users } from 'lucide-react';

const PROGRAMS = [
  {
    eyebrow: 'Youth Development',
    title: 'Youth athletes need the right pace.',
    body:
      'Build skills, confidence, and long-term habits without rushing the process.',
    points: [
      'Youth Age Range #1',
      'Parent Communication Detail #1',
      'Provincial Pathway Detail #1',
    ],
    link: '/youth-pathway',
    cta: 'View Youth Pathway',
    icon: Users,
  },
  {
    eyebrow: 'Coach Mentorship',
    title: 'Coaches need coaches too.',
    body:
      'Support for coaches who want better systems, better conversations, and better judgment.',
    points: [
      'Mentorship Format Detail #1',
      'Mentorship Topic #1',
      'Coach Development Outcome #1',
    ],
    link: '/coach-mentorship',
    cta: 'View Coach Mentorship',
    icon: GraduationCap,
  },
  {
    eyebrow: 'Athlete Coaching',
    title: 'Athletes need more than workouts.',
    body:
      'Clear training, steady feedback, and a plan that fits the athlete in front of him.',
    points: [
      'Training Platform Detail #1',
      'Communication Detail #1',
      'Coaching Outcome #1',
    ],
    link: '/coaching',
    cta: 'View Athlete Coaching',
    icon: Trophy,
  },
];

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.home-program', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 32,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
            WHAT TEAMON DOES
          </p>
          <h2 className="font-display text-section text-[#1A1A1A] mb-5">
            Built for athletes.
            <br />
            Built for coaches.
          </h2>
          <div className="accent-rule w-20 mb-6" />
          <p className="text-lg text-[#4A4A4A] leading-relaxed">
            TeamON brings Mike's coaching under one roof: athlete coaching,
            youth development, camps, and coach mentorship.
          </p>
        </div>

        <div className="space-y-6">
          {PROGRAMS.map((program) => (
            <article
              key={program.eyebrow}
              className="home-program grid lg:grid-cols-[0.36fr_1fr_auto] gap-6 lg:gap-8 items-start border border-[#E5E5E5] rounded-xl bg-[#FAFAFA] p-6 lg:p-8"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#C41E3A]/10 flex items-center justify-center text-[#C41E3A] mb-5">
                  <program.icon className="w-6 h-6" />
                </div>
                <p className="font-mono-label text-[10px] text-[#C41E3A] tracking-widest">
                  {program.eyebrow}
                </p>
              </div>

              <div>
                <h3 className="font-display text-3xl text-[#1A1A1A] mb-3">
                  {program.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-5 max-w-3xl">
                  {program.body}
                </p>
                <ul className="grid sm:grid-cols-3 gap-3">
                  {program.points.map((point) => (
                    <li key={point} className="text-sm text-[#4A4A4A] flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C41E3A] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={program.link}
                className="inline-flex items-center gap-2 font-mono-label text-[11px] tracking-widest text-[#C41E3A] hover:text-[#9B1B30] transition-colors whitespace-nowrap"
              >
                {program.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
