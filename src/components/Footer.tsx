import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight
} from "lucide-react";

interface FooterProps {
  logo?: string;
  companyName?: string;
}

export default function Footer({ 
  logo = "Craftale", 
  companyName = "Craftale Agency" 
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: "Design del Sito", href: "/services/design" },
    { name: "Sviluppo Web", href: "/services/development" },
    { name: "E-commerce", href: "/services/ecommerce" },
    { name: "Manutenzione Web", href: "/services/maintenance" },
    { name: "Ottimizzazione SEO", href: "/services/seo" },
    // { name: "Performance", href: "/services/performance" },
  ];

  const companyLinks = [
    { name: "Chi Siamo", href: "/about" },
    // { name: "Our Team", href: "/team" },
    // { name: "Careers", href: "/careers" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Termini di Servizio", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#", comingSoon: true },
    // { name: "Case Studies", href: "/case-studies" },
    // { name: "Resources", href: "/resources" },
    // { name: "Free Tools", href: "/tools" },
    // { name: "Support Center", href: "/support" },
    // { name: "Documentation", href: "/docs" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  return (
    <footer className="bg-apty-bg-inverse text-apty-text-inverse">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info & CTA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src='/logo.png' 
                alt='Craftale Logo' 
                className='w-8 h-8'
              />
              <span className="text-xl font-bold text-apty-text-inverse">{logo}</span>
            </div>
            
            <p className="text-apty-text-inverse opacity-90 text-sm leading-relaxed max-w-md">
              Creiamo siti moderni orientati alla conversione che generano risultati per attività locali, 
              startup e aziende in crescita. Ottieni più contatti, costruisci fiducia e fai crescere il tuo business online.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {/* <div className="flex items-center space-x-3 text-sm text-color-disabled">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div> */}
              <div className="flex items-center space-x-3 text-sm text-apty-text-inverse opacity-90">
                <Mail className="w-4 h-4 text-apty-text-inverse opacity-90" />
                <a 
                  href="mailto:info@craftale.it" 
                  className="hover:opacity-100 transition-opacity"
                >
                  info@craftale.it
                </a>
              </div>
              {/* <div className="flex items-center space-x-3 text-sm text-color-disabled">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Business Ave, Suite 100, City, ST 12345</span>
              </div> */}
            </div>

            {/* CTA Button */}
            <Button className="bg-gradient-to-r from-apty-primary to-apty-primary/90 hover:from-apty-primary/90 hover:to-apty-primary/80 text-apty-text-on-brand font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Richiedi una Proposta Gratuita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apty-text-inverse">Servizi</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-apty-text-inverse opacity-90 hover:opacity-100 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apty-text-inverse">Azienda</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-apty-text-inverse opacity-90 hover:opacity-100 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-apty-text-inverse">Risorse</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {(link as any).comingSoon ? (
                    <div 
                      className="group inline-flex items-center text-sm text-apty-text-inverse opacity-70 cursor-pointer transition-all"
                    >
                      <span>{link.name}</span>
                      <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-apty-text-inverse/20 text-apty-text-inverse rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-apty-text-inverse/30 group-active:scale-95">
                        Presto
                      </span>
                    </div>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-sm text-apty-text-inverse opacity-90 hover:opacity-100 transition-all"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-color-disabled mb-4">
              Get the latest web design tips, marketing insights, and industry news delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-color-inverse-subtle border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-apty-border-strong bg-apty-bg-inverse">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-apty-text-inverse opacity-90">
              <span>© {currentYear} {companyName}. Tutti i diritti riservati.</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-apty-success rounded-full"></span>
                  <span>SSL Protetto</span>
                </span>
                <span>Google Partner</span>
                <span>98% Soddisfazione Clienti</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-apty-text-inverse/10 hover:bg-apty-primary rounded-full flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4 text-apty-text-inverse" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 