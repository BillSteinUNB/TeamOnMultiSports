import { cn } from '@/lib/utils';

export interface CredentialItem {
  label: string;
  description: string;
}

const DEFAULT_CREDENTIALS: CredentialItem[] = [
  { label: 'CSEP-CEP', description: 'Certified Exercise Physiologist' },
  { label: 'NCCP Competition Development', description: 'Triathlon & Athletics' },
  { label: 'Triathlon Canada HP Coach', description: 'High Performance Certified' },
  { label: '7× Kona Qualifier Coach', description: 'Ironman World Championship' },
  { label: 'Exercise Physiology Researcher', description: 'Evidence-based methodology' },
];

interface CredentialsListProps {
  variant?: 'compact' | 'full';
  items?: CredentialItem[];
  className?: string;
}

export default function CredentialsList({ 
  variant = 'compact', 
  items,
  className 
}: CredentialsListProps) {
  const credentials = items ?? DEFAULT_CREDENTIALS;

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-4 justify-center', className)}>
        {credentials.map((cred) => (
          <span key={cred.label} className="feature-tag">
            {cred.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {credentials.map((cred) => (
        <div key={cred.label} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-mono-label text-[#C41E3A] font-semibold text-sm">{cred.label}</h4>
          <p className="text-gray-600 text-sm mt-1">{cred.description}</p>
        </div>
      ))}
    </div>
  );
}
