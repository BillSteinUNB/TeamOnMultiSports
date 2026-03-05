import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  className?: string;
}

export default function PageHero({ 
  title, 
  subtitle, 
  breadcrumb, 
  className 
}: PageHeroProps) {
  return (
    <section className={cn('bg-[#F8F8F8] py-16 md:py-24', className)}>
      <div className="max-w-7xl mx-auto px-6">
        {breadcrumb && (
          <p className="font-mono-label text-sm text-gray-500 mb-4">{breadcrumb}</p>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">{subtitle}</p>
        )}
        <div className="accent-rule mt-6 w-20" />
      </div>
    </section>
  );
}
