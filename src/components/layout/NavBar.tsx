import { useState, useEffect } from "react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-300 ${
        scrolled
          ? "bg-navy border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <a href="#" className="font-display text-cream text-xl tracking-wide">
          Ferova <span className="text-gold/80 text-base font-body font-light">/ AGENCY</span>
        </a>

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
