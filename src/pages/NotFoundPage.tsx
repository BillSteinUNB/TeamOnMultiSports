import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center section-spacing">
      <div className="text-center">
        <h1 className="font-display text-8xl md:text-9xl text-[#C41E3A] mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found. Let's get you back on track.</p>
        <Link to="/" className="btn-primary inline-block">
          Return Home
        </Link>
      </div>
    </main>
  );
}
