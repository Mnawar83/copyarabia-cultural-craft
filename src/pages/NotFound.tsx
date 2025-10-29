import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-6xl font-serif font-bold text-primary">404</h1>
        <p className="mb-8 text-xl text-muted-foreground font-sans">Oops! Page not found</p>
        <Button 
          variant="hero" 
          asChild
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
