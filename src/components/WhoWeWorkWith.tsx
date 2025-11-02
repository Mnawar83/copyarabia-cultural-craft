import { Building2, Gem, Feather, Diamond } from "lucide-react";

const WhoWeWorkWith = () => {
  return (
    <section id="who-we-work-with" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-center">
          Who We Work With
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Agencies</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Agencies seeking reliable Arabic copy and transcreation partners.
            </p>
          </div>
          
          <div className="p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Gem className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Brands</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Brands expanding or relaunching in Arabic-speaking markets.
            </p>
          </div>
          
          <div className="p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Feather className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Content Creators</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Content creators and entrepreneurs wanting authentic Arabic adaptation of English content.
            </p>
          </div>
          
          <div className="p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Diamond className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">Executives</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Executives and thought leaders needing professional bilingual personal branding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
