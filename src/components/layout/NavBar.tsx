import { useState } from "react";

const navLinks = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Oportunidad", href: "#oportunidad" },
  { label: "Estrategia", href: "#estrategia" },
  { label: "Planes", href: "#planes" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-md border-b border-gold/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display text-cream text-xl tracking-wide">
          Ferova <span className="text-gold/80 text-base font-body font-light">/ AGENCY</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/70 hover:text-gold font-body text-sm transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#aprobar"
          className="bg-gold text-navy font-body font-semibold px-5 py-2 rounded-md text-sm hover:shadow-card-hover transition-all duration-300"
        >
          Aprobar propuesta →
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
