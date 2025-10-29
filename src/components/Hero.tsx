import { Button } from "@/components/ui/button";
import logo from "@/assets/copyarabia-logo.svg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <img 
          src={logo} 
          alt="CopyArabia Arabic Copywriting Logo" 
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 object-contain opacity-95 hover:opacity-100 transition-opacity duration-500"
        />
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Arabic Copywriting and Transcreation with Impact
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          We turn your brand's English voice into powerful, culturally aligned Arabic copy that connects, engages, and converts.
        </p>
        
        <Button 
          variant="hero" 
          size="lg"
          onClick={scrollToContact}
          className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-300"
        >
          Let's craft your Arabic story
        </Button>
      </div>
    </section>
  );
};

export default Hero;
