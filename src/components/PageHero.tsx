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
    <section className={cn('bg-[#F8F8F8] pt-28 pb-14 md:pt-32 md:pb-20', className)}>
      <div className="max-w-7xl mx-auto px-6">
        {breadcrumb && (
          <p className="font-mono-label text-[11px] text-[#C41E3A] mb-4">{breadcrumb}</p>
        )}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] mb-4 max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed max-w-2xl">{subtitle}</p>
        )}
        <div className="accent-rule mt-6 w-20" />
      </div>
    </section>
  );
}
