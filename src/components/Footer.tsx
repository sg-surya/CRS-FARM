import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-richblack text-cream border-t border-cream/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif tracking-widest text-gold-500 uppercase">CRS Farm House</h2>
            <p className="text-cream/70 leading-relaxed font-sans max-w-sm">
              Elegance, Space, and Celebration — All in One Place. The premium wedding and event venue in Meerut.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-cream/20 hover:border-gold-500 hover:text-gold-500 hover:scale-110 active:scale-95 transition-all duration-300 rounded-none inline-block">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 border border-cream/20 hover:border-gold-500 hover:text-gold-500 hover:scale-110 active:scale-95 transition-all duration-300 rounded-none inline-block">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 border border-cream/20 hover:border-gold-500 hover:text-gold-500 hover:scale-110 active:scale-95 transition-all duration-300 rounded-none inline-block">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-sans tracking-[0.3em] text-gold-500 uppercase">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Events', 'Gallery', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="inline-block text-cream/70 hover:text-gold-500 hover:translate-x-1 transition-all duration-300 text-sm tracking-wider"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-sans tracking-[0.3em] text-gold-500 uppercase">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <MapPin className="text-gold-500 shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300" size={20} />
                <span className="text-cream/70 text-sm leading-relaxed tracking-wider transition-colors group-hover:text-gold-100">
                  Pooth Khas, Near Rohta Road<br />
                  Meerut, Uttar Pradesh
                </span>
              </li>
              <li className="flex gap-4 items-center group">
                <Phone className="text-gold-500 shrink-0 transition-transform group-hover:scale-110 duration-300" size={20} />
                <a href="tel:+1234567890" className="text-cream/70 hover:text-gold-500 hover:translate-x-1 transition-all duration-300 text-sm tracking-wider tracking-widest inline-block">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex gap-4 items-center group">
                <Mail className="text-gold-500 shrink-0 transition-transform group-hover:scale-110 duration-300" size={20} />
                <a href="mailto:info@crsfarmhouse.com" className="text-cream/70 hover:text-gold-500 hover:translate-x-1 transition-all duration-300 text-sm tracking-wider tracking-widest inline-block">
                  info@crsfarmhouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-cream/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-xs tracking-widest uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} CRS Farm House. All rights reserved.
          </p>
          <p className="text-cream/50 text-xs tracking-widest uppercase text-center">
            Built by <a href="https://vasudev.online" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-600 transition-colors hover:underline">Vasudev AI</a>
          </p>
          <div className="flex gap-6 text-cream/50 text-xs tracking-widest uppercase justify-center md:justify-end">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
