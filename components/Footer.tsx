const Footer = () => {
  return (
    <footer className="text-white/80 text-center mt-10 md:mt-0">
      Copyright &copy; {new Date().getFullYear()} &middot;{' '}
      <span className="font-bold">wowpixels.dev</span>
    </footer>
  );
};

export default Footer;
