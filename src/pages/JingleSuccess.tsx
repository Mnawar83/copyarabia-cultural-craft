import { useEffect } from "react";

const JingleSuccess = () => {
  useEffect(() => {
    document.title = "Thank You | CopyArabia Jingle";
    const timer = window.setTimeout(() => {
      window.location.href = "https://www.paypal.com/ncp/payment/SJVUAXC6P9PBE";
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground grid place-items-center px-6">
      <div className="max-w-xl text-center border border-border rounded-2xl bg-card p-10">
        <p className="uppercase text-xs tracking-[0.2em] text-primary mb-4">Thank you</p>
        <h1 className="font-serif text-3xl mb-4">Your brief has been submitted.</h1>
        <p className="text-muted-foreground mb-6">
          We’re now redirecting you securely to PayPal to complete payment.
        </p>
        <a className="text-primary underline underline-offset-4" href="https://www.paypal.com/ncp/payment/SJVUAXC6P9PBE">
          Continue to payment now
        </a>
      </div>
    </main>
  );
};

export default JingleSuccess;
