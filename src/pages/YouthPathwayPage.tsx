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

const STAGES = [
  {
    icon: GraduationCap,
    label: 'Stage 1',
    title: 'Foundation',
    age: 'Youth Age Range #1',
    color: '#2D8A4E',
    items: [
      'Physical literacy and fundamental movement skills',
      'Multi-sport exploration across swim, bike, run, and play',
      'Confidence through fun, low-pressure activity',
      'Coordination, balance, and agility development',
    ],
    philosophy:
      'At this stage, falling in love with movement matters more than metrics. Sessions are built around play, discovery, and positive experiences.',
  },
  {
    icon: Target,
    label: 'Stage 2',
    title: 'Development',
    age: 'Youth Age Range #2',
    color: '#C47B1E',
    items: [
      'Introduction to structured training cycles',
      'Sport-specific skill acquisition and technique focus',
      'Training discipline and self-management habits',
      'Gradual introduction to age-appropriate competition',
    ],
    philosophy:
      'Athletes begin to train with intention. The focus is consistency, body awareness, and progressive challenge.',
  },
  {
    icon: TrendingUp,
    label: 'Stage 3',
    title: 'Performance',
    age: 'Youth Age Range #3',
    color: '#C41E3A',
    items: [
      'Competition preparation and race-day strategies',
      'Advanced periodization and structured peaking',
      'Mental performance and resilience training',
      'Pathway planning toward senior sport or scholarship',
    ],
    philosophy:
      'For athletes ready to compete seriously, training integrates physical, mental, technical, and tactical preparation.',
  },
] as const;

const PARENT_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description:
      'Every session follows age-appropriate loading guidelines. Training stress, recovery, and long-term well-being come before short-term results.',
  },
  {
    icon: MessageCircle,
    title: 'Open Communication',
    description:
      'Parent Communication Detail #1. Add the confirmed update rhythm, progress reporting, and parent contact process here.',
  },
  {
    icon: Heart,
    title: 'Athletes and People',
    description:
      'Character, sportsmanship, resilience, and a lifelong love of sport are treated as core development outcomes.',
  },
] as const;

const PATHWAY_DETAILS = [
  'Provincial Pathway Detail #1',
  'Provincial Pathway Detail #2',
  'Selection Criteria Detail #1',
  'Season Timeline Detail #1',
];

export default function YouthPathwayPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ltad-intro', {
        scrollTrigger: { trigger: '.ltad-section', start: 'top 75%' },
        y: 30,
        duration: 0.7,
      });

      gsap.from('.stage-card', {
        scrollTrigger: { trigger: '.stages-grid', start: 'top 70%' },
        y: 50,
        stagger: 0.2,
        duration: 0.8,
      });

      gsap.from('.provincial-block', {
        scrollTrigger: { trigger: '.provincial-section', start: 'top 75%' },
        y: 30,
        duration: 0.7,
      });

      gsap.from('.parent-card', {
        scrollTrigger: { trigger: '.parent-section', start: 'top 70%' },
        y: 40,
        stagger: 0.15,
        duration: 0.7,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>Youth Pathway | TeamON Multisports</title>
        <meta name="description" content="LTAD-aligned youth development for young athletes and families." />
      </Helmet>
      <PageHero
        title="Youth Pathway"
        subtitle="A long-term, stage-appropriate development framework that meets young athletes where they are and grows with them."
        breadcrumb="Programs / Youth Pathway"
      />

      <section className="ltad-section section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="ltad-intro max-w-3xl">
            <span className="feature-tag mb-6 inline-flex">
              <Layers className="w-4 h-4" />
              Long-Term Athlete Development
            </span>
            <h2 className="font-display text-section mb-4">Built on the LTAD Framework</h2>
            <div className="accent-rule mb-8 w-20" />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              The youth program is grounded in long-term athlete development principles.
              Rather than pushing young athletes through adult-style training, sessions
              are aligned with the developmental stage of the athlete.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The goal is simple: athletes who stay healthy, stay motivated, and keep
              progressing on an appropriate timeline.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-section mb-2">Three Stages of Growth</h2>
          <div className="accent-rule mb-14 w-20" />

          <div className="stages-grid grid md:grid-cols-3 gap-8">
            {STAGES.map((stage) => (
              <div key={stage.title} className="stage-card card-light flex flex-col">
                <div className="h-1.5 rounded-t-2xl -mx-6 -mt-6 mb-6" style={{ background: stage.color }} />
                <div className="flex items-center gap-3 mb-1">
                  <stage.icon className="w-7 h-7 shrink-0" style={{ color: stage.color }} />
                  <span className="font-mono-label text-xs text-gray-400">{stage.label}</span>
                </div>
                <h3 className="font-display text-2xl mb-1">{stage.title}</h3>
                <p className="font-mono-label text-xs mb-5" style={{ color: stage.color }}>
                  {stage.age}
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: stage.color }} />
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

      <section className="provincial-section section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="provincial-block max-w-3xl">
            <span className="feature-tag mb-6 inline-flex">
              <Sparkles className="w-4 h-4" />
              Provincial Pathways
            </span>
            <h2 className="font-display text-section mb-4">Pathways to Provincial Representation</h2>
            <div className="accent-rule mb-8 w-20" />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              For athletes showing the commitment and ability to compete at a higher level,
              TeamON provides structure around race calendars, benchmark assessments, and
              provincial pathway readiness.
            </p>
            <div className="card-light p-6 bg-[#FAFAFA]">
              <p className="font-mono-label text-xs text-[#C41E3A] mb-4">
                Details to Confirm with Michael On
              </p>
              <ul className="grid gap-3">
                {PATHWAY_DETAILS.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C41E3A] mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="parent-section section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-section mb-2">For Parents</h2>
          <p className="text-gray-600 text-lg max-w-2xl mb-4">
            Your child's safety and growth as an athlete and as a person is the priority.
          </p>
          <div className="accent-rule mb-14 w-20" />
          <div className="grid md:grid-cols-3 gap-8">
            {PARENT_POINTS.map((point) => (
              <div key={point.title} className="parent-card card-light p-6">
                <point.icon className="w-10 h-10 text-[#C41E3A] mb-4" />
                <h3 className="font-display text-xl mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Start Their Journey?"
        subheading="Apply now and we will get in touch to discuss the right pathway for your young athlete."
        variant="apply"
      />
    </div>
  );
}
