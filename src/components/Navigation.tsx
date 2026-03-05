import { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface NavItem {
  label: string;
  to: string;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about', sectionId: 'about' },
  { label: 'COACHING', to: '/coaching' },
  { label: 'YOUTH PATHWAY', to: '/youth-pathway' },
  { label: 'CAMPS', to: '/camps' },
  { label: 'COACH MENTORSHIP', to: '/coach-mentorship' },
  { label: 'RESULTS', to: '/results', sectionId: 'results' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  /** Smart linking: scroll on homepage, navigate with hash on subpages */
  const handleSmartClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      if (item.sectionId) {
        e.preventDefault();
        if (location.pathname === '/') {
          scrollToSection(item.sectionId);
        } else {
          navigate(`/#${item.sectionId}`);
        }
      }
      // Items without sectionId: NavLink handles navigation natively
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleMobileClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      handleSmartClick(e, item);
      setMobileOpen(false);
    },
    [handleSmartClick]
  );

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-4 flex items-center justify-between transition-all duration-300',
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-mono-label text-sm text-[#1A1A1A] tracking-widest hover:text-[#C41E3A] transition-colors"
        >
          MIKE ON
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              onClick={(e) => handleSmartClick(e, item)}
              className={({ isActive }) =>
                cn('nav-link', isActive && '!text-[#1A1A1A] after:!scale-x-100')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right: Apply CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <Link
            to="/apply"
            className="hidden md:block px-5 py-2 bg-[#C41E3A] rounded-full font-mono-label text-[10px] tracking-widest text-white hover:bg-[#9B1B30] transition-all duration-300"
          >
            APPLY
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#C41E3A] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[300px] pt-12">
          <SheetHeader>
            <SheetTitle className="font-mono-label text-sm tracking-widest text-[#1A1A1A]">
              MIKE ON
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1 px-4 mt-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                onClick={(e) => handleMobileClick(e, item)}
                className={({ isActive }) =>
                  cn(
                    'font-mono-label text-[11px] tracking-widest px-3 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'text-[#C41E3A] bg-[#C41E3A]/5'
                      : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/apply"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-5 py-3 bg-[#C41E3A] rounded-full font-mono-label text-[10px] tracking-widest text-white text-center hover:bg-[#9B1B30] transition-all duration-300"
            >
              APPLY
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
