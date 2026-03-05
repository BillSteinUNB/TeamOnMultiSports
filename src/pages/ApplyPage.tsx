import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PageHero from '@/components/PageHero';
import { gsap } from '@/lib/gsap';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  phone: z.string().optional(),
  location: z.string().optional(),
  ageRange: z.string().optional(),

  primarySport: z.string().min(1, 'Primary sport is required.'),
  experienceLevel: z.string().min(1, 'Experience level is required.'),
  trainingVolume: z.string().min(1, 'Current training volume is required.'),
  coachingExperience: z.string().min(1, 'Previous coaching experience is required.'),
  keyRaces: z.string().optional(),

  programInterest: z.string().min(1, 'Program interest is required.'),
  primaryGoal: z.string().min(1, 'Primary goal is required.'),
  biggestChallenge: z.string().optional(),
  hearAbout: z.string().min(1, 'Please tell us how you heard about us.'),

  applicationConfirmed: z.boolean().refine((value) => value, {
    message: 'You must confirm before submitting.',
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const steps = ['Personal Information', 'Athletic Background', 'Goals & Preferences', 'Review & Submit'];

const stepFields: Array<Array<keyof ApplicationFormValues>> = [
  ['fullName', 'email'],
  ['primarySport', 'experienceLevel', 'trainingVolume', 'coachingExperience'],
  ['programInterest', 'primaryGoal', 'hearAbout'],
  ['applicationConfirmed'],
];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formWrapRef = useRef<HTMLDivElement>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      ageRange: '',
      primarySport: '',
      experienceLevel: '',
      trainingVolume: '',
      coachingExperience: '',
      keyRaces: '',
      programInterest: '',
      primaryGoal: '',
      biggestChallenge: '',
      hearAbout: '',
      applicationConfirmed: false,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-apply-animate="intro"]', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.from('[data-apply-animate="step-indicator"]', {
        opacity: 0,
        y: 18,
        duration: 0.45,
        delay: 0.1,
        ease: 'power2.out',
      });
    }, formWrapRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-apply-animate="step-panel"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }, formWrapRef);

    return () => ctx.revert();
  }, [currentStep]);

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = async () => {
    const valid = await form.trigger(stepFields[currentStep], { shouldFocus: true });
    if (!valid) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (values: ApplicationFormValues) => {
    console.log('Application submitted:', values);
    setIsSubmitted(true);
  };

  const values = form.watch();

  const sectionValue = (value?: string) => {
    if (!value || value.trim().length === 0) {
      return 'Not provided';
    }

    return value;
  };

  return (
    <main>
      <Helmet>
        <title>Apply for Coaching | TeamOn Multisports</title>
        <meta name="description" content="Start your application for endurance coaching with TeamOn Multisports." />
      </Helmet>
      <PageHero
        title="Apply for Coaching"
        subtitle="Tell us about your background and goals so we can determine the best fit for your training journey."
        breadcrumb="Programs / Apply"
      />

      <section className="section-spacing" ref={formWrapRef}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="card-light" data-apply-animate="intro">
            {isSubmitted ? (
              <div className="py-10 text-center">
                <p className="font-mono-label text-xs text-[#C41E3A] mb-3">Application Received</p>
                <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-4">Thank You</h2>
                <p className="text-[#4A4A4A] max-w-xl mx-auto">
                  Thank you! We&apos;ll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <>
                <div data-apply-animate="step-indicator" className="mb-10">
                  <div className="flex items-center justify-between gap-2 md:gap-4">
                    {steps.map((step, index) => {
                      const isActive = index === currentStep;
                      const isComplete = index < currentStep;

                      return (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center text-center min-w-0">
                            <div
                              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                                isActive || isComplete
                                  ? 'border-[#C41E3A] bg-[#C41E3A] text-white'
                                  : 'border-[#D7D7D7] text-[#8A8A8A]'
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span
                              className={`mt-2 text-[11px] md:text-xs leading-tight ${
                                isActive ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'
                              }`}
                            >
                              {step}
                            </span>
                          </div>

                          {index < steps.length - 1 && (
                            <div className="hidden md:block h-px flex-1 mx-3 bg-[#E5E5E5]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div data-apply-animate="step-panel" className="space-y-6">
                      {currentStep === 0 && (
                        <>
                          <div>
                            <h3 className="font-display text-3xl text-[#1A1A1A] mb-1">Personal Information</h3>
                            <p className="text-sm text-[#6B6B6B]">
                              We&apos;ll use this information to contact you and tailor your onboarding.
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Optional" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location / City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Optional" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="ageRange"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Age Range</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select age range" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Under 18">Under 18</SelectItem>
                                        <SelectItem value="18-25">18-25</SelectItem>
                                        <SelectItem value="26-35">26-35</SelectItem>
                                        <SelectItem value="36-45">36-45</SelectItem>
                                        <SelectItem value="46-55">46-55</SelectItem>
                                        <SelectItem value="55+">55+</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 1 && (
                        <>
                          <div>
                            <h3 className="font-display text-3xl text-[#1A1A1A] mb-1">Athletic Background</h3>
                            <p className="text-sm text-[#6B6B6B]">
                              Help us understand your training history and competitive context.
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="primarySport"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Sport</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select primary sport" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Triathlon">Triathlon</SelectItem>
                                        <SelectItem value="Running">Running</SelectItem>
                                        <SelectItem value="Both">Both</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="experienceLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Experience Level</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select experience level" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Competitive">Competitive</SelectItem>
                                        <SelectItem value="Elite">Elite</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="trainingVolume"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Current Training Volume</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select training volume" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="0-5 hrs/week">0-5 hrs/week</SelectItem>
                                        <SelectItem value="5-10 hrs/week">5-10 hrs/week</SelectItem>
                                        <SelectItem value="10-15 hrs/week">10-15 hrs/week</SelectItem>
                                        <SelectItem value="15-20 hrs/week">15-20 hrs/week</SelectItem>
                                        <SelectItem value="20+ hrs/week">20+ hrs/week</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="coachingExperience"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Previous Coaching Experience</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select coaching experience" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Self-Coached">Self-Coached</SelectItem>
                                        <SelectItem value="Had a Coach">Had a Coach</SelectItem>
                                        <SelectItem value="Currently Coached">Currently Coached</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="keyRaces"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Key Races / Events Completed</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={4}
                                      placeholder="Optional"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div>
                            <h3 className="font-display text-3xl text-[#1A1A1A] mb-1">Goals & Preferences</h3>
                            <p className="text-sm text-[#6B6B6B]">
                              Share where you want to go and how you prefer to get there.
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="programInterest"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Program Interest</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a program" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="High-Performance Coaching">
                                          High-Performance Coaching
                                        </SelectItem>
                                        <SelectItem value="Youth Pathway">Youth Pathway</SelectItem>
                                        <SelectItem value="Training Camps">Training Camps</SelectItem>
                                        <SelectItem value="Coach Mentorship">Coach Mentorship</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="primaryGoal"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Primary Goal</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={4}
                                      placeholder="What are you trying to achieve in the next 6-12 months?"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="biggestChallenge"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Biggest Challenge</FormLabel>
                                  <FormControl>
                                    <Textarea rows={4} placeholder="Optional" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="hearAbout"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>How Did You Hear About Us</FormLabel>
                                  <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select one" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Google">Google</SelectItem>
                                        <SelectItem value="Social Media">Social Media</SelectItem>
                                        <SelectItem value="Referral">Referral</SelectItem>
                                        <SelectItem value="Event">Event</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <div>
                            <h3 className="font-display text-3xl text-[#1A1A1A] mb-1">Review & Submit</h3>
                            <p className="text-sm text-[#6B6B6B]">
                              Review your details before sending your application.
                            </p>
                          </div>

                          <div className="grid gap-4">
                            <div className="rounded-xl border border-[#E5E5E5] p-5 bg-[#FCFCFC]">
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <h4 className="font-medium text-[#1A1A1A]">Personal Information</h4>
                                <Button type="button" variant="outline" size="sm" onClick={() => goToStep(0)}>
                                  Edit
                                </Button>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                <p><span className="text-[#6B6B6B]">Full Name:</span> {sectionValue(values.fullName)}</p>
                                <p><span className="text-[#6B6B6B]">Email:</span> {sectionValue(values.email)}</p>
                                <p><span className="text-[#6B6B6B]">Phone:</span> {sectionValue(values.phone)}</p>
                                <p><span className="text-[#6B6B6B]">Location:</span> {sectionValue(values.location)}</p>
                                <p className="sm:col-span-2">
                                  <span className="text-[#6B6B6B]">Age Range:</span> {sectionValue(values.ageRange)}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#E5E5E5] p-5 bg-[#FCFCFC]">
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <h4 className="font-medium text-[#1A1A1A]">Athletic Background</h4>
                                <Button type="button" variant="outline" size="sm" onClick={() => goToStep(1)}>
                                  Edit
                                </Button>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                <p><span className="text-[#6B6B6B]">Primary Sport:</span> {sectionValue(values.primarySport)}</p>
                                <p>
                                  <span className="text-[#6B6B6B]">Experience Level:</span> {sectionValue(values.experienceLevel)}
                                </p>
                                <p>
                                  <span className="text-[#6B6B6B]">Training Volume:</span> {sectionValue(values.trainingVolume)}
                                </p>
                                <p>
                                  <span className="text-[#6B6B6B]">Coaching Experience:</span> {sectionValue(values.coachingExperience)}
                                </p>
                                <p className="sm:col-span-2">
                                  <span className="text-[#6B6B6B]">Key Races:</span> {sectionValue(values.keyRaces)}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#E5E5E5] p-5 bg-[#FCFCFC]">
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <h4 className="font-medium text-[#1A1A1A]">Goals & Preferences</h4>
                                <Button type="button" variant="outline" size="sm" onClick={() => goToStep(2)}>
                                  Edit
                                </Button>
                              </div>
                              <div className="grid gap-3 text-sm">
                                <p>
                                  <span className="text-[#6B6B6B]">Program Interest:</span> {sectionValue(values.programInterest)}
                                </p>
                                <p>
                                  <span className="text-[#6B6B6B]">Primary Goal:</span> {sectionValue(values.primaryGoal)}
                                </p>
                                <p>
                                  <span className="text-[#6B6B6B]">Biggest Challenge:</span> {sectionValue(values.biggestChallenge)}
                                </p>
                                <p>
                                  <span className="text-[#6B6B6B]">How You Heard About Us:</span> {sectionValue(values.hearAbout)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="applicationConfirmed"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-start gap-3 rounded-lg border border-[#E5E5E5] px-4 py-3 bg-white">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => field.onChange(checked === true)}
                                    />
                                  </FormControl>
                                  <div>
                                    <FormLabel className="cursor-pointer">
                                      I understand this is an application
                                    </FormLabel>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Button type="button" variant="outline" onClick={previousStep} disabled={currentStep === 0}>
                        Back
                      </Button>

                      {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={nextStep}>
                          Next
                        </Button>
                      ) : (
                        <Button type="submit">Submit Application</Button>
                      )}
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
