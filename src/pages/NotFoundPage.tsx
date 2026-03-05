import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="section-spacing">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-[#C41E3A] hover:underline">
        Return to home
      </Link>
    </div>
  );
}
