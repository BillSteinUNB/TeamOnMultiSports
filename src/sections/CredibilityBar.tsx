import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const CREDENTIALS = [
  { value: '7×', label: 'Kona Qualifier Coach' },
  { value: 'Sub-3:00', label: 'Marathon Athletes' },
  { value: '20+', label: 'Years Experience' },
  { value: 'CSEP-CEP', label: 'Certified' },
  { value: 'NCCP', label: 'Competition Development' },
];

export default function CredibilityBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cred-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="credibility" ref={sectionRef} className="py-8 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-12">
          {CREDENTIALS.map((cred) => (
            <div key={cred.label} className="cred-item text-center">
              <div className="stat-number text-[#C41E3A] !text-[clamp(28px,3.5vw,42px)]">
                {cred.value}
              </div>
              <div className="font-mono-label text-xs text-gray-600">
                {cred.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
