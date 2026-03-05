import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  Calendar,
  MapPin,
  Clock,
  Sun,
  Sunset,
  Moon,
  Dumbbell,
  HeartPulse,
  Mountain,
  Flame,
  Users,
  ChevronRight,
} from 'lucide-react';

/* DRAFT: Camp types and descriptions to be confirmed */
const CAMP_TYPES = [
  {
    title: 'Pre-Season Base Building',
    subtitle: 'Lay the Foundation',
    description:
      'A multi-day immersive camp focused on aerobic capacity, technique refinement, and building the structural fitness that underpins a successful racing season. Ideal for athletes transitioning from off-season into structured training.',
    icon: Mountain,
    highlights: [
      'Aerobic threshold development',
      'Swim / bike / run technique clinics',
      'Strength & mobility workshops',
      'Training plan integration',
    ],
  },
  {
    title: 'Race-Specific Sharpening',
    subtitle: 'Dial It In',
    description:
      'An intensive block targeting race-pace efforts, transition efficiency, and mental race preparation. Designed for athletes with a target event on the horizon who want to convert their fitness into results.',
    icon: Flame,
    highlights: [
      'Race-pace interval sessions',
      'Brick workout sequences',
      'Nutrition & hydration strategy',
      'Mental rehearsal techniques',
    ],
  },
  {
    title: 'Youth Development Camp',
    subtitle: 'Build Young Champions',
    description:
      'An age-appropriate, LTAD-aligned camp introducing young athletes to multi-sport training in a supportive, engaging environment. Emphasis on skill acquisition, fun, and fostering a lifelong love for sport.',
    icon: Users,
    highlights: [
      'Multi-sport skill building',
      'Age-appropriate training loads',
      'Team-based challenges & games',
      'Goal-setting workshops',
    ],
  },
];

const DAILY_SCHEDULE = [
  {
    period: 'Morning',
    time: '6:30 – 11:30 AM',
    icon: Sun,
    activities: [
      'Pre-session activation & briefing',
      'Primary training session (swim, bike, or run)',
      'Technique-focused drills & skill work',
    ],
  },
  {
    period: 'Midday',
    time: '12:00 – 2:00 PM',
    icon: Sunset,
    activities: [
      'Recovery nutrition & group lunch',
      'Sport science workshop or guest speaker',
      'Rest & self-directed recovery',
    ],
  },
  {
    period: 'Evening',
    time: '3:00 – 6:30 PM',
    icon: Moon,
    activities: [
      'Secondary training session',
      'Strength, mobility, or yoga',
      'Day review & next-day preparation',
    ],
  },
];

