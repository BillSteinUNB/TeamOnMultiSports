import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Users, TrendingUp, Award, Quote } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CaseStudyCard from '@/components/CaseStudyCard';
import CTABanner from '@/components/CTABanner';

const CASE_STUDIES = [
  {
    name: 'Athlete Result #1',
    discipline: 'Discipline #1',
    achievement: 'Coaching Outcome #1',
    metrics: {
      before: 'Before Metric #1',
      after: 'After Metric #1',
      stats: ['Training Block Detail #1', 'Performance Detail #1'],
    },
    testimonialSnippet:
      'Athlete Quote #1. Replace with an approved testimonial after permission is confirmed.',
  },
  {
    name: 'Athlete Result #2',
    discipline: 'Discipline #2',
    achievement: 'Coaching Outcome #2',
    metrics: {
      before: 'Before Metric #2',
      after: 'After Metric #2',
      stats: ['Training Block Detail #2', 'Performance Detail #2'],
    },
    testimonialSnippet:
      'Athlete Quote #2. Replace with an approved testimonial after permission is confirmed.',
  },
  {
    name: 'Athlete Result #3',
    discipline: 'Discipline #3',
    achievement: 'Coaching Outcome #3',
    metrics: {
      before: 'Before Metric #3',
      after: 'After Metric #3',
      stats: ['Training Block Detail #3', 'Performance Detail #3'],
    },
    testimonialSnippet:
      'Athlete Quote #3. Replace with an approved testimonial after permission is confirmed.',
  },
  {
    name: 'Youth Athlete Result #1',
    discipline: 'Youth Development',
    achievement: 'Youth Pathway Outcome #1',
    metrics: {
      before: 'Starting Point #1',
      after: 'Development Outcome #1',
      stats: ['Pathway Detail #1', 'Season Detail #1'],
    },
    testimonialSnippet:
      'Parent or athlete quote #1. Replace after permission is confirmed.',
  },
];

const AGGREGATE_METRICS = [
  { number: 'Metric #1', label: 'ATHLETES COACHED', icon: Users },
  { number: 'Metric #2', label: 'PERFORMANCE IMPROVEMENTS', icon: TrendingUp },
  { number: 'Metric #3', label: 'PODIUMS OR QUALIFIERS', icon: Award },
];

const TESTIMONIALS = [
  {
    quote: 'Approved Testimonial #1',
    name: 'Athlete Name #1',
    discipline: 'Athlete Context #1',
  },
  {
    quote: 'Approved Testimonial #2',
    name: 'Athlete Name #2',
    discipline: 'Athlete Context #2',
  },
  {
    quote: 'Approved Testimonial #3',
    name: 'Athlete Name #3',
    discipline: 'Athlete Context #3',
  },
  {
    quote: 'Approved Testimonial #4',
    name: 'Athlete Name #4',
    discipline: 'Athlete Context #4',
  },
];

export default function ResultsPage() {
  const caseStudiesRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.results-case-card', {
        scrollTrigger: { trigger: caseStudiesRef.current, start: 'top 75%' },
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.results-metric-item', {
        scrollTrigger: { trigger: metricsRef.current, start: 'top 80%' },
        y: 24,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
      });

      gsap.from('.results-testimonial', {
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 75%' },
        x: -30,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Athlete Results | TeamON Multisports</title>
        <meta name="description" content="Athlete outcomes and testimonials from TeamON Multisports." />
      </Helmet>
      <PageHero
        title="Results"
        subtitle="A place for verified athlete outcomes, development stories, and approved testimonials."
        breadcrumb="Home / Results"
      />

      <section ref={caseStudiesRef} className="section-spacing bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
            ATHLETE CASE STUDIES
          </span>
          <h2 className="font-display text-section text-[#1A1A1A] mb-4">
            VERIFIED<br />
            <span className="text-[#C41E3A]">OUTCOMES</span>
          </h2>
          <div className="accent-rule w-20 mb-10" />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {AGGREGATE_METRICS.map((metric) => (
              <div key={metric.label} className="results-metric-item card-light p-8 text-center bg-white/5 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div className="stat-number text-white mb-2">{metric.number}</div>
                <div className="font-mono-label text-[11px] md:text-[10px] text-white/60 tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <div key={t.name} className="results-testimonial card-light p-8 relative">
                <Quote className="w-8 h-8 text-[#C41E3A]/15 absolute top-6 right-6" />
                <blockquote className="text-[#4A4A4A] text-lg italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-display text-lg text-[#1A1A1A]">{t.name}</p>
                  <p className="font-mono-label text-[11px] md:text-[10px] text-[#C41E3A] tracking-widest">
                    {t.discipline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        variant="apply"
        heading="Your Breakthrough Is Next"
        subheading="Apply for coaching and start building toward your next verified result."
      />
    </>
  );
}
