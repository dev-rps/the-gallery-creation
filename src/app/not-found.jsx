import Link from 'next/link';
import { CameraOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-charcoal text-cream px-6 text-center select-none">
      <div className="w-20 h-20 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold mb-8 animate-pulse">
        <CameraOff size={36} />
      </div>

      <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-wide text-cream mb-4">
        This Frame is Empty — 404
      </h1>

      <p className="text-sm md:text-base text-cream/60 max-w-sm mb-12 font-light leading-relaxed">
        Looks like this moment wasn&apos;t captured. The page you are looking for has been moved or doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="px-8 py-4 bg-gold hover:bg-[#b59459] text-charcoal font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-sm hover:shadow-lg hover:shadow-gold/20"
      >
        Back to Home
      </Link>
    </div>
  );
}
