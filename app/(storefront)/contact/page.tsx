"use client";

import { STORE_CONFIG } from "@/config/store";

export default function ContactPage() {
  const whatsappNumber = "919831201470";
  const whatsappMessage = encodeURIComponent("Hello Gulmohar Boutique, I would like to make an inquiry.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Contact Us</h1>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Visit our boutique or reach out via WhatsApp for a personalized shopping experience.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          
          {/* Left Column: Info */}
          <div className="flex flex-col space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-6 border-b border-border pb-4">Visit Our Boutique</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Location</h3>
                  <address className="not-italic text-foreground-muted leading-relaxed">
                    <span className="block text-foreground font-medium mb-1">Gulmohar Boutique</span>
                    Shop No 7, Greenvista<br />
                    Narayanpur, Battala, R-Gopalpur<br />
                    Kolkata, North 24 Parganas
                  </address>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Store Hours</h3>
                  <ul className="text-foreground-muted space-y-1">
                    <li className="font-medium text-foreground">Open All 7 Days</li>
                    <li>Morning: 10:00 AM - 2:00 PM</li>
                    <li>Evening: 5:00 PM - 10:00 PM</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Alternative Channels</h3>
                  <div className="flex flex-col space-y-3">
                    <a href={`tel:${STORE_CONFIG.phone}`} className="text-foreground-muted hover:text-gold transition-colors inline-flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {STORE_CONFIG.phone}
                    </a>
                    <a href={`mailto:${STORE_CONFIG.email}`} className="text-foreground-muted hover:text-gold transition-colors inline-flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      {STORE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp CTA */}
          <div className="flex flex-col">
            <h2 className="font-serif text-2xl text-foreground mb-6 border-b border-border pb-4">Instant Inquiry</h2>
            <div className="bg-surface border border-border p-8 rounded-xl flex-grow flex flex-col justify-center items-center text-center space-y-6">
              
              {/* WhatsApp Vector Graphic */}
              <div className="w-16 h-16 border border-border rounded-full flex items-center justify-center text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>

              <div>
                <h3 className="font-serif text-xl text-foreground mb-2">Message Us Directly</h3>
                <p className="text-foreground-muted mb-8">
                  Skip the lines. Send us a screenshot of your favorite items or ask about availability directly on WhatsApp. We reply instantly.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white hover:bg-[#1DA851] font-medium rounded-lg transition-colors w-full shadow-lg shadow-[#25D366]/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>
          
        </div>

        {/* Bottom Map Embed */}
        <div className="w-full h-[450px] border border-border rounded-xl overflow-hidden bg-surface">
          <iframe
            title="Gulmohar Boutique Location Map"
            src="https://www.google.com/maps?q=GREENVISTA,+NARAYANPUR,+BATTALA,+R-GOPALPUR,+KOLKATA&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}
