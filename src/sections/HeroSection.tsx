import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { ChevronDown } from 'lucide-react';

const AUTHORITY_ITEMS = [
  'CSEP-CEP',
  '20+ Years',
  '7× Kona Qualifier Coach',
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
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          authorityRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          imageRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
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
      className="relative min-h-screen flex items-center bg-[#FAFAFA]"
    >
      <div className="w-full px-6 lg:px-16 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div ref={headlineRef}>
              <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
                TRIATHLON & RUN COACHING
              </span>

              <h1 className="font-display text-hero text-[#1A1A1A] leading-[0.9] mb-6">
                Developing Athletes.
                <br />
                <span className="text-[#C41E3A]">Designing Pathways.</span>
              </h1>

              <div className="accent-rule w-20 mb-6" />
            </div>

            {/* Authority Strip */}
            <div
              ref={authorityRef}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
            >
              {AUTHORITY_ITEMS.map((item, i) => (
                <span key={item} className="flex items-center">
                  <span className="font-mono-label text-[11px] text-[#4A4A4A]">
                    {item}
                  </span>
                  {i < AUTHORITY_ITEMS.length - 1 && (
                    <span className="ml-4 w-1 h-1 rounded-full bg-[#C41E3A] inline-block" />
                  )}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link to="/apply" className="btn-primary">
                APPLY FOR COACHING
              </Link>
              <button onClick={scrollToPrograms} className="btn-outline">
                EXPLORE PROGRAMS
              </button>
            </div>
          </div>

          {/* Right Image — Mike's Headshot */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="image-card w-full max-w-md aspect-[3/4] rounded-[2rem]">
              <img
                src="/images/MikeProfessionalHeadshot.jpg"
                alt="Coach Mike On"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-[#9B9B9B]" />
      </div>
    </section>
  );
}
