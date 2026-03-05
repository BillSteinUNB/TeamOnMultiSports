import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  GraduationCap,
  Target,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
  Heart,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

/* ─── DATA ─────────────────────────────────────────── */

const STAGES = [
  {
    icon: GraduationCap,
    label: 'Stage 1',
    title: 'Foundation',
    age: 'Ages 6–12',
    color: '#2D8A4E',
    items: [
      'Physical literacy & fundamental movement skills',
      'Multi-sport exploration — swim, bike, run & play',
      'Building confidence through fun, low-pressure activity',
      'Developing coordination, balance & agility',
    ],
    philosophy:
      'At this stage, falling in love with movement matters far more than metrics. Every session is built around play, discovery, and positive experiences.',
  },
  {
    icon: Target,
    label: 'Stage 2',
    title: 'Development',
    age: 'Ages 13–16',
    color: '#C47B1E',
    items: [
      'Introduction to structured training cycles',
      'Sport-specific skill acquisition & technique focus',
      'Learning training discipline & self-management',
      'Gradual introduction to age-appropriate competition',
    ],
    philosophy:
      'Athletes begin to train with intention. We build consistent habits, teach them how to listen to their bodies, and layer in progressive challenge.',
  },
  {
    icon: TrendingUp,
    label: 'Stage 3',
    title: 'Performance',
    age: 'Ages 17–19',
    color: '#C41E3A',
    items: [
      'Competition preparation & race-day strategies',
      'Advanced periodization & structured peaking',
      'Mental performance & resilience training',
      'Pathway planning toward senior sport or scholarship',
    ],
    philosophy:
      "For athletes ready to compete seriously — we sharpen the tools they've built, integrating physical, mental, and tactical preparation.",
  },
] as const;

const PARENT_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description:
      'Every session follows age-appropriate loading guidelines. We monitor training stress, prioritise recovery, and never chase short-term results at the expense of long-term wellbeing.',
  },
  {
    icon: MessageCircle,
    title: 'Open Communication',
    description:
      'Parents receive regular updates, seasonal progress summaries, and are always welcome to ask questions. We believe transparency builds trust.',
  },
  {
    icon: Heart,
    title: 'Athletes AND People',
    description:
      'We develop athletes AND people. Character, sportsmanship, resilience, and a lifelong love of sport are as important as any race result.',
  },
] as const;

/* ─── COMPONENT ────────────────────────────────────── */

export default function YouthPathwayPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* LTAD intro */
      gsap.from('.ltad-intro', {
        scrollTrigger: { trigger: '.ltad-section', start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 0.7,
      });

      /* Stage cards — stagger in */
      gsap.from('.stage-card', {
        scrollTrigger: { trigger: '.stages-grid', start: 'top 70%' },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      });

      /* Provincial section */
      gsap.from('.provincial-block', {
        scrollTrigger: { trigger: '.provincial-section', start: 'top 75%' },
        y: 30,
        opacity: 0,
        duration: 0.7,
      });

      /* Parent info cards */
      gsap.from('.parent-card', {
        scrollTrigger: { trigger: '.parent-section', start: 'top 70%' },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>Youth Pathway | TeamOn Multisports</title>
        <meta name="description" content="LTAD-aligned youth development for young athletes pursuing provincial and national goals." />
      </Helmet>
      {/* ── Hero ── */}
      <PageHero
        title="Youth Pathway"
        subtitle="A long-term, stage-appropriate development framework that meets young athletes where they are — and grows with them."
        breadcrumb="Programs / Youth Pathway"
      />

      {/* ── LTAD Framework ────────────────────────── */}
      <section className="ltad-section section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="ltad-intro max-w-3xl">
            <span className="feature-tag mb-6 inline-flex">
              <Layers className="w-4 h-4" />
              Long-Term Athlete Development
            </span>
            <h2 className="font-display text-section mb-4">
              Built on the LTAD Framework
            </h2>
            <div className="accent-rule mb-8 w-20" />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Our youth programme is grounded in the globally-recognised
              Long-Term Athlete Development model. Rather than pushing kids
              through adult-style training, we align every session with the
              developmental stage of the athlete.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The result? Athletes who stay healthy, stay motivated, and reach
              their potential — on their own timeline.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three Developmental Stages ────────────── */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-section mb-2">
            Three Stages of Growth
          </h2>
          <div className="accent-rule mb-14 w-20" />

          <div className="stages-grid grid md:grid-cols-3 gap-8">
            {STAGES.map((stage) => (
              <div
                key={stage.title}
                className="stage-card card-light flex flex-col"
              >
                {/* Color bar */}
                <div
                  className="h-1.5 rounded-t-2xl -mx-6 -mt-6 mb-6"
                  style={{ background: stage.color }}
                />

                <div className="flex items-center gap-3 mb-1">
                  <stage.icon
                    className="w-7 h-7 shrink-0"
                    style={{ color: stage.color }}
                  />
                  <span className="font-mono-label text-xs text-gray-400">
                    {stage.label}
                  </span>
                </div>

                <h3 className="font-display text-2xl mb-1">{stage.title}</h3>
                <p
                  className="font-mono-label text-xs mb-5"
                  style={{ color: stage.color }}
                >
                  {stage.age}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: stage.color }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">
                  {stage.philosophy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Provincial Pathways ────────────────────── */}
      <section className="provincial-section section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="provincial-block max-w-3xl">
            <span className="feature-tag mb-6 inline-flex">
              <Sparkles className="w-4 h-4" />
              Provincial Pathways
            </span>
            <h2 className="font-display text-section mb-4">
              Pathways to Provincial Representation
            </h2>
            <div className="accent-rule mb-8 w-20" />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              For athletes showing the commitment and ability to compete at a
              higher level, we provide structured pathways toward provincial
              selection and national development squads.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              This includes targeted race calendars, benchmark assessments, and
              coordination with provincial federations to ensure athletes are
              seen, prepared, and supported.
            </p>
            {/* DRAFT: Specific provincial pathway details to be confirmed */}
            <div className="card-light p-6 bg-[#FAFAFA]">
              <p className="font-mono-label text-xs text-gray-400 mb-2">
                Coming Soon
              </p>
              <p className="text-gray-600 text-sm">
                Detailed provincial pathway timelines, qualification criteria,
                and partner federations will be published here once confirmed
                for the upcoming season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parent Information ─────────────────────── */}
      <section className="parent-section section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-section mb-2">For Parents</h2>
          <p className="text-gray-600 text-lg max-w-2xl mb-4">
            Your child's safety and growth — as an athlete and as a person — is
            our highest priority.
          </p>
          <div className="accent-rule mb-14 w-20" />

          <div className="grid md:grid-cols-3 gap-8">
            {PARENT_POINTS.map((point) => (
              <div key={point.title} className="parent-card card-light p-6">
                <point.icon className="w-10 h-10 text-[#C41E3A] mb-4" />
                <h3 className="font-display text-xl mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <CTABanner
        heading="Ready to Start Their Journey?"
        subheading="Apply now and we'll get in touch to discuss the right pathway for your young athlete."
        variant="apply"
      />
    </div>
  );
}
