import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-slate-400 text-center">
      Copyright &copy; {new Date().getFullYear()} &middot;{' '}
      <Link
        className="font-bold hover:text-indigo-300"
        target="_blank"
        href="https://wowpixels.dev"
      >
        wowpixels.dev
      </Link>
      <div className="mt-1 text-xs">
        Powered by OpenAI, Next.js, Tailwind CSS & Tremor 2.0
      </div>
    </footer>
  );
};

export default Footer;
