import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { ArrowRight, GraduationCap, Users } from 'lucide-react';

const PATHWAYS = [
  {
    icon: Users,
    eyebrow: 'Athlete Development',
    title: 'Youth Development Pathway',
    description:
      'For young athletes and families who want smart training, steady growth, and a healthy path forward.',
    points: [
      'LTAD-aligned athlete development',
      'Provincial pathway preparation',
      'Camps, clinics, and skill-focused blocks',
    ],
    link: '/youth-pathway',
    cta: 'Explore Youth Development',
  },
  {
    icon: GraduationCap,
    eyebrow: 'Coach Education',
    title: 'Coach Mentorship',
    description:
      'For coaches who want sharper plans, better communication, and a mentor who understands the work.',
    points: [
      'Coach development and mentorship',
      'Applied sport science translation',
      'Program and pathway consulting',
    ],
    link: '/coach-mentorship',
    cta: 'Explore Coach Mentorship',
  },
];

export default function WhoWeServeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pathway-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 28,
        stagger: 0.12,
        duration: 0.55,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="who-we-serve" ref={sectionRef} className="section-spacing bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              CHOOSE YOUR PATH
            </p>
            <h2 className="font-display text-section text-[#1A1A1A] mb-5">
              Choose the path
              <br />
              that fits.
            </h2>
            <div className="accent-rule w-20 mb-6" />
            <p className="text-[#4A4A4A] leading-relaxed text-lg">
              TeamON is Mike's home for two connected kinds of work: developing
              athletes and helping coaches grow. Pick the path that sounds like you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PATHWAYS.map((pathway) => (
              <article
                key={pathway.title}
                className="pathway-card border border-[#E5E5E5] bg-[#FAFAFA] rounded-xl p-6 md:p-7 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-[#C41E3A]/10 flex items-center justify-center text-[#C41E3A] mb-6">
                  <pathway.icon className="w-6 h-6" />
                </div>
                <p className="font-mono-label text-[10px] text-[#C41E3A] tracking-widest mb-2">
                  {pathway.eyebrow}
                </p>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-3">
                  {pathway.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-5">
                  {pathway.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pathway.points.map((point) => (
                    <li key={point} className="text-sm text-[#4A4A4A] flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C41E3A] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={pathway.link}
                  className="inline-flex items-center gap-2 font-mono-label text-[11px] tracking-widest text-[#C41E3A] hover:text-[#9B1B30] transition-colors"
                >
                  {pathway.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
