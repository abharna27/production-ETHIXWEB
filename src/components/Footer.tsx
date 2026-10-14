import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, Clock, Mail } from "lucide-react";
import { BRAND, SOCIAL_LINKS } from "../content/landing";
import emblemImg from "../assets/emblem-transparent-sm.webp";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="shell frame relative pt-20 pb-12 border-t border-line">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pb-16 border-b border-line">
        {/* Left Column: Brand & Mission */}
        <div className="lg:col-span-5">
          <a
            href="#overview"
            className="inline-flex items-center gap-2.5 text-2xl font-bold font-display text-ink tracking-tight mb-4 group"
            aria-label="Ethixweb top"
          >
            <img
              src={emblemImg}
              alt="Ethixweb logo"
              className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              width={28}
              height={31}
              loading="lazy"
              decoding="async"
            />
            <span className="flex items-center">
              <span>{BRAND.name}</span>
              <span className="text-accent ml-0.5">.</span>
            </span>
          </a>
          <p className="max-w-sm text-sm text-ink-2 leading-relaxed">
            Revamp your online operations with bespoke engineering crafted for your business growth. We run the tech. You run the business.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center justify-center rounded-full border border-line bg-paper px-3.5 text-xs font-mono text-steel hover:border-accent hover:text-ink transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Center Column: Contact Information */}
        <div className="lg:col-span-4">
          <h4 className="measure text-steel uppercase mb-4">Direct Contact</h4>
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-start gap-2.5">
              <Building2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <span>
                Ethixweb USA LLC
                <br />
                <span className="text-xs text-steel font-mono">
                  Registered in Wyoming, United States · Kent, WA
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:text-accent transition-colors font-mono text-xs"
              >
                {BRAND.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-accent shrink-0" />
              <span className="text-xs font-mono text-steel">{BRAND.hours}</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Fast Jump & Schedule */}
        <div className="lg:col-span-3">
          <h4 className="measure text-steel uppercase mb-4">Navigation</h4>
          <ul className="space-y-2 text-xs font-mono text-ink-2">
            <li>
              <Link to="/services" className="hover:text-accent transition-colors">
                Full Service Catalog (22 Capabilities)
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent transition-colors">
                The India Expansion Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent transition-colors">
                Direct Enquiry & Consultation Desk
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-accent transition-colors text-steel">
                Admin Leads CRM (Passkey Protected)
              </Link>
            </li>
            <li>
              <a href="/#the-build" className="hover:text-accent transition-colors">
                The Build Architecture
              </a>
            </li>
            <li>
              <a href="/#work" className="hover:text-accent transition-colors">
                Selected Case Studies
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-steel">
        <p>© {CURRENT_YEAR} Ethixweb USA LLC. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <a
            href={BRAND.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-ink hover:text-accent transition-colors font-semibold"
          >
            <span>Book an appointment</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </a>
        </div>
      </div>
    </footer>
  );
}
