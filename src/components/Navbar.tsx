import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled && !mobileMenuOpen
            ? "bg-cream/95 backdrop-blur-md border-b border-richblack/10 py-4 shadow-sm"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-serif tracking-widest uppercase flex items-center gap-2 group z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-gold-500 group-hover:text-gold-600 transition-colors">CRS</span>
            <span className={cn("transition-colors", isScrolled || mobileMenuOpen ? "text-richblack" : "text-cream leading-tight")}>Farm House</span>
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
          <div className="md:hidden flex items-center gap-4 z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("p-2 transition-colors", isScrolled || mobileMenuOpen ? "text-richblack" : "text-cream")}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream flex flex-col justify-center items-center px-4"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="w-full text-center"
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl md:text-4xl font-serif tracking-widest uppercase transition-colors flex items-center justify-center gap-4 group",
                      location.pathname === link.path ? "text-gold-500" : "text-richblack hover:text-gold-500"
                    )}
                  >
                    {location.pathname === link.path && <ArrowRight className="text-gold-500 h-6 w-6" />}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 w-full"
              >
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-cream px-8 py-4 rounded-none text-sm tracking-[0.2em] uppercase font-medium transition-all w-full"
                >
                  <Phone size={18} />
                  Call to Book
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
