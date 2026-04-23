import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

// Generate random but high-quality placeholder images for the gallery
const defaultGalleryItems = [
  { id: 1, spanClass: "col-span-1 md:col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" }, // Vertical/large
  { id: 2, spanClass: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 3, spanClass: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, spanClass: "col-span-1 md:col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200" }, // Horizontal
  { id: 5, spanClass: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800" },
  { id: 6, spanClass: "col-span-1 row-span-2", img: "https://images.unsplash.com/photo-1541250848049-b4f7141fca3f?auto=format&fit=crop&q=80&w=800" }, // Tall
  { id: 7, spanClass: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" },
];

export default function GalleryPage() {
  const [items, setItems] = useState(defaultGalleryItems);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newItems = Array.from(e.target.files).map((file, idx) => ({
        id: Date.now() + idx,
        // Alternate between standard, vertical, and horizontal dynamically for standard grid filling
        spanClass: idx % 4 === 0 ? "col-span-1 md:col-span-2 row-span-2" : (idx % 3 === 0 ? "col-span-1 md:col-span-2 row-span-1" : "col-span-1 row-span-1"),
        img: URL.createObjectURL(file)
      }));
      setItems(newItems);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-cream pb-32">
      
      {/* Custom Photo Upload Button */}
      <label className="fixed bottom-8 right-8 z-50 bg-richblack text-cream px-6 py-3 text-xs tracking-widest uppercase border border-gold-500 hover:bg-gold-500 transition-all cursor-pointer shadow-2xl group flex items-center justify-center">
        <span className="group-hover:scale-105 inline-block transition-transform">Upload Gallery Photos</span>
        <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload} />
      </label>

      {/* Page Header */}
      <div className="py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-gold-500 tracking-[0.3em] text-sm uppercase mb-4 font-semibold">Captured Moments</h3>
          <h1 className="text-4xl md:text-6xl font-serif text-richblack uppercase tracking-widest">Our Gallery</h1>
          <div className="w-24 h-px bg-gold-500 mx-auto mt-8" />
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {items.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.15 }}
              key={item.id} 
              className={cn("relative group overflow-hidden bg-black", item.spanClass)}
            >
              <img 
                src={item.img} 
                alt="Gallery item"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-70"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-richblack/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-sans tracking-[0.3em] text-xs font-medium uppercase border border-white/50 px-6 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Image
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 text-center">
         <button className="uppercase tracking-[0.2em] text-sm text-richblack border border-richblack/20 px-8 py-4 hover:bg-gold-500 hover:text-cream hover:border-gold-500 transition-all duration-300 hover:scale-[1.03] active:scale-95">
           Load More
         </button>
      </div>
    
    </div>
  );
}
