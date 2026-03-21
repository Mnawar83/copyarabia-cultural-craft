import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/copyarabia-icon-new.png";
import { Menu, X } from "lucide-react";

type NavLink = {
  name: string;
  id?: string;
  path?: string;
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isJinglePage = location.pathname.startsWith("/jingle");

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
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navigateToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    navigate(`/#${sectionId}`);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const homeLinks: NavLink[] = [
    { name: "Why Us", id: "why-copyarabia" },
    { name: "Services", id: "services" },
    { name: "What Sets Us Apart", id: "what-sets-us-apart" },
    { name: "Clients", id: "who-we-work-with" },
    { name: "Credentials", id: "credentials" },
    { name: "Contact", id: "contact" },
    { name: "Jingle", path: "/jingle" },
  ];

  const jingleLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Samples", id: "samples" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQ", id: "faq" },
    { name: "Order", id: "order-form" },
  ];

  const navLinks = isJinglePage ? jingleLinks : homeLinks;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <img
              src={logo}
              alt="CopyArabia Icon"
              className="h-16 w-16 object-contain mix-blend-multiply dark:mix-blend-screen"
            />
            <span className="text-2xl font-bold text-foreground">CopyArabia</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-sans text-sm transition-colors duration-300 relative group ${
                    location.pathname === link.path ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => (isJinglePage ? scrollToSection(link.id!) : navigateToSection(link.id!))}
                  className="font-sans text-sm hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-card/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-sans text-left py-2 px-4 rounded-lg transition-colors duration-300 ${
                      location.pathname === link.path ? "bg-card text-primary" : "hover:bg-card/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => (isJinglePage ? scrollToSection(link.id!) : navigateToSection(link.id!))}
                    className="font-sans text-left py-2 px-4 hover:bg-card/50 rounded-lg transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
