import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Users, TrendingUp, Award, Quote } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CaseStudyCard from '@/components/CaseStudyCard';
import CTABanner from '@/components/CTABanner';

/* ──────────────────────────────────────────────────────────
   DRAFT: All athlete names, statistics, and quotes below are
   placeholders pending permission confirmation with Coach Mike.
   Do NOT publish without verifying every data point.
   ────────────────────────────────────────────────────────── */

const CASE_STUDIES = [
  {
    name: 'DRAFT — Marathon Runner',
    discipline: 'Marathon',
    achievement: '3:45 → 3:12 PR',
    metrics: {
      before: '3:45:22',
      after: '3:12:08',
      stats: ['16-week build cycle', 'BQ by 8 minutes'],
    },
    testimonialSnippet:
      'The structured periodization and weekly check-ins kept me honest. I stopped guessing and started training with intent.',
  },
  {
    name: 'DRAFT — First-Time 70.3 Athlete',
    discipline: 'Triathlon · 70.3',
    achievement: 'First podium finish in debut half-Ironman',
    metrics: {
      before: 'No prior tri experience',
      after: 'Age-group podium',
      stats: ['Swim–bike–run integration', '6-month progression'],
    },
    testimonialSnippet:
      'Mike built my confidence in the water when I could barely finish 200 m. By race day, the swim felt like the easy part.',
  },
  {
    name: 'DRAFT — Age-Group Competitor',
    discipline: 'Triathlon · Olympic',
    achievement: 'Consistent top-10 age-group finishes',
    metrics: {
      before: 'Mid-pack finisher',
      after: 'Top-10 in 5 consecutive races',
      stats: ['Pacing strategy overhaul', 'Strength-to-weight focus'],
    },
    testimonialSnippet:
      'What changed wasn\u2019t just my fitness—it was my race-day decision-making. Mike taught me to race, not just participate.',
  },
  {
    name: 'DRAFT — Comeback Runner',
    discipline: 'Running · Half Marathon',
    achievement: 'Return to racing post-injury, new half-marathon PR',
    metrics: {
      before: 'Sidelined 14 months',
      after: '1:28 half-marathon PR',
      stats: ['Phased return-to-run protocol', 'Zero re-injury'],
    },
    testimonialSnippet:
      'After a stress fracture I thought I was done. Mike\u2019s patience and the gradual rebuild gave me more than a PR—it gave me trust in my body again.',
  },
  {
    name: 'DRAFT — Youth Triathlete',
    discipline: 'Youth · Triathlon',
    achievement: 'Provincial team selection, first nationals appearance',
    metrics: {
      before: 'Recreational swimmer / runner',
      after: 'Team NB selection',
      stats: ['Multi-sport development', '2-year pathway'],
    },
    testimonialSnippet:
      'Coach Mike made training fun but purposeful. I never felt like I was being pushed too hard—it just clicked.',
  },
];

/* DRAFT: Aggregate numbers are estimates — verify with Coach Mike */
const AGGREGATE_METRICS = [
  { number: '100+', label: 'ATHLETES COACHED', icon: Users },
  { number: '~12%', label: 'AVG PR IMPROVEMENT', icon: TrendingUp },
  { number: '30+', label: 'PODIUM FINISHES', icon: Award },
];

const TESTIMONIALS = [
  {
    quote:
      'Mike\u2019s approach changed everything. The mindfulness training helped me stay focused during my Kona qualifier.',
    name: 'Sarah K.',
    discipline: 'Ironman · Kona Qualifier',
  },
  {
    quote:
      'The data-driven approach combined with recovery focus took my performance to the next level. I finally trained smarter, not just harder.',
    name: 'James M.',
    discipline: 'Marathon · Boston Qualifier',
  },
  {
    quote:
      'I was stuck in the same pace for three years. Six months with Mike and I ran a 22-minute PR in the half marathon. He sees what you can\u2019t see in yourself.',
    name: 'Laura P.',
    discipline: 'Running · Half Marathon',
  },
  {
    quote:
      'As a masters athlete, I was worried about pushing too hard. Mike\u2019s programming respects recovery without sacrificing ambition.',
    name: 'David R.',
    discipline: 'Triathlon · Age-Group',
  },
];

export default function ResultsPage() {
  const caseStudiesRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Case study cards — stagger in */
      gsap.fromTo(
        '.results-case-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Aggregate metrics — pop up */
      gsap.fromTo(
        '.results-metric-item',
        { y: 24, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Testimonial quotes — slide in */
      gsap.fromTo(
        '.results-testimonial',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Athlete Results | TeamOn Multisports</title>
        <meta name="description" content="Real results from coached athletes — Kona qualifiers, Boston finishers, personal records." />
      </Helmet>
      {/* ───── Hero ───── */}
      <PageHero
        title="Results"
        subtitle="Real outcomes from real athletes. Every number here represents hours of commitment, trust in the process, and coaching built on science."
        breadcrumb="Home / Results"
      />

      {/* ───── Case Studies ───── */}
      <section ref={caseStudiesRef} className="section-spacing bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
            ATHLETE CASE STUDIES
          </span>
          <h2 className="font-display text-section text-[#1A1A1A] mb-4">
            THE<br />
            <span className="text-[#C41E3A]">BREAKTHROUGHS</span>
          </h2>
          <div className="accent-rule w-20 mb-10" />

          {/* DRAFT: All case studies below require athlete permission before publishing */}
          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.name}
                name={study.name}
                discipline={study.discipline}
                achievement={study.achievement}
                metrics={study.metrics}
                testimonialSnippet={study.testimonialSnippet}
                variant="full"
                className="results-case-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Aggregate Metrics ───── */}
      <section ref={metricsRef} className="section-spacing bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
              BY THE NUMBERS
            </span>
            <h2 className="font-display text-section text-white mb-4">
              COLLECTIVE<br />
              <span className="text-[#C41E3A]">IMPACT</span>
            </h2>
            <div className="accent-rule w-20 mx-auto" />
          </div>

          {/* DRAFT: All aggregate numbers are estimates — verify with Coach Mike */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {AGGREGATE_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="results-metric-item card-light p-8 text-center bg-white/5 border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div className="stat-number text-white mb-2">{metric.number}</div>
                <div className="font-mono-label text-[10px] text-white/60 tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Testimonials ───── */}
      <section ref={testimonialsRef} className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
              IN THEIR WORDS
            </span>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              ATHLETE<br />
              <span className="text-[#C41E3A]">VOICES</span>
            </h2>
            <div className="accent-rule w-20 mx-auto" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="results-testimonial card-light p-8 relative"
              >
                <Quote className="w-8 h-8 text-[#C41E3A]/15 absolute top-6 right-6" />
                <blockquote className="text-[#4A4A4A] text-lg italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-display text-lg text-[#1A1A1A]">{t.name}</p>
                  <p className="font-mono-label text-[10px] text-[#C41E3A] tracking-widest">
                    {t.discipline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <CTABanner
        variant="apply"
        heading="Your Breakthrough Is Next"
        subheading="Apply for coaching and join the athletes who stopped guessing and started progressing."
      />
    </>
  );
}
