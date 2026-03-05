import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProgramCardProps {
  title: string;
  description: string;
  features: string[];
  linkTo: string;
  linkLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export default function ProgramCard({
  title,
  description,
  features,
  linkTo,
  linkLabel = 'Learn More',
  icon,
  className,
}: ProgramCardProps) {
  return (
    <div className={cn('card-light p-6 rounded-lg flex flex-col h-full', className)}>
      {icon && <div className="text-[#C41E3A] mb-4">{icon}</div>}
      <h3 className="font-display text-2xl text-[#1A1A1A] mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={linkTo} className="btn-primary inline-block">
        {linkLabel}
      </Link>
    </div>
  );
}
