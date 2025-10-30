const WhatSetsUsApart = () => {
  return (
    <section id="what-sets-us-apart" className="py-24 px-6 bg-card/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-center">
          What Makes CopyArabia Different
        </h2>
        
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
              <span className="text-primary-foreground font-bold">✓</span>
            </div>
            <p className="font-sans text-lg md:text-xl leading-relaxed">
              <span className="font-semibold">We think culturally first.</span> Arabic isn't just a language; it's a mindset.
            </p>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
              <span className="text-primary-foreground font-bold">✓</span>
            </div>
            <p className="font-sans text-lg md:text-xl leading-relaxed">
              <span className="font-semibold">We deliver commercially.</span> Every line has a purpose.
            </p>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
              <span className="text-primary-foreground font-bold">✓</span>
            </div>
            <p className="font-sans text-lg md:text-xl leading-relaxed">
              <span className="font-semibold">Direct access to the founder.</span> You get Mnawar Mohammed, the creative mind behind every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
