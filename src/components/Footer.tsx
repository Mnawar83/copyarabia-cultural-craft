const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-sans text-muted-foreground mb-2">
          © {new Date().getFullYear()} CopyArabia. Established 2014.
        </p>
        <p className="font-sans text-sm text-muted-foreground">
          Arabic Copywriting and Transcreation Agency
        </p>
      </div>
    </footer>
  );
};

export default Footer;
