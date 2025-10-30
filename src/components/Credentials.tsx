const Credentials = () => {
  return (
    <section id="credentials" className="py-24 px-6 bg-card/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-center">
          Our Background
        </h2>
        
        <div className="space-y-8 text-center">
          <div className="p-8 rounded-xl">
            <div className="text-5xl mb-4">📅</div>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground mb-4">
              Established in <span className="text-primary font-semibold">2014</span> by Mnawar Mohammed, with <span className="text-primary font-semibold">20+ years</span> in advertising across Beirut and Dubai.
            </p>
          </div>
          
          <div className="p-8 rounded-xl">
            <div className="text-5xl mb-4">📚</div>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground mb-4">
              Author of <span className="font-semibold italic">Fundamentals of Copywriting</span>, the first Arabic-focused copywriting book.
            </p>
          </div>
          
          <div className="p-8 rounded-xl">
            <div className="text-5xl mb-4">🤝</div>
            <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground">
              Trusted by clients across <span className="text-primary font-semibold">Saudi Arabia</span>, the <span className="text-primary font-semibold">UAE</span>, and <span className="text-primary font-semibold">Lebanon</span> for precision and cultural insight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
