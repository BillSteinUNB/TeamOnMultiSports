import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { ArrowRight, Medal, Quote, Star, Target, Trophy } from 'lucide-react';

const STATS = [
  { number: 'Metric #1', label: 'ATHLETES COACHED', icon: Trophy },
  { number: 'Metric #2', label: 'QUALIFIERS OR PODIUMS', icon: Medal },
  { number: 'Metric #3', label: 'YOUTH OUTCOMES', icon: Target },
  { number: 'Metric #4', label: 'COACHES MENTORED', icon: Star },
];

const TESTIMONIALS = [
  {
    quote: 'Approved Testimonial #1',
    author: 'Athlete Name #1',
    achievement: 'Athlete Result #1',
  },
  {
    quote: 'Approved Testimonial #2',
    author: 'Coach Name #1',
    achievement: 'Coach Development Outcome #1',
  },
];

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="results" className="section-spacing bg-[#F8F8F8]">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
            RESULTS & PROOF
          </p>
          <h2 className="font-display text-section text-[#1A1A1A] mb-5">
            Results matter.
            <br />
            People matter more.
          </h2>
          <div className="accent-rule w-20 mb-6" />
          <p className="text-lg text-[#4A4A4A] leading-relaxed">
            The best results are not just faster times. They are athletes and
            coaches who understand what they are doing and trust the work.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-light p-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-[#C41E3A]" />
              </div>
              <div className="stat-number mb-1">{stat.number}</div>
              <div className="font-mono-label text-[11px] md:text-[10px] text-[#6B6B6B] tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div ref={contentRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="image-card aspect-[10/9]">
              <img
                src="/images/MikeWithMarathonRunner.jpg"
                alt="Michael On with a TeamON athlete"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>

            <div>
              <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
                HUMAN STORIES
              </span>
              <h3 className="font-display text-section text-[#1A1A1A] mb-4">
                Progress you can
                <br />
                <span className="text-[#C41E3A]">feel and measure.</span>
              </h3>
              <div className="accent-rule w-20 mb-6" />
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8">
                Add Mike's verified athlete results, coach mentorship outcomes,
                and approved testimonials here after the call.
              </p>

              <div className="space-y-4">
                {TESTIMONIALS.map((t) => (
                  <div key={t.author} className="border-l-2 border-[#C41E3A]/30 pl-4">
                    <Quote className="w-4 h-4 text-[#C41E3A]/50 mb-2" />
                    <p className="text-[#4A4A4A] italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-sm text-[#1A1A1A]">
                      {t.author} <span className="text-[#6B6B6B]">- {t.achievement}</span>
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/results"
                className="inline-flex items-center gap-2 mt-8 py-2 font-mono-label text-xs tracking-widest text-[#C41E3A] hover:text-[#9B1B30] transition-colors group"
              >
                VIEW RESULTS PAGE
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
