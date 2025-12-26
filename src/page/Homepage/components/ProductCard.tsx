import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageProductsFallback } from "@/page/Homepage/components/ui/ImageProductFallback";
import { convertCurrencyStringToFloat } from "@/utils/convertCurrencyStringToFloat";

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
  const isOriginal = convertCurrencyStringToFloat(price) === 250;
  return (
    <Card
      className="group overflow-hidden gap-0 py-0 bg-gradient-to-b bgu-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#8D021F]/40 hover:border-[#8D021F] hover:shadow-2xl hover:shadow-[#8D021F]/50 transition-all duration-500 rounded-none cursor-pointer relative"
      onClick={onViewDetails}
    >
      {isOriginal && (
        <div className="absolute top-2 left-2 bg-[#8D021F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10 shadow-md">
          ORIGINAL
        </div>
      )}
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8D021F]/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div className="image-container relative overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
        <ImageProductsFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-center"
        />

        {/* Subtle gradient overlay at bottom for text readability */}
        {/*<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>*/}
      </div>

      <CardContent className="sm:p-3 sm:pb-3 sm:pt-2 lg:p-2 lg:pb-2 lg:pt-1.5 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] relative p-0 pt-[6px] pr-[10px] pb-[10px] pl-[10px] flex flex-col min-h-[120px]">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8D021F]/50 to-transparent"></div>

        {/* Brand and Name - Fixed at top */}
        <div className="mb-2 lg:mb-1.5 flex-grow">
          <p className="text-[#FF4D4D] text-[10px] uppercase tracking-widest mb-0.5">
            {brand}
          </p>
          <h3 className="text-white transition-colors duration-300 leading-tight text-sm">
            {name}
          </h3>
        </div>

        {/* Price and Button - Fixed at bottom */}
        <div className="space-y-1.5 lg:space-y-1 mt-auto">
          {/* Price with decorative elements */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8D021F]/30"></div>
            <p className="text-[#FF4D4D] tracking-wider text-xs lg:text-sm">
              {price}
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8D021F]/30"></div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            size="sm"
            className="w-full bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] text-white h-7 lg:h-8 rounded-none uppercase tracking-wider text-[10px] shadow-lg shadow-[#8D021F]/20 hover:shadow-[#8D021F]/40 transition-all duration-300"
          >
            <ShoppingCart className="h-3 w-3 mr-1.5" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}