import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar, Users } from "lucide-react";
import { cn } from "../lib/utils";

const heroImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000", // Luxury wedding setup
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=2000", // Banquet hall
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2000"  // Event outdoor
];

const defaultExperienceImages = [
  { id: 1, title: "GRAND DECOR", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "MAJESTIC LAWNS", src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "LUXURY SUITES", src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=1000" }
];

const venues = [
  { id: 1, name: "LARGE OUTDOOR LAWN", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, name: "INDOOR BANQUET", img: "https://images.unsplash.com/photo-1533142275466-993d9ce44fcd?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, name: "4 GUEST ROOMS", img: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, name: "AMPLE PARKING", img: "https://images.unsplash.com/photo-1505368585489-0ae6b8fdb21d?auto=format&fit=crop&q=80&w=1000" }
];

const services = [
  { num: "01", title: "CATERING", desc: "Premium Veg starting at ₹1800-₹2000 per plate. In-house & outside catering flexibility." },
  { num: "02", title: "DECORATION", desc: "Full customization. In-house decorators available, or bring your own experts." },
  { num: "03", title: "ENTERTAINMENT", desc: "Premium DJ and music options. Late-night celebrations and firecrackers accommodated." },
  { num: "04", title: "ACCOMMODATION", desc: "Comfortable guest rooms for bridal preparation and family stays." }
];

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [images, setImages] = useState(heroImages);
  const [expImages, setExpImages] = useState(defaultExperienceImages);
  const [venueImages, setVenueImages] = useState(venues);
  const [bannerImg, setBannerImg] = useState("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000");
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(newImages);
      setCurrentHero(0);
    }
  };

  const handleExpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setExpImages(prev => prev.map((item, idx) => ({
        ...item,
        src: files[idx] ? URL.createObjectURL(files[idx]) : item.src
      })));
    }
  };

  const handleVenueUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setVenueImages(prev => prev.map((item, idx) => ({
        ...item,
        img: files[idx] ? URL.createObjectURL(files[idx]) : item.img
      })));
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="w-full">
      {/* 1. Dynamic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-richblack">
        {/* Custom Photo Upload Button */}
        <label className="absolute top-28 right-4 md:right-10 z-20 bg-black/40 text-cream px-4 py-2 text-xs tracking-widest uppercase border border-white/20 hover:bg-gold-500 hover:border-gold-500 transition-all cursor-pointer backdrop-blur-sm group">
          <span className="group-hover:scale-105 inline-block transition-transform">Upload Photos</span>
          <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload} />
        </label>

        <AnimatePresence mode="sync">
          <motion.img
            key={currentHero}
            src={images[currentHero]}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
            alt="Venue luxury"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        
        {/* Floating Hero Content */}
        <div className="absolute inset-x-0 bottom-0 md:bottom-12 md:top-auto md:left-10 md:right-auto z-10 flex flex-col justify-end pb-28 md:pb-0 px-4 md:px-0 pointer-events-none">
          <div className="md:bg-white/10 md:backdrop-blur-md md:border border-white/20 p-0 md:p-8 max-w-lg mx-auto md:mx-0 w-full flex flex-col items-center md:items-start pointer-events-auto">
            
            {/* Animated Heading */}
            <div className="mb-2 md:mb-4 text-center md:text-left overflow-hidden">
               <motion.span 
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className="block text-cream text-[8.5vw] sm:text-4xl md:text-5xl font-serif tracking-widest uppercase leading-tight drop-shadow-2xl md:drop-shadow-none"
               >
                 Where Celebrations
               </motion.span>
               <motion.span 
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                 className="block text-gold-500 md:text-cream text-[9vw] sm:text-4xl md:text-5xl font-serif tracking-widest uppercase leading-tight drop-shadow-2xl md:drop-shadow-none mt-2 md:mt-0"
               >
                 Become Grand
               </motion.span>
            </div>

            {/* Desktop Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-cream/90 text-sm tracking-wide font-sans leading-relaxed text-left hidden md:block"
            >
              CRS Farm House is a premium event venue in Meerut, offering a perfect combination of spacious lawns, elegant banquet setup, and modern facilities. Ideal for weddings, receptions, and grand celebrations.
            </motion.p>
            
            {/* Mobile Animated Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="mt-12 md:hidden w-full max-w-[240px] mx-auto"
            >
              <button 
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden text-cream border border-gold-500/50 bg-black/20 backdrop-blur-md px-6 py-4 uppercase tracking-[0.2em] text-[10px] sm:text-xs w-full flex items-center justify-center gap-3 group rounded-full shadow-2xl"
              >
                <div className="absolute inset-0 w-0 bg-gold-500 transition-all duration-[600ms] ease-out group-hover:w-full"></div>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-richblack font-semibold">Book Event</span>
                <span className="relative z-10 w-8 h-[1px] bg-gold-400 group-hover:bg-richblack transition-all"></span>
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-4 md:right-10 z-10 hidden sm:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-end text-right">
            <p className="text-gold-500 font-sans tracking-[0.2em] text-xs uppercase mb-2">Plan Your Event</p>
            <button className="text-cream border border-gold-500 px-6 py-3 uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300 hover:scale-[1.03] active:scale-95">
              Book Your Event
            </button>
          </div>
        </div>
      </section>

      {/* 2. Cinematic Experience (Videos -> Images) */}
      <section className="py-24 bg-cream relative">
        {/* Custom Photo Upload Button for Experience Section */}
        <label className="absolute top-4 right-4 z-20 bg-richblack text-cream px-4 py-2 text-xs tracking-widest uppercase border border-gold-500 hover:bg-gold-500 transition-all cursor-pointer shadow-md group">
          <span className="group-hover:scale-105 inline-block transition-transform">Upload Experiences</span>
          <input type="file" hidden multiple accept="image/*" onChange={handleExpUpload} />
        </label>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-gold-500 tracking-[0.3em] text-sm uppercase mb-4 font-semibold">The Experience</h3>
            <h2 className="text-3xl md:text-5xl font-serif text-richblack">CINEMATIC GRANDEUR</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expImages.map((img) => (
              <div key={img.id} className="relative group overflow-hidden aspect-[4/5] bg-black">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h4 className="text-white font-serif tracking-widest text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-center px-4">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Panoramic Venue Array */}
      <section className="w-full bg-richblack pt-20 pb-0 overflow-hidden relative">
        {/* Custom Photo Upload Button for Venues */}
        <label className="absolute top-4 right-4 z-20 bg-cream/10 text-cream px-4 py-2 text-xs tracking-widest uppercase border border-white/20 hover:bg-gold-500 hover:border-gold-500 transition-all cursor-pointer backdrop-blur-sm group shadow-md">
          <span className="group-hover:scale-105 inline-block transition-transform">Upload Venues</span>
          <input type="file" hidden multiple accept="image/*" onChange={handleVenueUpload} />
        </label>
        
        <div className="text-center mb-16 px-4">
           <h3 className="text-gold-500 tracking-[0.3em] text-sm uppercase mb-4 font-semibold">Spaces</h3>
           <h2 className="text-3xl md:text-5xl font-serif text-cream">OUR VENUES</h2>
        </div>
        <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh]">
          {venueImages.map((venue) => (
            <div key={venue.id} className="relative flex-1 group overflow-hidden border-r border-white/10 last:border-0 border-b md:border-b-0 cursor-pointer">
              <img 
                src={venue.img} 
                alt={venue.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-white font-serif tracking-[0.15em] text-lg lg:text-xl uppercase transition-transform duration-500 group-hover:-translate-y-2">
                  {venue.name}
                </h4>
                <div className="h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-700 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Business/Corporate Banner */}
      <section className="py-24 bg-cream px-4 relative">
        {/* Banner Upload Button */}
        <label className="absolute top-4 right-4 z-20 bg-cream/80 text-richblack px-4 py-2 text-xs tracking-widest uppercase border border-richblack/20 hover:bg-gold-500 hover:text-cream hover:border-gold-500 transition-all cursor-pointer backdrop-blur-sm group shadow-md">
          <span className="group-hover:scale-105 inline-block transition-transform">Upload Corporate Banner</span>
          <input type="file" hidden accept="image/*" onChange={handleBannerUpload} />
        </label>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto relative"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img 
              src={bannerImg} 
              alt="Corporate events" 
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000 origin-center hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating Text Box */}
          <div className="bg-richblack text-cream p-8 sm:p-10 md:p-16 relative md:absolute md:-bottom-12 md:right-12 mt-[-4rem] md:mt-0 mx-4 md:mx-0 max-w-xl shadow-2xl border border-white/10 z-10 text-center md:text-left">
             <h3 className="text-gold-500 tracking-[0.3em] text-xs uppercase mb-3 md:mb-4">Capacity 1000-1200 Guests</h3>
             <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 md:mb-6 leading-tight">CREATE YOUR PERFECT WEDDING EXPERIENCE</h2>
             <p className="text-cream/70 font-sans tracking-wide text-xs sm:text-sm mb-6 md:mb-8 leading-relaxed">
               Celebrate your vows in our expansive layouts featuring a combination of a large outdoor lawn and an elegant indoor banquet hall. Perfectly positioned in Meerut for premium gatherings.
             </p>
             <button className="uppercase tracking-[0.2em] text-xs sm:text-sm border-b border-gold-500 pb-1 hover:text-gold-500 hover:scale-[1.05] inline-block transition-all duration-300 origin-center md:origin-left">
               Explore Packages
             </button>
          </div>
        </motion.div>
      </section>

      {/* spacer to accommodate the floating box on smaller screens */}
      <div className="h-10 md:h-12 bg-[#F5F1E6]" />

      {/* 5. Wedding Services */}
      <section className="py-24 bg-[#F5F1E6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-gold-500 tracking-[0.3em] text-sm uppercase mb-4 font-semibold">Services</h3>
            <h2 className="text-3xl md:text-5xl font-serif text-richblack">CURATED OFFERINGS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
            {services.map((srv, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                key={srv.num} 
                className="group relative"
              >
                <div className="text-6xl md:text-8xl font-serif text-black/5 absolute -top-8 -left-4 z-0 pointer-events-none transition-colors group-hover:text-gold-500/10">
                  {srv.num}
                </div>
                <div className="relative z-10 pt-4 border-t border-richblack/20 group-hover:border-gold-500 transition-colors">
                  <h4 className="text-lg tracking-[0.15em] font-serif uppercase text-richblack mb-4 group-hover:text-gold-500 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-richblack/60 font-sans text-sm leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Booking Form */}
      <section id="booking-form" className="py-32 relative bg-richblack flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&q=80&w=2000"
          alt="booking background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 w-full max-w-lg px-4">
          <div className="bg-cream border border-richblack/10 p-10 md:p-14 shadow-2xl">
            <h3 className="text-gold-500 tracking-[0.3em] text-sm uppercase mb-4 font-semibold text-center">Inquire Now</h3>
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-10 text-richblack">RESERVE YOUR DATE</h2>
            
            <form onSubmit={handleBookSubmit} className="space-y-6">
              <div>
                 <input type="text" required placeholder="FULL NAME" className="w-full bg-transparent border-b border-richblack/20 text-richblack py-3 pl-2 tracking-widest text-sm focus:outline-none focus:border-gold-500 transition-colors placeholder:text-richblack/40" />
              </div>
              <div className="flex items-center border-b border-richblack/20 pb-2 focus-within:border-gold-500 transition-colors">
                 <input type="tel" required placeholder="PHONE NUMBER" className="w-full bg-transparent py-2 pl-2 tracking-widest text-sm focus:outline-none text-richblack placeholder:text-richblack/40" />
              </div>
              <div className="flex items-center border-b border-richblack/20 pb-2 focus-within:border-gold-500 transition-colors relative">
                 <Users className="absolute right-2 text-gold-500" size={18} />
                 <select required defaultValue="" className="w-full bg-transparent py-2 pl-2 tracking-widest text-sm focus:outline-none text-richblack appearance-none cursor-pointer">
                    <option value="" disabled className="text-richblack">EVENT TYPE</option>
                    <option value="wedding" className="text-richblack block">WEDDING</option>
                    <option value="corporate" className="text-richblack block">CORPORATE</option>
                    <option value="party" className="text-richblack block">GALA / PARTY</option>
                 </select>
              </div>
              <div className="flex items-center border-b border-richblack/20 pb-2 focus-within:border-gold-500 transition-colors relative">
                 <Calendar className="absolute right-2 text-gold-500" size={18} />
                 <input type="date" required className="w-full bg-transparent py-2 pl-2 tracking-widest text-sm focus:outline-none text-richblack cursor-pointer uppercase [&::-webkit-calendar-picker-indicator]:opacity-0" />
              </div>
              
              <button 
                disabled={formState !== 'idle'}
                type="submit" 
                className="w-full h-14 bg-gold-500 hover:bg-gold-600 text-cream uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center mt-8 disabled:opacity-80 hover:shadow-lg shadow-gold-500/20"
              >
                {formState === 'idle' && "SUBMIT INQUIRY"}
                {formState === 'submitting' && (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                )}
                {formState === 'success' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check size={24} />
                  </motion.div>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
