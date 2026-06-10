import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { ChevronDown } from 'lucide-react';

const AUTHORITY_ITEMS = [
  'CSEP-CEP',
  '20+ Years',
  '7x Kona Qualifier Coach',
  'NCCP Competition Development',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const authorityRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headlineRef.current, authorityRef.current, ctaRef.current], {
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.1,
      });

      gsap.from(imageRef.current, {
        y: 18,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-svh overflow-hidden flex items-start lg:items-center bg-[#FAFAFA] pt-28 pb-16 lg:pt-20 lg:pb-12"
    >
      <div className="w-full px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          <div className="order-1 min-w-0 w-full max-w-[300px] sm:max-w-full mx-auto lg:mx-0">
            <div ref={headlineRef}>
              <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
                TEAMON MULTISPORTS - MICHAEL ON
              </span>

              <h1 className="font-display hero-title text-[#1A1A1A] mb-5">
                <span className="block">Better athletes.</span>
                <span className="block text-[#C41E3A]">Better coaches.</span>
              </h1>

              <div className="accent-rule w-20 mb-6" />

              <p className="max-w-full md:max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-[#4A4A4A] mb-7">
                For endurance athletes, youth development, and coaches who want
                clear guidance, better habits, and steady long-term growth.
              </p>
            </div>

            <div
              ref={authorityRef}
              className="grid grid-cols-1 sm:flex sm:flex-wrap items-start sm:items-center gap-x-5 gap-y-3 mb-8"
            >
              {AUTHORITY_ITEMS.map((item, i) => (
                <span key={item} className="flex items-center min-w-0">
                  <span className="font-mono-label text-[10px] md:text-[11px] text-[#4A4A4A] leading-snug break-words">
                    {item}
                  </span>
                  {i < AUTHORITY_ITEMS.length - 1 && (
                    <span className="hidden sm:inline-block ml-4 w-1 h-1 rounded-full bg-[#C41E3A]" />
                  )}
                </span>
              ))}
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/apply" className="btn-primary w-full text-center sm:w-auto">
                APPLY FOR COACHING
              </Link>
              <button onClick={scrollToPrograms} className="btn-outline w-full text-center sm:w-auto">
                EXPLORE PROGRAMS
              </button>
            </div>
          </div>

          <div
            ref={imageRef}
            className="order-2 min-w-0 flex justify-center lg:justify-end"
          >
            <div className="image-card hero-portrait w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[430px] aspect-[3/4] rounded-2xl">
              <img
                src="/images/MikeProfessionalHeadshot-hero.jpg"
                alt="Coach Mike On"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="sr-only">
              Michael On, founder and head coach of TeamON Multisports.
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
        <ChevronDown className="w-6 h-6 text-[#9B9B9B]" />
      </div>
    </section>
  );
}
