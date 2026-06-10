import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { gsap } from '@/lib/gsap';
import { Award, BookOpen, Users, MapPin, ArrowRight } from 'lucide-react';

const CREDENTIALS = [
  { icon: Award, text: 'Credential #1' },
  { icon: BookOpen, text: 'Credential #2' },
  { icon: Users, text: 'Leadership Role #1' },
  { icon: MapPin, text: 'Coaching Experience Detail #1' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-spacing bg-[#FAFAFA]">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <div ref={contentRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="image-card aspect-[4/3]">
              <img
                src="/images/MikeWithTeamNB.jpg"
                alt="Michael On coaching Team New Brunswick athletes"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div>
              <span className="font-mono-label text-[11px] text-[#C41E3A] tracking-widest mb-4 block">
                WHY MIKE
              </span>
              <h2 className="font-display text-section text-[#1A1A1A] mb-4">
                Led by Mike On.
                <br />
                <span className="text-[#C41E3A]">Built with care.</span>
              </h2>
              <div className="accent-rule w-20 mb-6" />

              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">
                TeamON Multisports is Mike's coaching brand. It carries his
                standards, his experience, and his way of helping people get
                better at endurance sport.
              </p>

              <p className="text-[#4A4A4A] leading-relaxed mb-8">
                The coaching is structured and professional, but it still feels
                personal: clear plans, honest feedback, and a coach who cares
                about the person doing the work.
              </p>

              <div className="space-y-3">
                <h4 className="font-mono-label text-xs text-[#1A1A1A] tracking-widest mb-4">
                  CREDENTIALS TO CONFIRM
                </h4>
                {CREDENTIALS.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C41E3A]/10 flex items-center justify-center flex-shrink-0">
                      <cred.icon className="w-4 h-4 text-[#C41E3A]" />
                    </div>
                    <span className="text-sm text-[#4A4A4A]">{cred.text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 py-2 font-mono-label text-xs tracking-widest text-[#C41E3A] hover:text-[#9B1B30] transition-colors group"
              >
                READ FULL BIO
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
