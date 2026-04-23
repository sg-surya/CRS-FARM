import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "HOME", path: "/" },
    { name: "EVENTS", path: "/events" },
    { name: "GALLERY", path: "/gallery" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-richblack/10 py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-widest uppercase flex items-center gap-2 group">
          <span className="text-gold-500 group-hover:text-gold-600 transition-colors">CRS</span>
          <span className={cn("transition-colors", isScrolled ? "text-richblack" : "text-cream leading-tight")}>Farm House</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative text-sm font-medium tracking-[0.2em] transition-all duration-300 hover:text-gold-500 hover:scale-105 active:scale-95 inline-block",
                isScrolled ? "text-richblack/90" : "text-cream/90 hover:text-gold-500",
                location.pathname === link.path && "text-gold-500 font-semibold"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-cream px-6 py-2 rounded-none text-sm tracking-[0.1em] font-medium transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-lg shadow-gold-500/20"
          >
            <Phone size={16} />
            CALL US
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn("p-2", isScrolled ? "text-richblack" : "text-cream")}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-b border-richblack/10 p-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm tracking-[0.2em] p-2 hover:text-gold-500",
                location.pathname === link.path ? "text-gold-500 font-semibold" : "text-richblack"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+1234567890"
            className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-cream px-6 py-3 rounded-none text-sm tracking-[0.1em] font-medium transition-colors mt-2"
          >
            <Phone size={16} />
            CALL US
          </a>
        </div>
      )}
    </nav>
  );
}
