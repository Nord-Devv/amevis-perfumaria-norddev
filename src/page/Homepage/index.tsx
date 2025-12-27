

import { Header } from "@/components/layout/Header";
import { ProductDialog } from "@/page/Homepage/components/features/ProductDialog";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { ParticlesEffect } from "@/page/Homepage/components/ui/particlesEffect";
import { Toaster } from "@/components/ui/sonner";

import { Footer } from "@/components/layout/footer";
import { CarouselGallery } from "@/page/Homepage/components/features/carouselGallery";

import { useSelectedProductStore } from "@/store/useSelectedProductStore";
import { SectionCatalog } from "@/page/Homepage/components/SectionCatalog";

import imageHome from "@/assets/foto header.webp";

export function HomePage() {
  const selectedProduct = useSelectedProductStore().product;

  return (
    <div className="min-h-screen bg-white">
      <Header
      />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-0 pb-0 px-0 relative min-h-screen flex items-center bg-[radial-gradient(ellipse_at_center,#1a1a1a_0%,#000_70%)] overflow-hidden"
      >
        {/* Particles */}
        <ParticlesEffect />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={imageHome}
            alt="Luxury Perfume"
            className="w-full min-h-[calc(100vh-150px)] object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70 bg-blend-overlay md:bg-black/40"></div>
        </div>

        <div className="container relative w-full z-10 px-[10px] py-[0px] mx-[20px] my-[0px] m-[0px]">
          <div className="flex flex-col justify-center md:grid md:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="md:text-6xl text-white tracking-tight leading-tight font-[Noto_Serif_Display] text-[50px]">
                PERFUMES DE LUXO
              </h2>
              <p className="text-gray-200 max-w-[310px] leading-relaxed text-[16px]">
                Descubra aromas que refletem elegância e
                sutileza, com notas inspiradas na perfumaria
                árabe e internacional.
              </p>
              <Button
                onClick={() =>
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] shadow-lg shadow-[#8D021F]/20 hover:shadow-[#8D021F]/40 text-white px-10 mt-[40px] py-6 transition-all duration-300 rounded-none uppercase tracking-wider"
              >
                Ver Catálogo
              </Button>
            </div>

            {/* Right side - empty to let background image show */}
            <div></div>
          </div>
        </div>
      </section>

      <SectionCatalog />
      {/* Luxury Gallery Section - Fast Upward Carousel */}
      <CarouselGallery />

      {/* Product Dialog */}
      {selectedProduct && (
        <ProductDialog
          open={!!selectedProduct}
          product={selectedProduct}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Toaster */}
      <Toaster />
    </div>
  )
}

