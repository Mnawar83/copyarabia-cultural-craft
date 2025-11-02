import { useState, useEffect } from "react";
import logo from "@/assets/copyarabia-icon-new.png";
import { Menu, X } from "lucide-react";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };
  const navLinks = [{
    name: "Why Us",
    id: "why-copyarabia"
  }, {
    name: "Services",
    id: "services"
  }, {
    name: "What Sets Us Apart",
    id: "what-sets-us-apart"
  }, {
    name: "Clients",
    id: "who-we-work-with"
  }, {
    name: "Credentials",
    id: "credentials"
  }, {
    name: "Contact",
    id: "contact"
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({
          top: 0,
          behavior: "smooth"
        })} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="CopyArabia Icon" 
              className="h-16 w-16 object-contain mix-blend-multiply dark:mix-blend-screen"
            />
            <span className="text-2xl font-bold text-foreground">CopyArabia</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-sans text-sm hover:text-primary transition-colors duration-300 relative group">
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>)}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 hover:bg-card/50 rounded-lg transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => <button key={link.id} onClick={() => scrollToSection(link.id)} className="font-sans text-left py-2 px-4 hover:bg-card/50 rounded-lg transition-colors duration-300">
                  {link.name}
                </button>)}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;