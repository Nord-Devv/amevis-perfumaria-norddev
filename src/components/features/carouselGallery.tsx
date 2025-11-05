import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import slider1 from '@/assets/slide/slide1.webp';
import slider2 from '@/assets/slide/slide2.webp';
import slider3 from '@/assets/slide/slide3.webp';
import slider4 from '@/assets/slide/slide4.webp';


export function CarouselGallery() {
      const [activeSlide, setActiveSlide] = useState(0);

       // Fast slideshow automation for luxury gallery
        useEffect(() => {
          const totalSlides = 4;
      
          const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % totalSlides);
          }, 2500); // Troca a cada 2.5 segundos
      
          return () => clearInterval(interval);
        }, []);

    return (
        <section className="py-0 overflow-hidden bg-[#1A1A1A] h-96 relative">
            <div className="relative w-full h-full">
                <AnimatePresence initial={false}>
                    {activeSlide === 0 && (
                        <motion.div
                            key="slide-0"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                            className="absolute inset-0 will-change-transform"
                        >
                            <ImageWithFallback
                                src={slider1}
                                alt="Monochromatic Lifestyle"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
                        </motion.div>
                    )}

                    {activeSlide === 1 && (
                        <motion.div
                            key="slide-1"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                            className="absolute inset-0 will-change-transform"
                        >
                            <ImageWithFallback
                                src={slider2}
                                alt="Row of Luxury Perfumes"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
                        </motion.div>
                    )}

                    {activeSlide === 2 && (
                        <motion.div
                            key="slide-2"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                            className="absolute inset-0 will-change-transform"
                        >
                            <ImageWithFallback
                                src={slider3}
                                alt="Red Tones Fragrance"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
                        </motion.div>
                    )}

                    {activeSlide === 3 && (
                        <motion.div
                            key="slide-3"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.8, ease: "linear" }}
                            className="absolute inset-0 will-change-transform"
                        >
                            <ImageWithFallback
                                src={slider4}
                                alt="Golden Perfumes Table"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

