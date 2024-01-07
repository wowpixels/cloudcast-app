const Footer = () => {
  return (
    <footer className="text-slate-400 text-center mt-10 md:mt-0">
      Copyright &copy; {new Date().getFullYear()} &middot;{' '}
      <span className="font-bold">wowpixels.dev</span>
      <div className="mt-1 text-xs">
        Powered by OpenAI, Next.js, Tailwind CSS, Tremor 2.0 & Stepzen
      </div>
    </footer>
  );
};

export default Footer;
