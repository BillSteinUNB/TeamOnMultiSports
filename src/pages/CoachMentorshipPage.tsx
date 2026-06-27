import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Handshake,
  Microscope,
  Route,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';

const CREDENTIALS = [
  'Coach Credential #1',
  'Coach Credential #2',
  'Coach Credential #3',
  'Coach Credential #4',
];

const SCIENCE_PILLARS = [
  {
    icon: FlaskConical,
    title: 'Research to Practice',
    description:
      'Turn sport science into coaching choices athletes can understand and apply.',
  },
  {
    icon: CalendarClock,
    title: 'Planning and Periodization',
    description:
      'Build training phases with clear purpose, recovery, and progression.',
  },
  {
    icon: BarChart3,
    title: 'Data with Context',
    description:
      'Interpret pace, power, heart rate, RPE, readiness, and life stress without getting lost in numbers.',
  },
  {
    icon: Microscope,
    title: 'Better Coaching Decisions',
    description:
      'Learn how to explain, adjust, and defend the choices behind a program.',
  },
];

const MENTORSHIP_TOPICS = [
  {
    icon: Handshake,
    title: 'Athlete-Coach Relationships',
    description:
      'Mentorship Topic #1. Add confirmed relationship, trust, and communication topics here.',
  },
  {
    icon: Users,
    title: 'Groups and Team Environments',
    description:
      'Mentorship Topic #2. Add confirmed group coaching, individualization, and culture topics here.',
  },
  {
    icon: Route,
    title: 'Professional Growth',
    description:
      'Coach Development Outcome #1. Add the confirmed professional growth outcomes here.',
  },
];

const AUDIENCE_TYPES = [
  {
    icon: GraduationCap,
    title: 'New Coaches',
    description:
      'Coaches looking for structure, feedback, and a steadier start in the profession.',
  },
  {
    icon: BookOpen,
    title: 'Experienced Coaches',
    description:
      'Coaches who want to sharpen planning, communication, and evidence-informed practice.',
  },
  {
    icon: Award,
    title: 'Certification Pathway Coaches',
    description:
      'Coach Credential #1. Add the confirmed certification pathway context here.',
  },
  {
    icon: UserCheck,
    title: 'Kinesiology Graduates',
    description:
      'Graduates who want help moving from theory into real coaching decisions.',
  },
];

const PROCESS = [
  {
    label: '1',
    title: 'Clarify the Coach',
    description:
      'Start with current role, athletes served, strengths, gaps, and goals.',
  },
  {
    label: '2',
    title: 'Review Real Work',
    description:
      'Use training plans, athlete cases, communication examples, and program questions as the material.',
  },
  {
    label: '3',
    title: 'Build Better Systems',
    description:
      'Leave with clearer planning habits, decision frameworks, and next steps.',
  },
];

const STRUCTURE_ITEMS = [
  {
    label: 'Session Format',
    value:
      'Session Format #1. Confirm whether mentorship is virtual, in-person, one-on-one, group-based, or a combination.',
  },
  {
    label: 'Frequency',
    value:
      'Session Format #2. Confirm session length, meeting cadence, and typical engagement length.',
  },
  {
    label: 'Working Material',
    value:
      'Mentorship Topic #3. Confirm whether sessions use program review, athlete case studies, observation, certification support, or all of the above.',
  },
];

export default function CoachMentorshipPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mentor-animate', {
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
        <title>Coach Mentorship | TeamON Multisports</title>
        <meta
          name="description"
          content="Coach mentorship for endurance coaches focused on planning, communication, sport science, and professional growth."
        />
      </Helmet>
      <PageHero
        title="Coach Mentorship"
        subtitle="Support for coaches who want clearer systems, better decisions, and stronger athlete relationships."
        breadcrumb="Programs / Coach Mentorship"
      />

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div className="mentor-animate">
              <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
                WHY MENTORSHIP
              </p>
              <h2 className="text-section font-display text-[#1A1A1A] mb-4">
                Coaches need
                <br />
                coaches too.
              </h2>
              <div className="accent-rule w-20 mb-6" />
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Coaching is practical work. You learn by planning, watching,
                adjusting, and reflecting. Mentorship gives coaches a place to
                ask better questions and build better habits.
              </p>
            </div>

            <div className="mentor-animate card-light p-6 lg:p-8">
              <p className="font-mono-label text-xs text-[#C41E3A] mb-5">
                Credentials to Confirm
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {CREDENTIALS.map((credential) => (
                  <div key={credential} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C41E3A] mt-0.5 shrink-0" />
                    <span className="text-[#4A4A4A]">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentor-animate max-w-3xl mb-12">
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              WHAT WE WORK ON
            </p>
            <h2 className="text-section font-display text-[#1A1A1A] mb-4">
              Sport science,
              <br />
              made coachable.
            </h2>
            <div className="accent-rule w-20 mb-6" />
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
              The goal is not to sound more technical. The goal is to make
              better decisions for real athletes in real training environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SCIENCE_PILLARS.map((pillar) => (
              <article key={pillar.title} className="mentor-animate card-light flex items-start gap-5 p-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1A1A1A] mb-1">{pillar.title}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16">
            <div className="mentor-animate">
              <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
                MENTORSHIP TOPICS
              </p>
              <h2 className="text-section font-display text-[#1A1A1A] mb-4">
                The parts of coaching
                <br />
                that matter daily.
              </h2>
              <div className="accent-rule w-20 mb-6" />
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                Better coaches do not just write harder workouts. They build
                trust, adapt to people, and create systems athletes can follow.
              </p>
            </div>

            <div className="grid gap-5">
              {MENTORSHIP_TOPICS.map((area) => (
                <article key={area.title} className="mentor-animate card-light flex gap-4 p-6">
                  <area.icon className="w-7 h-7 text-[#C41E3A] shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{area.title}</h3>
                    <p className="text-[#4A4A4A] leading-relaxed">{area.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentor-animate text-center max-w-3xl mx-auto mb-12">
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              WHO IT IS FOR
            </p>
            <h2 className="text-section font-display text-[#1A1A1A] mb-4">
              A fit for coaches
              <br />
              who want feedback.
            </h2>
            <div className="accent-rule w-20 mx-auto mb-6" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCE_TYPES.map((type) => (
              <article key={type.title} className="mentor-animate card-light p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#C41E3A]/8 flex items-center justify-center mx-auto mb-5">
                  <type.icon className="w-7 h-7 text-[#C41E3A]" />
                </div>
                <h3 className="font-display text-lg text-[#1A1A1A] mb-2">{type.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{type.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mentor-animate max-w-3xl mb-12">
            <p className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4">
              HOW IT WORKS
            </p>
            <h2 className="text-section font-display text-[#1A1A1A] mb-4">
              Simple structure.
              <br />
              Useful feedback.
            </h2>
            <div className="accent-rule w-20 mb-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {PROCESS.map((step) => (
              <article key={step.label} className="mentor-animate card-light p-6">
                <div className="w-10 h-10 rounded-lg bg-[#C41E3A] text-white flex items-center justify-center font-mono-label text-xs mb-5">
                  {step.label}
                </div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="structure-list max-w-4xl space-y-5">
            {STRUCTURE_ITEMS.map((item) => (
              <article key={item.label} className="mentor-animate card-light flex flex-col sm:flex-row sm:items-start gap-4 p-6">
                <ShieldCheck className="w-6 h-6 text-[#C41E3A] shrink-0" />
                <div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-1">{item.label}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{item.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to grow as a coach?"
        subheading="Apply for a mentorship conversation and bring your coaching questions, athlete cases, and development goals."
        variant="apply"
      />
    </div>
  );
}
