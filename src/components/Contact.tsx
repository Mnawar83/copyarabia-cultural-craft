import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at copywriter@copyarabia.com",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-center">
          Let's Connect
        </h2>
        
        <p className="font-sans text-lg text-center text-muted-foreground mb-12">
          Ready to elevate your Arabic copy? Drop us a line.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a 
            href="mailto:copywriter@copyarabia.com"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors duration-300 group"
          >
            <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-sans">copywriter@copyarabia.com</div>
            </div>
          </a>
          
          <a 
            href="tel:+9613690148"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors duration-300 group"
          >
            <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-sans">+961 3 690 148</div>
            </div>
          </a>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card/50 border-border focus:border-primary transition-colors"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card/50 border-border focus:border-primary transition-colors"
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-card/50 border-border focus:border-primary transition-colors min-h-[150px]"
            />
          </div>
          
          <Button 
            type="submit" 
            variant="hero" 
            className="w-full md:w-auto px-8"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