export default function CampsPage() {
  const campTypesRef = useRef<HTMLElement>(null);
  const scheduleRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);
  const expectRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Camp type cards stagger
      gsap.from('.camp-card', {
        scrollTrigger: { trigger: campTypesRef.current, start: 'top 75%' },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Schedule section
      gsap.from('.schedule-label', {
        scrollTrigger: { trigger: scheduleRef.current, start: 'top 75%' },
        x: -30,
        opacity: 0,
        duration: 0.5,
      });

      gsap.from('.schedule-card', {
        scrollTrigger: { trigger: scheduleRef.current, start: 'top 70%' },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Location section
      gsap.from('.location-content', {
        scrollTrigger: { trigger: locationRef.current, start: 'top 75%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      // What to expect items
      gsap.from('.expect-item', {
        scrollTrigger: { trigger: expectRef.current, start: 'top 70%' },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <Helmet>
        <title>Training Camps | TeamOn Multisports</title>
        <meta name="description" content="Intensive training blocks for focused performance gains in triathlon and running." />
      </Helmet>
      <PageHero
        title="Training Camps"
        subtitle="Immersive multi-day training blocks designed to accelerate your development through focused, structured coaching in a team environment."
        breadcrumb="Programs / Camps"
      />

      {/* ─── Camp Types ─── */}
      <section ref={campTypesRef} className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3">
            Camp Programs
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-3">
            Choose Your Focus
          </h2>
          <div className="accent-rule mb-14 w-16" />

          <div className="grid lg:grid-cols-3 gap-8">
            {CAMP_TYPES.map((camp) => (
              <article
                key={camp.title}
                className="camp-card card-light group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                    <camp.icon className="w-6 h-6 text-[#C41E3A]" />
                  </div>
                  <div>
                    <p className="font-mono-label text-[10px] text-[#6B6B6B]">
                      {camp.subtitle}
                    </p>
                    <h3 className="font-display text-xl text-[#1A1A1A]">
                      {camp.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">
                  {camp.description}
                </p>

                <ul className="space-y-2.5">
                  {camp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#4A4A4A]"
                    >
                      <ChevronRight className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Scheduling ─── */}
      <section ref={scheduleRef} className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="schedule-label">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">
              Schedule
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-3">
              Upcoming Camps
            </h2>
            <div className="accent-rule mb-10 w-16" />
          </div>

          <div className="schedule-card max-w-3xl">
            <div className="card-light flex flex-col sm:flex-row items-start sm:items-center gap-5 p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#C41E3A]/8 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-7 h-7 text-[#C41E3A]" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-2">
                  Camps Announced Periodically
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4">
                  Upcoming camps are announced periodically. Apply to be
                  notified when new camp dates are released and secure your spot
                  early.
                </p>
                {/* DRAFT: Specific camp dates to be added when confirmed */}
                <a
                  href="/apply"
                  className="inline-flex items-center gap-2 font-mono-label text-xs text-[#C41E3A] hover:text-[#9B1B30] transition-colors"
                >
                  Get Notified
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section ref={locationRef} className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="location-content max-w-3xl">
            <p className="font-mono-label text-sm text-[#C41E3A] mb-3">
              Location
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-3">
              Fredericton, NB
            </h2>
            <div className="accent-rule mb-10 w-16" />

            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#C41E3A]" />
              </div>
              <div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-2">
                  Fredericton, New Brunswick, Canada
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  Camps are based in and around Fredericton, NB — offering
                  access to quiet rural roads, river-side running trails, and
                  quality pool facilities. The region's varied terrain provides
                  ideal conditions for building endurance across all three
                  disciplines.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Open-water & pool swimming', icon: '🏊' },
                { label: 'Rolling country roads for cycling', icon: '🚴' },
                { label: 'Trail & river-path running', icon: '🏃' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-[#F8F8F8] px-4 py-3"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-[#4A4A4A]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── What to Expect ─── */}
      <section ref={expectRef} className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3">
            What to Expect
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-3">
            A Typical Camp Day
          </h2>
          <div className="accent-rule mb-14 w-16" />

          {/* Daily Schedule */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {DAILY_SCHEDULE.map((block) => (
              <div key={block.period} className="expect-item">
                <div className="card-light h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                      <block.icon className="w-5 h-5 text-[#C41E3A]" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-[#1A1A1A]">
                        {block.period}
                      </h3>
                      <p className="font-mono-label text-[10px] text-[#6B6B6B]">
                        {block.time}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {block.activities.map((activity) => (
                      <li
                        key={activity}
                        className="flex items-start gap-2.5 text-sm text-[#4A4A4A]"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#C41E3A]/60 mt-1 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Equipment & Prerequisites */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="expect-item">
              <div className="card-light h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <h3 className="font-display text-xl text-[#1A1A1A]">
                    Equipment Requirements
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Road or triathlon bike in good working condition',
                    'Swim gear — goggles, swim cap, wetsuit (open-water camps)',
                    'Running shoes suited to your training',
                    'Heart-rate monitor or GPS watch (recommended)',
                    'Recovery gear — foam roller, resistance bands',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#4A4A4A]"
                    >
                      <ChevronRight className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="expect-item">
              <div className="card-light h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/8 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-[#C41E3A]" />
                  </div>
                  <h3 className="font-display text-xl text-[#1A1A1A]">
                    Fitness Prerequisites
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Consistent training base of 6+ hours per week',
                    'Comfortable swimming 1,000 m continuously',
                    'Able to sustain a 60–90 min bike ride at moderate intensity',
                    'Running 5–10 km without difficulty',
                    'No current injuries requiring medical clearance',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#4A4A4A]"
                    >
                      <ChevronRight className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTABanner
        variant="apply"
        heading="Interested in an Upcoming Camp?"
        subheading="Apply to join the roster and be the first to hear when new camp dates are announced."
      />
    </main>
  );
}
