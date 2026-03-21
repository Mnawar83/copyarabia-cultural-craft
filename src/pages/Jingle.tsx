import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Mic2, Music2, Sparkles, Waves, Globe2 } from "lucide-react";

const pageTitle = "Arabic Jingle Service | Custom Arabic Brand Jingles in 24 Hours";
const pageDescription =
  "Get a custom Arabic jingle for your brand in 24 hours. Built for ads, reels, launches, restaurants, real estate, and social campaigns.";


const Jingle = () => {
  useEffect(() => {
    document.title = pageTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property='${name}']` : `meta[name='${name}']`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setMeta("description", pageDescription);
    setMeta("keywords", "Arabic jingle service, custom Arabic jingle, Arabic advertising jingle, brand jingle in Arabic, Arabic ad music");
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", pageDescription, true);
    setMeta("og:url", "https://copyarabia.com/jingle", true);
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", pageDescription);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://copyarabia.com/jingle");

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Arabic Jingle Service",
      provider: {
        "@type": "Organization",
        name: "CopyArabia",
        url: "https://copyarabia.com",
      },
      areaServed: "MENA",
      serviceType: "Custom Arabic audio branding and ad jingles",
      description: pageDescription,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "499",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Arabic jingle deliverables",
        itemListElement: [
          "15–30 second jingle",
          "Custom lyrics + hook",
          "Arabic dialect-based creative",
          "24-hour delivery",
        ],
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How fast is delivery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Delivery is completed in 24 hours for the core package after brief submission and payment.",
          },
        },
        {
          "@type": "Question",
          name: "Can I choose Arabic dialect?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can request MSA Arabic jingle delivery or dialect options such as Lebanese, Saudi, and Iraqi Arabic jingles.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use it commercially?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The jingle is built for commercial ad use, including social campaigns, paid ads, and launch creatives.",
          },
        },
      ],
    };

    const existing = document.getElementById("jingle-schema");
    existing?.remove();

    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "jingle-schema";
    schemaScript.text = JSON.stringify([schema, faqSchema]);
    document.head.appendChild(schemaScript);

    if (window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 80);
    }

    return () => {
      document.getElementById("jingle-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-28">
        <section className="px-6 py-20 border-b border-border/60">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
            <div>
              <p className="uppercase tracking-[0.24em] text-primary text-xs mb-5">Arabic Audio Branding</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                Get a Catchy Arabic Jingle for Your Brand in 24 Hours
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Custom AI-powered Arabic jingles for ads, reels, launches, and social content. No studio. No delays. Just results.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Ready in 24 hours", "No studio needed", "Arabic-first creative", "Built for ads, not just music", "Made to be remembered"].map((item) => (
                  <span key={item} className="text-sm border border-primary/40 px-3 py-1.5 rounded-full text-primary">
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-sm text-secondary mb-10">We only accept a limited number of jingle orders each week.</p>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <a href="#order-form">Start Your Order</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#samples">Listen to Samples</a>
                </Button>
              </div>
            </div>

            <aside className="bg-card border border-border/80 rounded-2xl p-7 shadow-[0_15px_60px_-30px_hsl(45_70%_60%_/_0.35)]">
              <p className="uppercase text-xs tracking-[0.2em] text-primary mb-5">Trusted by brands, agencies, and creators across the Arab world</p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-primary" /> Arabic jingle service built for performance marketing.</li>
                <li className="flex items-center gap-3"><Mic2 className="w-4 h-4 text-primary" /> Dialect flexibility: MSA, Lebanese, Saudi, and Iraqi Arabic jingles.</li>
                <li className="flex items-center gap-3"><Waves className="w-4 h-4 text-primary" /> Crafted for Arabic jingle for Instagram, TikTok, launches, and ad placements.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="what-you-get" className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Everything You Need to Sound Like a Brand</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {["Custom-written lyrics", "Arabic-first tone", "Professionally structured hook", "Ready-to-use audio", "Fast delivery"].map((item) => (
                <article key={item} className="bg-card border border-border rounded-xl p-5">
                  <Music2 className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-16 border-y border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Simple Pricing. Clear Value.</h2>
              <p className="text-muted-foreground">Built for ads and social content</p>
            </div>
            <div className="bg-background border border-primary/40 rounded-2xl p-8">
              <p className="text-5xl font-serif text-primary mb-4">$499</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>15–30 sec jingle</li>
                <li>Custom lyrics + hook</li>
                <li>Delivered in 24hrs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">From Idea to Jingle in 3 Steps</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {["Tell us about your brand", "Submit your request", "Secure payment"].map((step, index) => (
                <article key={step} className="bg-card border border-border rounded-xl p-6">
                  <p className="text-primary text-xs tracking-[0.2em] uppercase mb-3">Step {index + 1}</p>
                  <h3 className="font-serif text-xl">{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-y border-border/60">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">Built for Brands That Need Attention Fast</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>Launching a new product</li>
                <li>Running paid ads</li>
                <li>Promoting on Instagram or TikTok</li>
                <li>Opening a restaurant or shop</li>
                <li>Real estate campaigns</li>
                <li>Seasonal promotions</li>
              </ul>
            </div>
            <article className="bg-card border border-border rounded-2xl p-7">
              <Globe2 className="w-5 h-5 text-primary mb-4" />
              <h3 className="font-serif text-2xl mb-4">Why CopyArabia for Arabic ad music?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Unlike generic AI tools, we combine copywriting, Arabic cultural insight, and AI to create jingles that actually convert.
                This makes each custom Arabic jingle commercially useful for paid campaigns and brand recall.
              </p>
            </article>
          </div>
        </section>

        <section id="samples" className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Sample Arabic Jingles</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: "FreeCVAudit", src: "/jingle/freecvaudit.mp3" },
                { label: "Work Waves", src: "/jingle/work-waves.mp3" },
                { label: "CopyArabia", src: "/jingle/copyarabia.mp3" },
              ].map((sample) => (
                <article key={sample.label} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-serif text-xl mb-4">{sample.label}</h3>
                  <audio controls preload="none" className="w-full" aria-label={`${sample.label} Arabic jingle sample`}>
                    <source src={sample.src} type="audio/mpeg" />
                  </audio>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-y border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">What clients are saying</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <blockquote className="bg-background border border-border rounded-xl p-6">
                <p className="text-lg mb-4">“This jingle made our ad stand out immediately. People started repeating it.”</p>
                <cite className="text-sm text-muted-foreground not-italic">— Restaurant Owner</cite>
              </blockquote>
              <blockquote className="bg-background border border-border rounded-xl p-6">
                <p className="text-lg mb-4">“Fast, creative, and actually useful for campaigns.”</p>
                <cite className="text-sm text-muted-foreground not-italic">— Marketing Manager</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="faq" className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How fast is delivery?",
                  answer: "We deliver the core package within 24 hours after you submit the brief and complete payment.",
                },
                {
                  question: "Can I choose Arabic dialect?",
                  answer: "Yes. You can request MSA Arabic jingle output or dialect-based creative including Lebanese Arabic jingle, Saudi Arabic jingle, and Iraqi Arabic jingle styles.",
                },
                {
                  question: "Can I use it commercially?",
                  answer: "Absolutely. Every Arabic advertising jingle is made for commercial use in paid ads, social media, and launch campaigns.",
                },
                {
                  question: "Is this suitable for restaurants and real estate campaigns?",
                  answer: "Yes. This service is commonly used for Arabic jingle for restaurants, Arabic jingle for real estate, and high-velocity social campaign promotions.",
                },
              ].map((item) => (
                <article key={item.question} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-serif text-xl mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="order-form" className="px-6 py-16 border-y border-border/60 bg-card/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Start your custom Arabic jingle order</h2>
            <p className="text-muted-foreground mb-8">Complete this brief to start your Arabic jingle for ads, social, or campaign launch, then continue to payment.</p>

            <form
              name="jingle-order"
              method="POST"
              action="/jingle/success"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="grid sm:grid-cols-2 gap-4"
            >
              <input type="hidden" name="form-name" value="jingle-order" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>

              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Brand name
                <input required type="text" name="brand-name" className="bg-background border border-border rounded-md h-11 px-3" />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Industry
                <input required type="text" name="industry" className="bg-background border border-border rounded-md h-11 px-3" />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Your name
                <input required type="text" name="your-name" className="bg-background border border-border rounded-md h-11 px-3" />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Email
                <input required type="email" name="email" className="bg-background border border-border rounded-md h-11 px-3" />
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Preferred dialect
                <select name="preferred-dialect" required className="bg-background border border-border rounded-md h-11 px-3">
                  <option value="">Choose a dialect</option>
                  <option>MSA Arabic</option>
                  <option>Lebanese Arabic</option>
                  <option>Saudi Arabic</option>
                  <option>Iraqi Arabic</option>
                  <option>Other dialect</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-1">
                Usage type
                <select name="usage-type" required className="bg-background border border-border rounded-md h-11 px-3">
                  <option value="">Select usage</option>
                  <option>Paid ads</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>Product launch</option>
                  <option>Restaurant promotion</option>
                  <option>Real estate campaign</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                Brief description
                <textarea
                  required
                  name="brief-description"
                  rows={5}
                  className="bg-background border border-border rounded-md px-3 py-3"
                  placeholder="Tell us your campaign objective, audience, offer, and tone."
                />
              </label>

              <div className="sm:col-span-2 pt-2">
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                  Submit and Continue to Payment
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="px-6 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl mb-5">Your Brand Deserves to Be Heard. Not Just Seen</h2>
            <p className="text-muted-foreground mb-8">
              Fill the brief, continue to payment, and move your campaign forward with a custom Arabic jingle.
            </p>
            <Button asChild variant="hero" size="lg">
              <a href="#order-form">Start Your Order</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        CopyArabia 2026. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Jingle;
