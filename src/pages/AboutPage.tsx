import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { GraduationCap, Shield, Users, Sparkles, Target, Heart } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CredentialsList from '@/components/CredentialsList';
import type { CredentialItem } from '@/components/CredentialsList';
import CTABanner from '@/components/CTABanner';

const ABOUT_CREDENTIALS: CredentialItem[] = [
  { label: 'BKin Kinesiology', description: 'University of New Brunswick' },
  { label: 'NCCP Competition Development', description: 'Triathlon' },
  { label: 'NCCP Competition Development — Athletics', description: 'Middle / Long Distance' },
  { label: 'Triathlon NB High-Performance Director', description: 'Provincial program leadership' },
  { label: 'World Triathlon Level 2 Coach', description: 'International certification' },
  { label: 'CSEP-CEP Certified', description: 'Certified Exercise Physiologist' },
];

const LEADERSHIP_ROLES = [
  {
    icon: Shield,
    title: 'Triathlon NB High-Performance Director',
    description: 'Leading provincial athlete development and competition strategy for New Brunswick\'s top triathletes.',
  },
  {
    icon: Users,
    title: 'Team New Brunswick Head Coach',
    description: 'Guiding provincial team athletes through national-level competition preparation and execution.',
  },
  {
    icon: Target,
    title: 'National-Level Competition Coach',
    description: 'NCCP Competition Development certified across triathlon and athletics disciplines.',
  },
];

const SDT_PILLARS = [
  {
    icon: Sparkles,
    title: 'Competence',
    tagline: 'Build mastery through progression',
    description:
      'Structured training that meets you where you are, then systematically builds toward where you want to be. Every session has purpose, every phase builds on the last.',
  },
  {
    icon: Heart,
    title: 'Connection',
    tagline: 'Belong to something bigger',
    description:
      'A coaching relationship built on honest feedback, mutual respect, and genuine investment in your growth\u2014on and off the course.',
  },
  {
    icon: GraduationCap,
    title: 'Choice',
    tagline: 'Own your journey',
    description:
      'You set the direction. Coaching provides the map, the tools, and the experience\u2014but the decisions that matter most are always yours.',
  },
];

const OUTCOMES = [
  { stat: 'Credential #1', label: 'Confirmed coaching credential' },
  { stat: 'Credential #2', label: 'Confirmed leadership role' },
  { stat: 'Outcome #1', label: 'Confirmed athlete development outcome' },
  { stat: 'Outcome #2', label: 'Confirmed program result' },
];

