import { STORE_CONFIG } from '@/config/store';
import {Navbar} from '@/components/Navbar';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-2xl mb-4 text-white">Gulmohar</h3>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
            Elevating your everyday style with curated collections of women's wear, fine jewelry, and luxury cosmetics.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/guriya.kumary.35/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61586321195315&sk=reels_tab" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Gulmohar-l6u" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-4 text-white tracking-tight">Visit Us</h4>
          <address className="text-sm text-gray-400 not-italic flex flex-col gap-2">
            <span>Shop No 7, Greenvista</span>
            <span>Narayanpur, Battala, R-Gopalpur</span>
            <span>Kolkata, North 24 Parganas</span>
            <span className="mt-2 text-white font-medium flex items-center gap-2">
              Phone: {STORE_CONFIG.phone}
              <a href={`tel:${STORE_CONFIG.phone}`} className="text-gold hover:text-white transition-colors text-xs uppercase tracking-wider border-b border-gold/30 pb-0.5 ml-2">Call Us</a>
            </span>
          </address>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-4 text-white tracking-tight">Store Hours</h4>
          <ul className="text-sm text-gray-400 flex flex-col gap-2">
            <li className="font-medium text-white mb-1">Open All 7 Days</li>
            <li>10:00 AM - 2:00 PM</li>
            <li>5:00 PM - 10:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} Gulmohar Boutique. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for local elegance.</p>
      </div>
    </footer>
  );
}