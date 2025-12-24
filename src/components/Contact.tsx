import { Mail, Phone } from "lucide-react";

const Contact = () => {
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
      </div>
    </section>
  );
};

export default Contact;