export default function AboutPage() {
  const journeyRef = useRef<HTMLElement>(null);
  const credentialsRef = useRef<HTMLElement>(null);
  const leadershipRef = useRef<HTMLElement>(null);
  const sdtRef = useRef<HTMLElement>(null);
  const outcomesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Journey section stagger */
      gsap.fromTo(
        '.about-journey-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Credentials fade-up */
      gsap.fromTo(
        '.about-credentials-content > *',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: credentialsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Leadership cards */
      gsap.fromTo(
        '.about-leadership-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leadershipRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* SDT pillars */
      gsap.fromTo(
        '.about-sdt-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sdtRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Outcomes counters */
      gsap.fromTo(
        '.about-outcome-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: outcomesRef.current,
            start: 'top 80%',
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
        <title>About Coach Mike On | TeamON Multisports</title>
        <meta name="description" content="Meet Coach Mike On — CSEP-CEP, NCCP certified endurance coach with 20+ years of experience developing athletes." />
      </Helmet>
      {/* ───── Hero ───── */}
      <PageHero
        title="About Coach Mike On"
        subtitle="Kinesiology-trained, nationally certified, and driven by the belief that every athlete deserves coaching rooted in science and respect."
        breadcrumb="Home / About"
      />

      {/* ───── Personal Journey ───── */}
      <section ref={journeyRef} className="section-spacing bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="about-journey-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="image-card aspect-[4/3]">
              <img
                src="/images/MikeWithTeamNB.jpg"
                alt="Coach Mike On with Team New Brunswick athletes"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Story */}
            <div>
              <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
                THE JOURNEY
              </span>
              <h2 className="font-display text-section text-[#1A1A1A] mb-4">
                FROM ATHLETE<br />
                <span className="text-[#C41E3A]">TO COACH</span>
              </h2>
              <div className="accent-rule w-20 mb-6" />
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
                Michael On leads TeamON Multisports as a coach, educator, and athlete
                development leader. Personal Journey Detail #1 can be added here after
                the exact story is confirmed with him.
              </p>

              <p className="text-[#4A4A4A] leading-relaxed mb-6">
                Based in Fredericton, he supports athletes and coaches through structured
                programming, development pathways, and practical mentorship. Coaching Scope
                Detail #1 can be added once his current services are confirmed.
              </p>

              <p className="text-[#4A4A4A] leading-relaxed">
                His holistic approach merges exercise physiology, Self-Determination Theory, and
                a genuine belief that training should build people up, not break them down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Credentials ───── */}
      <section ref={credentialsRef} className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="about-credentials-content">
            <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
              EDUCATION & CERTIFICATIONS
            </span>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              THE<br />
              <span className="text-[#C41E3A]">CREDENTIALS</span>
            </h2>
            <div className="accent-rule w-20 mb-10" />

            <CredentialsList variant="full" items={ABOUT_CREDENTIALS} />
          </div>
        </div>
      </section>

      {/* ───── Leadership Roles ───── */}
      <section ref={leadershipRef} className="section-spacing bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
            LEADERSHIP
          </span>
          <h2 className="font-display text-section text-[#1A1A1A] mb-4">
            ROLES &<br />
            <span className="text-[#C41E3A]">RESPONSIBILITY</span>
          </h2>
          <div className="accent-rule w-20 mb-10" />

          <div className="grid gap-6 md:grid-cols-3">
            {LEADERSHIP_ROLES.map((role) => (
              <div key={role.title} className="about-leadership-card card-light">
                <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center mb-4">
                  <role.icon className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <h3 className="font-mono-label text-xs text-[#1A1A1A] tracking-widest mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SDT Philosophy ───── */}
      <section ref={sdtRef} className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
              COACHING PHILOSOPHY
            </span>
            <h2 className="font-display text-section text-[#1A1A1A] mb-4">
              SELF-DETERMINATION<br />
              <span className="text-[#C41E3A]">THEORY</span>
            </h2>
            <div className="accent-rule w-20 mx-auto mb-6" />
            <p className="text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
              Every training plan, conversation, and coaching decision is grounded in three
              psychological needs that fuel lasting motivation and growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SDT_PILLARS.map((pillar) => (
              <div key={pillar.title} className="about-sdt-card card-light text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-5">
                  <pillar.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-1">{pillar.title}</h3>
                <p className="font-mono-label text-[11px] md:text-[10px] text-[#C41E3A] tracking-widest mb-4">
                  {pillar.tagline}
                </p>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Outcomes / Highlights ───── */}
      <section ref={outcomesRef} className="section-spacing bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
              BY THE NUMBERS
            </span>
            <h2 className="font-display text-section text-white mb-4">
              COACHING<br />
              <span className="text-[#C41E3A]">HIGHLIGHTS</span>
            </h2>
            <div className="accent-rule w-20 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {OUTCOMES.map((item) => (
              <div key={item.label} className="about-outcome-item text-center">
                <span className="stat-number block mb-2">{item.stat}</span>
                <span className="font-mono-label text-[11px] md:text-[10px] text-white/70 tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <CTABanner
        variant="apply"
        heading="Want to Work with Coach Mike?"
        subheading="Apply today and take the first step toward structured, science-based coaching that puts you in the driver\u2019s seat."
      />
    </>
  );
}
