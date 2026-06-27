import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  Heart,
  Layers,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';

const STAGES = [
  {
    label: 'Stage 1',
    title: 'Foundation',
    age: 'Youth Age Range #1',
    color: '#2D8A4E',
    summary:
      'Build comfort in movement, confidence in training spaces, and the basic skills that make sport feel possible.',
    items: [
      'Physical literacy and coordination',
      'Swim, bike, run, and play-based skill work',
      'Low-pressure practice environments',
      'Positive routines around effort and recovery',
    ],
  },
  {
    label: 'Stage 2',
    title: 'Development',
    age: 'Youth Age Range #2',
    color: '#C47B1E',
    summary:
      'Add structure without taking away the joy. Athletes learn how to train, communicate, and compete appropriately.',
    items: [
      'Age-appropriate training rhythm',
      'Technique and skill progression',
      'Introduction to race preparation',
      'Self-management and body awareness',
    ],
  },
  {
    label: 'Stage 3',
    title: 'Performance',
    age: 'Youth Age Range #3',
    color: '#C41E3A',
    summary:
      'For athletes ready for more, the work becomes more specific while still protecting long-term health.',
    items: [
      'Season planning and benchmarks',
      'Race strategy and tactical development',
      'Mental readiness and confidence',
      'Provincial pathway preparation',
    ],
  },
] as const;

const PARENT_PROMISES = [
  {
    icon: ShieldCheck,
    title: 'Safety Before Results',
    description:
      'Training load, recovery, and growth are monitored so young athletes are not treated like small adults.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Parent Communication',
    description:
      'Parent Communication Detail #1. Confirm how updates, concerns, progress notes, and schedule changes are shared.',
  },
  {
    icon: Heart,
    title: 'Athlete First',
    description:
      'Sport should help young people become more confident, resilient, and connected, not just faster.',
  },
];

const SKILL_PROGRESSIONS = [
  {
    icon: ClipboardCheck,
    title: 'Movement Skills',
    description: 'Coordination, balance, agility, and efficient movement across all three disciplines.',
  },
  {
    icon: CalendarCheck,
    title: 'Training Habits',
    description: 'Warm-ups, recovery, consistency, pacing, and learning how to talk about effort.',
  },
  {
    icon: Target,
    title: 'Competition Skills',
    description: 'Race-day routines, transitions, decision-making, and confidence under pressure.',
  },
];

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
      gsap.from('.youth-animate', {
        scrollTrigger: { trigger: pageRef.current, start: 'top 70%' },
        y: 24,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>Youth Pathway | TeamON Multisports</title>
        <meta
          name="description"
          content="Age-appropriate youth athlete development, LTAD alignment, parent communication, and provincial pathway readiness with TeamON Multisports."
        />
      </Helmet>
      <PageHero
        title="Youth Pathway"
        subtitle="A careful, long-term approach for young athletes who need structure, confidence, and room to grow."
        breadcrumb="Programs / Youth Pathway"
      />

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div className="youth-animate">
              <span className="feature-tag mb-6 inline-flex">
                <Layers className="w-4 h-4" />
                Long-Term Athlete Development
              </span>
              <h2 className="font-display text-section text-[#1A1A1A] mb-4">
                Not rushed.
                <br />
                <span className="text-[#C41E3A]">Not random.</span>
              </h2>
              <div className="accent-rule mb-8 w-20" />
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Youth development is not about squeezing adult training into a
                younger body. It is about matching the work to the athlete,
                protecting confidence, and building skills that last.
              </p>
            </div>

            <div className="youth-animate grid gap-4">
              {[
                'Age-appropriate training and recovery',
                'Skill progression before training volume',
                'Parent communication and athlete check-ins',
                'Pathway readiness for athletes who want to compete higher',
              ].map((item) => (
                <div key={item} className="card-light flex items-start gap-4 p-5">
                  <ChevronRight className="w-5 h-5 text-[#C41E3A] mt-1 shrink-0" />
                  <p className="text-[#4A4A4A] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12 youth-animate">
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              DEVELOPMENT STAGES
            </p>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              The right work at the right time.
            </h2>
            <div className="accent-rule w-20" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STAGES.map((stage) => (
              <article key={stage.title} className="youth-animate card-light flex flex-col">
                <div className="h-1.5 rounded-t-2xl -mx-6 -mt-6 mb-6" style={{ background: stage.color }} />
                <p className="font-mono-label text-xs text-gray-400 mb-2">{stage.label}</p>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-1">{stage.title}</h3>
                <p className="font-mono-label text-xs mb-5" style={{ color: stage.color }}>
                  {stage.age}
                </p>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">{stage.summary}</p>
                <ul className="space-y-3 mt-auto">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: stage.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="youth-animate">
              <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
                SAFETY & COMMUNICATION
              </p>
              <h2 className="font-display text-section text-[#1A1A1A] mb-4">
                Parents should know
                <br />
                what is happening.
              </h2>
              <div className="accent-rule w-20 mb-6" />
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                A youth program only works when the athlete, parent, and coach
                are aligned. The expectations should be clear, the training
                should make sense, and concerns should be easy to raise.
              </p>
            </div>

            <div className="grid gap-5">
              {PARENT_PROMISES.map((point) => (
                <article key={point.title} className="youth-animate card-light flex gap-4 p-6">
                  <point.icon className="w-7 h-7 text-[#C41E3A] shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{point.title}</h3>
                    <p className="text-[#4A4A4A] leading-relaxed">{point.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12 youth-animate">
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              SKILL PROGRESSION
            </p>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              Competence builds confidence.
            </h2>
            <div className="accent-rule w-20 mb-6" />
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
              The pathway is not just about training harder. Athletes need to
              understand movement, effort, recovery, and competition skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILL_PROGRESSIONS.map((item) => (
              <article key={item.title} className="youth-animate card-light p-6">
                <item.icon className="w-9 h-9 text-[#C41E3A] mb-4" />
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="youth-animate max-w-3xl">
            <span className="feature-tag mb-6 inline-flex">
              <Sparkles className="w-4 h-4" />
              Provincial Pathways
            </span>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              Ready for the next level,
              <br />
              when the athlete is ready.
            </h2>
            <div className="accent-rule mb-8 w-20" />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              For athletes showing the commitment and ability to compete at a
              higher level, TeamON can help create structure around race
              calendars, benchmark assessments, and provincial pathway readiness.
            </p>
            <div className="card-light p-6 bg-[#FAFAFA]">
              <p className="font-mono-label text-xs text-[#C41E3A] mb-4">
                Details to Confirm with Mike
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {PATHWAY_DETAILS.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-gray-600">
                    <Route className="w-4 h-4 text-[#C41E3A] mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Build the right pathway."
        subheading="Start with a conversation about your young athlete, their goals, and the support they need."
        variant="apply"
      />
    </div>
  );
}
