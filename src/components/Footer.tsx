import { Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-[#E5E5E5] py-12 lg:py-16">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="font-mono-label text-lg text-[#1A1A1A] tracking-widest mb-3">
              TEAMON MULTISPORTS
            </div>
            <p className="text-sm text-[#4A4A4A] max-w-sm leading-relaxed mb-4">
              Athlete development, endurance coaching, and coach mentorship led by
              Michael On. Based in Fredericton, serving athletes and coaches across
              Atlantic Canada and beyond.
            </p>
            <p className="font-mono-label text-[11px] text-[#6B6B6B] tracking-widest mb-3">
              Founder & Head Coach: Mike On
            </p>
            <p className="font-display text-xl text-[#C41E3A]">
              DON'T STRAIN BUT TRAIN
            </p>
          </div>

          <div>
            <div className="font-mono-label text-[11px] md:text-[10px] text-[#6B6B6B] tracking-widest mb-4">
              QUICK LINKS
            </div>
            <ul className="space-y-1">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Michael', path: '/about' },
                { label: 'Athlete Coaching', path: '/coaching' },
                { label: 'Youth Development', path: '/youth-pathway' },
                { label: 'Camps', path: '/camps' },
                { label: 'Coach Mentorship', path: '/coach-mentorship' },
                { label: 'Results', path: '/results' },
                { label: 'Apply', path: '/apply' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors inline-block py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono-label text-[11px] md:text-[10px] text-[#6B6B6B] tracking-widest mb-4">
              CONNECT
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/mikeonruns"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#4A4A4A] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:coachmikeon@gmail.com"
                className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#4A4A4A] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-all"
                aria-label="Email TeamON Multisports"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+15064764214"
                className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#4A4A4A] hover:text-[#C41E3A] hover:bg-[#C41E3A]/10 transition-all"
                aria-label="Call TeamON Multisports"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-xs text-[#6B6B6B]">
            &copy; 2025 TeamON Multisports. All rights reserved.
          </p>
          <p className="font-mono-label text-[11px] md:text-[10px] text-[#6B6B6B] tracking-widest">
            FREDERICTON, NEW BRUNSWICK, CANADA
          </p>
        </div>
      </div>
    </footer>
  );
}
