

import { Header } from "@/components/layout/Header";
import { ProductDialog } from "@/page/Homepage/components/ProductDialog";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Toaster } from "@/components/ui/sonner";

import { Footer } from "@/components/layout/footer";
import { CarouselGallery } from "@/components/features/carouselGallery";

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
        className="pt-0 pb-0 px-0 relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={imageHome}
            alt="Luxury Perfume"
            className="w-full min-h-screen object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70 bg-blend-overlay md:bg-black/40"></div>
        </div>

        <div className="container relative w-full z-10 px-[10px] py-[0px] mx-[20px] my-[0px] m-[0px]">
          <div className="grid grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="md:text-6xl text-white tracking-tight leading-tight font-[Noto_Serif_Display] text-[50px]">
                PERFUMES DE LUXO
              </h2>
              <p className="text-gray-200 max-w-md leading-relaxed text-[16px]">
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
                className="bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] shadow-lg shadow-[#C9A14A]/20 hover:shadow-[#C9A14A]/40 text-black px-10 py-6 transition-all duration-300 rounded-none uppercase tracking-wider"
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

