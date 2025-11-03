const Services = () => {
  return <section id="services" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-center">
          Our Services
        </h2>
        
        <div className="space-y-12">
          <div className="group p-8 md:p-10 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Transcreation and Creative Adaptation
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              We preserve your creative intent while delivering Arabic copy that resonates emotionally and culturally.
            </p>
          </div>
          
          <div className="group p-8 md:p-10 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Arabic Copywriting
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              From ad campaigns to video scripts and social media content, we craft copy that inspires action and builds loyalty.
            </p>
          </div>
          
          <div className="group p-8 md:p-10 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Consultation and Training
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              We help agencies and in-house teams master Arabic copywriting through interactive workshops and tailored sessions.
            </p>
          </div>
          
          <div className="group p-8 md:p-10 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Multimedia Content Creation
            </h3>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">We produce bilingual and Arabic-only content for blogs, podcasts, and videos designed to sound local, smart, and human.</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Services;