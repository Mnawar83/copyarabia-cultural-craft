import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyCopyArabia from "@/components/WhyCopyArabia";
import Services from "@/components/Services";
import WhatSetsUsApart from "@/components/WhatSetsUsApart";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    const sectionId = window.location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <WhyCopyArabia />
      <Services />
      <WhatSetsUsApart />
      <WhoWeWorkWith />
      <Credentials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
