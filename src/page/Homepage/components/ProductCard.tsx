import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SkeletonLoader } from "./SkeletonAmevis";

interface ProductCardProps {
  name: string;
  brand: string;
  price: string;
  image: string;
  category: string;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  onViewDetails: () => void;
  onAddToCart: () => void;
}

export function ProductCard({
  name,
  brand,
  price,
  image,
  onViewDetails,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card
      className="group overflow-hidden gap-0 bg-gradient-to-b bgu-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#C9A14A]/40 hover:border-[#C9A14A] hover:shadow-2xl hover:shadow-[#C9A14A]/50 transition-all duration-500 rounded-none cursor-pointer relative"
      onClick={onViewDetails}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#C9A14A]/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="relative overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Subtle gradient overlay at bottom for text readability */}
        {/*<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>*/}
      </div>

      <CardContent className="sm:p-3 sm:pb-0 lg:p-2 lg:pb-0 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] relative pt-[10px] pr-[10px] pb-[0px] pl-[10px]">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A14A]/50 to-transparent"></div>

        {/* Brand and Name - Fixed at top */}
        <div className="mb-2 lg:mb-1.5">
          <p className="text-[#C9A14A] text-[10px] uppercase tracking-widest mb-0.5 underline">
            {brand}
          </p>
          <h3 className="text-white transition-colors duration-300 leading-tight text-sm">
            {name}
          </h3>
        </div>

        {/* Price and Button - Fixed at bottom */}
        <div className="space-y-1.5 lg:space-y-1 mt-2 lg:mt-1.5">
          {/* Price with decorative elements */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A14A]/30"></div>
            <p className="text-[#C9A14A] tracking-wider text-xs lg:text-sm">
              {price}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A14A]/30"></div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            size="sm"
            className="w-full bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] text-black h-7 lg:h-8 rounded-none uppercase tracking-wider text-[10px] shadow-lg shadow-[#C9A14A]/20 hover:shadow-[#C9A14A]/40 transition-all duration-300"
          >
            <ShoppingCart className="h-3 w-3 mr-1.5" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
