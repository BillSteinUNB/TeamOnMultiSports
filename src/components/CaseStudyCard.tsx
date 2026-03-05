import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

interface CaseStudyCardProps {
  name: string;
  discipline: string;
  achievement: string;
  metrics?: {
    before?: string;
    after?: string;
    stats?: string[];
  };
  testimonialSnippet?: string;
  image?: string;
  variant?: 'compact' | 'full';
  className?: string;
}

export default function CaseStudyCard({
  name,
  discipline,
  achievement,
  metrics,
  testimonialSnippet,
  image,
  variant = 'compact',
  className,
}: CaseStudyCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('card-light p-6 rounded-lg', className)}>
        <span className="feature-tag mb-3 inline-block">{discipline}</span>
        <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-[#C41E3A]">
          <Trophy className="w-4 h-4" />
          <span className="font-semibold">{achievement}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('card-light p-6 rounded-lg', className)}>
      <div className="flex items-start gap-4 mb-4">
        {image && (
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div className="flex-1">
          <span className="feature-tag mb-2 inline-block">{discipline}</span>
          <h3 className="font-display text-2xl text-[#1A1A1A]">{name}</h3>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#C41E3A] mb-4">
        <Trophy className="w-5 h-5" />
        <span className="font-semibold text-lg">{achievement}</span>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded">
          {metrics.before && metrics.after && (
            <>
              <div>
                <span className="text-xs text-gray-500">Before</span>
                <p className="font-mono-label text-lg">{metrics.before}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">After</span>
                <p className="font-mono-label text-lg text-[#C41E3A]">{metrics.after}</p>
              </div>
            </>
          )}
          {metrics.stats && metrics.stats.map((stat) => (
            <div key={stat}>
              <p className="font-mono-label text-sm">{stat}</p>
            </div>
          ))}
        </div>
      )}

      {testimonialSnippet && (
        <blockquote className="text-gray-600 italic border-l-2 border-[#C41E3A] pl-4">
          "{testimonialSnippet}"
        </blockquote>
      )}
    </div>
  );
}
