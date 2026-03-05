import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  GraduationCap,
  BookOpen,
  Users,
  FlaskConical,
  BarChart3,
  CalendarClock,
  Handshake,
  Route,
  Award,
  UserCheck,
  Microscope,
  ShieldCheck,
} from 'lucide-react';

/* ─── Applied Sport Science ─── */
const SCIENCE_PILLARS = [
  {
    icon: FlaskConical,
    title: 'Research to Practice',
    description:
      'Translating research into actionable training strategies your athletes can feel in their results.',
  },
  {
    icon: CalendarClock,
    title: 'Periodization Principles',
    description:
      'Designing training phases that build on each other — progressive overload with purpose, not guesswork.',
  },
  {
    icon: BarChart3,
    title: 'Data Interpretation',
    description:
      'Reading the numbers that matter — HR zones, pace decay, RPE trends — and knowing when to adjust.',
  },
  {
    icon: Microscope,
    title: 'Evidence-Based Decisions',
    description:
      'Building your coaching rationale on peer-reviewed principles, not anecdote and tradition.',
  },
];

/* ─── Leadership Development ─── */
/* DRAFT: Specific leadership topics to be confirmed */
const LEADERSHIP_AREAS = [
  {
    icon: Handshake,
    title: 'Athlete-Coach Relationships',
    description:
      'Building trust, managing expectations, and creating psychological safety within training environments.',
  },
  {
    icon: Users,
    title: 'Managing Training Groups',
    description:
      'Navigating group dynamics, individualizing within team settings, and fostering peer accountability.',
  },
  {
    icon: Route,
    title: 'Professional Development',
    description:
      'Charting your growth pathway — from assistant roles through head coaching and beyond.',
  },
];

/* ─── Who It's For ─── */
const AUDIENCE_TYPES = [
  {
    icon: GraduationCap,
    title: 'New Coaches',
    description:
      'Seeking structured development and a mentor who has navigated the early career challenges you face now.',
  },
  {
    icon: BookOpen,
    title: 'Experienced Coaches',
    description:
      'Wanting to incorporate sport science into your existing practice and sharpen your evidence-based toolkit.',
  },
  {
    icon: Award,
    title: 'NCCP Advancement',
    description:
      'Preparing for certification advancement with hands-on mentorship that goes deeper than course material.',
  },
  {
    icon: UserCheck,
    title: 'Kinesiology Graduates',
    description:
      'Bridging the gap between university theory and the realities of coaching athletes day-to-day.',
  },
];

/* ─── Mentorship Structure ─── */
const STRUCTURE_ITEMS = [
  {
    label: 'Format',
    value: 'One-on-one mentorship sessions — virtual or in-person in the Greater Toronto Area.',
  },
  {
    label: 'Duration & Frequency',
    value: 'Ongoing engagement tailored to your development goals.',
    draft: true,
  },
  {
    label: 'Topics Covered',
    value:
      'Program design review, athlete case studies, sport science application, professional development planning, and observation-based feedback.',
  },
];

export default function CoachMentorshipPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Science cards stagger */
      gsap.from('.science-card', {
        scrollTrigger: { trigger: '.science-grid', start: 'top 75%' },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });

      /* Leadership cards stagger */
      gsap.from('.leadership-card', {
        scrollTrigger: { trigger: '.leadership-grid', start: 'top 75%' },
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });

      /* Audience cards */
      gsap.from('.audience-card', {
        scrollTrigger: { trigger: '.audience-grid', start: 'top 75%' },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      /* Structure rows */
      gsap.from('.structure-row', {
        scrollTrigger: { trigger: '.structure-list', start: 'top 80%' },
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });

      /* Section headings */
      gsap.utils.toArray<HTMLElement>('.mentorship-heading').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>Coach Mentorship | TeamOn Multisports</title>
        <meta name="description" content="Applied sport science and leadership development for coaching professionals." />
      </Helmet>
      {/* ── Hero ── */}
      <PageHero
        title="Coach Mentorship"
        subtitle="Personal, science-grounded mentorship for coaching professionals at every stage — from first whistle to program director."
        breadcrumb="Programs / Coach Mentorship"
      />

      {/* ── Applied Sport Science ── */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Foundation</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Applied Sport Science</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              Great coaching is built on understanding <em>why</em> training works — not just
              <em> what</em> to prescribe. We work through the science together so you can make
              confident, informed decisions for your athletes.
            </p>
          </div>

          <div className="science-grid grid md:grid-cols-2 gap-6">
            {SCIENCE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="science-card card-light flex items-start gap-5 p-6"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1A1A1A] mb-1">{pillar.title}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Development ── */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Growth</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Leadership Development</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            {/* DRAFT: Specific leadership topics to be confirmed */}
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              Sport science gets you the plan. Leadership gets you the buy-in. We develop both
              sides — because the best program means nothing if athletes don't trust the person
              delivering it.
            </p>
          </div>

          <div className="leadership-grid grid md:grid-cols-3 gap-8">
            {LEADERSHIP_AREAS.map((area) => (
              <div
                key={area.title}
                className="leadership-card card-light text-center p-8"
              >
                <div className="w-14 h-14 rounded-full bg-[#C41E3A]/8 flex items-center justify-center mx-auto mb-5">
                  <area.icon className="w-7 h-7 text-[#C41E3A]" />
                </div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{area.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading text-center">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Audience</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Who It's For</h2>
            <div className="accent-rule w-20 mx-auto mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto text-lg mb-14">
              This mentorship is shaped around <em>you</em> — wherever you are in your coaching
              journey. If any of these sound familiar, we should talk.
            </p>
          </div>

          <div className="audience-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCE_TYPES.map((type) => (
              <div
                key={type.title}
                className="audience-card group card-light p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-full bg-[#C41E3A]/8 flex items-center justify-center mx-auto mb-5 transition-colors duration-300 group-hover:bg-[#C41E3A]/15">
                  <type.icon className="w-7 h-7 text-[#C41E3A]" />
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{type.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mentorship Structure ── */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">How It Works</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Mentorship Structure</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              This isn't a course you watch alone. It's an ongoing, personal mentorship — real
              conversations, real feedback, real growth alongside a working coach.
            </p>
          </div>

          <div className="structure-list max-w-3xl space-y-6">
            {STRUCTURE_ITEMS.map((item) => (
              <div
                key={item.label}
                className="structure-row card-light flex flex-col sm:flex-row sm:items-start gap-4 p-6"
              >
                <div className="shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">
                    {item.label}
                    {item.draft && (
                      <span className="ml-2 text-xs font-mono-label text-[#6B6B6B] align-middle">
                        {/* DRAFT: Duration/frequency details to be finalized */}
                        (Details TBD)
                      </span>
                    )}
                  </h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <CTABanner
        heading="Ready to Grow as a Coach?"
        subheading="Apply for a mentorship conversation. We'll explore your goals and see if working together is the right fit."
        variant="apply"
      />
    </div>
  );
}
