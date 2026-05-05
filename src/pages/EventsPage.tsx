import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const defaultEvents = [
  {
    id: 1,
    title: "WEDDINGS & ENGAGEMENTS",
    subtitle: "A union of souls in boundless luxury",
    desc: "Experience the magic of your special day in our large open lawn that perfectly frames grand weddings. Capable of hosting 1000+ guests gracefully with flexible catering and complete customization.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 2,
    title: "OPULENT RECEPTIONS",
    subtitle: "An unforgettable night of celebration",
    desc: "Raise a toast to new beginnings beneath crystal chandeliers in our elegant Indoor Banquet. Perfect for late-night events and lavish dining, with ample parking and accessibility.",
    img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: 3,
    title: "CORPORATE & FAMILY FUNCTIONS",
    subtitle: "Where prestige meets celebration",
    desc: "From birthday parties to large-scale corporate functions, our venue provides the ultimate indoor + outdoor flexibility. Prime location on Rohta Road with excellent hospitality.",
    img: "https://images.unsplash.com/photo-1515169067868-5387dbce214f?auto=format&fit=crop&q=80&w=2000"
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState(defaultEvents);

  const handleEventUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setEvents(prev => prev.map((item, idx) => ({
        ...item,
        img: files[idx] ? URL.createObjectURL(files[idx]) : item.img
      })));
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-cream relative">
      
      {/* Custom Photo Upload Button for Events */}
      <label className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-richblack text-cream px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs tracking-widest uppercase border border-gold-500 hover:bg-gold-500 transition-all cursor-pointer shadow-2xl group flex items-center justify-center rounded-none backdrop-blur-md">
        <span className="group-hover:scale-105 inline-block transition-transform">Upload Event Photos</span>
        <input type="file" hidden multiple accept="image/*" onChange={handleEventUpload} />
      </label>

      {/* Page Header */}
      <div className="py-16 md:py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-gold-500 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase mb-3 sm:mb-4 font-semibold">Exquisite Gatherings</h3>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-richblack uppercase tracking-widest">Our Events</h1>
          <div className="w-16 sm:w-24 h-px bg-gold-500 mx-auto mt-6 sm:mt-8" />
        </motion.div>
      </div>

      {/* Events ZigZag */}
      <div className="max-w-7xl mx-auto px-4 pb-24 md:pb-32">
        {events.map((ev, idx) => {
          const isEven = idx % 2 === 1; // 0 index = left image, 1 index = right image (isEven = true)
          return (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              key={ev.id} 
              className={cn("flex flex-col gap-8 sm:gap-12 md:gap-20 items-center mb-20 sm:mb-32 last:mb-0", isEven ? "md:flex-row-reverse" : "md:flex-row")}
            >
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 overflow-hidden aspect-square sm:aspect-[4/3] group relative bg-black">
                <img 
                  src={ev.img} 
                  alt={ev.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Side */}
              <div className={cn("w-full md:w-1/2 flex flex-col justify-center text-center md:text-left", isEven ? "md:pr-12 lg:pr-24" : "md:pl-12 lg:pl-24")}>
                <h3 className="text-gold-500 tracking-[0.2em] lg:tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3 md:mb-4">{ev.subtitle}</h3>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-richblack mb-4 sm:mb-6 tracking-wide leading-tight">
                  {ev.title}
                </h2>
                <p className="text-richblack/70 font-sans leading-relaxed tracking-wide text-xs sm:text-sm mb-8 sm:mb-10 max-w-md mx-auto md:mx-0">
                  {ev.desc}
                </p>
                <div>
                   <button className="uppercase tracking-[0.2em] text-xs sm:text-sm text-richblack border-b border-gold-500 pb-2 hover:text-gold-500 hover:border-gold-600 transition-all duration-300 hover:translate-x-2 inline-block">
                     Enquire Now
                   </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    
    </div>
  );
}
