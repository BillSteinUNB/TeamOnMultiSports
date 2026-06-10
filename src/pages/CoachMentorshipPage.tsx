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

const SCIENCE_PILLARS = [
  {
    icon: FlaskConical,
    title: 'Research to Practice',
    description:
      'Translating research into actionable coaching decisions, training progressions, and athlete conversations.',
  },
  {
    icon: CalendarClock,
    title: 'Periodization Principles',
    description:
      'Designing training phases that build on each other with progressive overload, recovery, and purpose.',
  },
  {
    icon: BarChart3,
    title: 'Data Interpretation',
    description:
      'Reading heart rate, pace, power, RPE, readiness, and performance trends with context.',
  },
  {
    icon: Microscope,
    title: 'Evidence-Based Decisions',
    description:
      'Building a coaching rationale that can be explained, adjusted, and defended.',
  },
];

const LEADERSHIP_AREAS = [
  {
    icon: Handshake,
    title: 'Athlete-Coach Relationships',
    description:
      'Mentorship Topic #1. Add confirmed relationship, communication, and trust-building topics here.',
  },
  {
    icon: Users,
    title: 'Managing Training Groups',
    description:
      'Mentorship Topic #2. Add confirmed group coaching, individualization, and team culture topics here.',
  },
  {
    icon: Route,
    title: 'Professional Development',
    description:
      'Coach Development Outcome #1. Add the confirmed professional growth outcomes here.',
  },
];

const AUDIENCE_TYPES = [
  {
    icon: GraduationCap,
    title: 'New Coaches',
    description:
      'Coaches seeking structure, feedback, and a mentor while building early coaching confidence.',
  },
  {
    icon: BookOpen,
    title: 'Experienced Coaches',
    description:
      'Coaches who want to sharpen program design and bring more sport science into daily practice.',
  },
  {
    icon: Award,
    title: 'Certification Pathway Coaches',
    description:
      'Coach Credential #1. Add the confirmed certification context and support scope here.',
  },
  {
    icon: UserCheck,
    title: 'Kinesiology Graduates',
    description:
      'Graduates bridging academic theory with the realities of coaching athletes day to day.',
  },
];

const STRUCTURE_ITEMS = [
  {
    label: 'Format',
    value: 'Mentorship Format Detail #1. Confirm whether this is virtual, in-person, one-on-one, group-based, or a combination.',
  },
  {
    label: 'Duration & Frequency',
    value: 'Mentorship Format Detail #2. Confirm session length, cadence, and typical engagement length.',
  },
  {
    label: 'Topics Covered',
    value:
      'Mentorship Topic #3. Confirm the core topics, including program review, athlete case studies, sport science application, and professional development planning.',
  },
];

export default function CoachMentorshipPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.science-card', {
        scrollTrigger: { trigger: '.science-grid', start: 'top 75%' },
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.leadership-card', {
        scrollTrigger: { trigger: '.leadership-grid', start: 'top 75%' },
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.audience-card', {
        scrollTrigger: { trigger: '.audience-grid', start: 'top 75%' },
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.from('.structure-row', {
        scrollTrigger: { trigger: '.structure-list', start: 'top 80%' },
        x: -30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.utils.toArray<HTMLElement>('.mentorship-heading').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 25,
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
        <title>Coach Mentorship | TeamON Multisports</title>
        <meta name="description" content="Applied sport science and leadership development for coaching professionals." />
      </Helmet>
      <PageHero
        title="Coach Mentorship"
        subtitle="Personal, science-grounded mentorship for coaching professionals who want clearer systems, better decisions, and stronger athlete relationships."
        breadcrumb="Programs / Coach Mentorship"
      />

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Foundation</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Applied Sport Science</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              Great coaching is built on understanding why training works, not just what
              to prescribe. Mentorship connects the science to real coaching decisions.
            </p>
          </div>

          <div className="science-grid grid md:grid-cols-2 gap-6">
            {SCIENCE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="science-card card-light flex items-start gap-5 p-6">
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

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Growth</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Leadership Development</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              Sport science gets you the plan. Leadership gets the buy-in. The
              mentorship offer should develop both sides once the exact topics are confirmed.
            </p>
          </div>
          <div className="leadership-grid grid md:grid-cols-3 gap-8">
            {LEADERSHIP_AREAS.map((area) => (
              <div key={area.title} className="leadership-card card-light text-center p-8">
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

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading text-center">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Audience</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Who It's For</h2>
            <div className="accent-rule w-20 mx-auto mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto text-lg mb-14">
              This mentorship is shaped around where each coach is in their development.
            </p>
          </div>
          <div className="audience-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCE_TYPES.map((type) => (
              <div key={type.title} className="audience-card group card-light p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentorship-heading">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">How It Works</p>
            <h2 className="text-section font-display text-[#1A1A1A]">Mentorship Structure</h2>
            <div className="accent-rule w-20 mt-2 mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl text-lg mb-12">
              This should feel practical and specific: real conversations, real feedback,
              and a clear development plan for each coach.
            </p>
          </div>
          <div className="structure-list max-w-3xl space-y-6">
            {STRUCTURE_ITEMS.map((item) => (
              <div key={item.label} className="structure-row card-light flex flex-col sm:flex-row sm:items-start gap-4 p-6">
                <ShieldCheck className="w-6 h-6 text-[#C41E3A] shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">{item.label}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Grow as a Coach?"
        subheading="Apply for a mentorship conversation. We will explore your goals and confirm whether working together is the right fit."
        variant="apply"
      />
    </div>
  );
}
