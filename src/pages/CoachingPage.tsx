import { Helmet } from 'react-helmet-async';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/PageHero';
import CTABanner from '@/components/CTABanner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Target,
  BarChart3,
  MessageCircle,
  CalendarCheck,
  ClipboardList,
  Repeat,
  Users,
  Zap,
  Brain,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';

const AUDIENCE = [
  { icon: Target, text: 'Competitive triathletes targeting age-group podiums or Ironman qualification' },
  { icon: Zap, text: 'Distance runners chasing personal bests from 5K through ultra-marathon' },
  { icon: Users, text: 'Multi-sport athletes transitioning into triathlon from a single-sport background' },
  { icon: HeartPulse, text: 'Dedicated age-groupers who want structure, accountability, and expert guidance' },
];

const METHODOLOGY = [
  {
    icon: Brain,
    title: 'Periodized Planning',
    description:
      'Every season is mapped with purpose: base, build, peak, and recovery phases calibrated to your goal races and life demands.',
  },
  {
    icon: BarChart3,
    title: 'Data-Informed Decisions',
    description:
      'Training load, heart rate zones, power metrics, and pace data all feed into plan adjustments, not guesswork.',
  },
  {
    icon: Repeat,
    title: 'Adaptive Progression',
    description:
      'Plans evolve weekly based on how your body responds. Fatigue, readiness, and performance trends drive every update.',
  },
];

const DELIVERABLES = [
  { icon: ClipboardList, text: 'Fully individualized daily training plans delivered to your platform of choice' },
  { icon: MessageCircle, text: 'Weekly one-on-one check-ins to review progress, adjust plans, and set priorities' },
  { icon: BarChart3, text: 'Ongoing data analysis of workouts with actionable feedback on every key session' },
  { icon: CalendarCheck, text: 'Race-day strategy and pacing plans tailored to course profile and conditions' },
  { icon: Target, text: 'Season planning and goal-setting with clear milestone checkpoints' },
  { icon: HeartPulse, text: 'Guidance on recovery protocols, nutrition timing, and training-life balance' },
];

const FAQ_ITEMS = [
  {
    question: 'How many athletes do you coach at one time?',
    answer: 'Coaching Capacity Detail #1. Confirm the athlete cap and availability with Michael On.',
  },
  {
    question: 'What platforms do you use for training delivery?',
    answer: 'Training Platform Detail #1. Add the confirmed training, communication, and workout review tools here.',
  },
  {
    question: 'How often do we communicate?',
    answer: 'Communication Detail #1. Add the confirmed check-in rhythm, feedback timing, and response expectations here.',
  },
  {
    question: 'Do I need a certain fitness level to start?',
    answer: 'Athlete Fit Detail #1. Add the confirmed intake requirements and best-fit athlete profile here.',
  },
  {
    question: 'What if I need to travel or take a break?',
    answer: 'Plan Adjustment Detail #1. Add how training is adapted around travel, illness, work, family, and recovery.',
  },
];

export default function CoachingPage() {
  const audienceRef = useRef<HTMLElement>(null);
  const methodRef = useRef<HTMLElement>(null);
  const deliverRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-animate="audience"]', {
        scrollTrigger: { trigger: audienceRef.current, start: 'top 75%' },
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.from('[data-animate="method"]', {
        scrollTrigger: { trigger: methodRef.current, start: 'top 75%' },
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.from('[data-animate="deliver"]', {
        scrollTrigger: { trigger: deliverRef.current, start: 'top 75%' },
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.from('[data-animate="faq"]', {
        scrollTrigger: { trigger: faqRef.current, start: 'top 80%' },
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <Helmet>
        <title>High-Performance Coaching | TeamON Multisports</title>
        <meta name="description" content="1-on-1 endurance coaching for competitive triathletes and runners." />
      </Helmet>
      <PageHero
        title="High-Performance Coaching"
        subtitle="1-on-1 endurance coaching for competitive triathletes and runners who want structure, feedback, and a clear path to performance."
        breadcrumb="Programs / Athlete Coaching"
      />

      <section ref={audienceRef} className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3">Who It's For</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
            Built for Athletes Who Are All In
          </h2>
          <div className="accent-rule mb-12 w-16" />
          <div className="grid sm:grid-cols-2 gap-6">
            {AUDIENCE.map((item) => (
              <div key={item.text} data-animate="audience" className="card-light flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C41E3A]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <p className="text-[#4A4A4A] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={methodRef} className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3">The Approach</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
            Methodology That Moves the Needle
          </h2>
          <div className="accent-rule mb-12 w-16" />
          <div className="grid md:grid-cols-3 gap-8">
            {METHODOLOGY.map((item) => (
              <div key={item.title} data-animate="method" className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <h3 className="font-display text-xl mb-3 text-[#1A1A1A]">{item.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={deliverRef} className="section-spacing">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3">What You Get</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4">
            Everything You Need to Perform
          </h2>
          <div className="accent-rule mb-12 w-16" />
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
            {DELIVERABLES.map((item) => (
              <div key={item.text} data-animate="deliver" className="flex items-start gap-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-[#C41E3A] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-4 h-4 text-[#6B6B6B]" />
                    <span className="font-mono-label text-[11px] md:text-[10px] text-[#6B6B6B] tracking-widest">
                      {item.text.split(' ').slice(0, 2).join(' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] leading-relaxed text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={faqRef} className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono-label text-sm text-[#C41E3A] mb-3 text-center">Common Questions</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A] mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <div className="accent-rule mb-12 w-16 mx-auto" />
          <div data-animate="faq">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-base font-medium text-[#1A1A1A] hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4A4A4A] leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Train With Purpose?"
        subheading="Apply for a coaching spot and start building a season with structure, feedback, and accountability."
        variant="apply"
      />
    </main>
  );
}
