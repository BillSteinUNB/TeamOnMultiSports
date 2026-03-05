import { cn } from '@/lib/utils';
import { Link } from 'react-router';

interface CTABannerProps {
  variant?: 'apply' | 'call' | 'both';
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function CTABanner({ 
  variant = 'both', 
  heading = 'Ready to Elevate Your Performance?',
  subheading,
  className 
}: CTABannerProps) {
  return (
    <section className={cn('bg-[#C41E3A] py-16 md:py-20', className)}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">{heading}</h2>
        {subheading && (
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{subheading}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {(variant === 'apply' || variant === 'both') && (
            <Link 
              to="/apply" 
              className="btn-primary bg-white text-[#C41E3A] hover:bg-gray-100"
            >
              Apply for Coaching
            </Link>
          )}
          {(variant === 'call' || variant === 'both') && (
            <a 
              href="mailto:coachmikeon@gmail.com" 
              className="btn-outline border-white text-white hover:bg-white/10"
            >
              Schedule a Strategy Call
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
