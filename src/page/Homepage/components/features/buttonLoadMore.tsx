import { Button } from "@/components/ui/button";
import type { Product } from "@/types/Product";

interface ButtonLoadMoreProps {
    visibleProducts: number;
    setVisibleProducts: (value: number | ((prev: number) => number)) => void;
    filteredProducts: Product[];
}

export function ButtonLoadMore({visibleProducts, setVisibleProducts, filteredProducts}: ButtonLoadMoreProps) {
    return (
        <>
            {visibleProducts < filteredProducts.length && (
                <div className="flex justify-center mt-12 mb-8">
                    <Button
                        onClick={() =>
                            setVisibleProducts((prev) => prev + 9)
                        }
                        className="bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] text-black px-12 py-6 rounded-none uppercase tracking-widest shadow-lg shadow-[#C9A14A]/30 hover:shadow-[#C9A14A]/50 transition-all duration-300 relative overflow-hidden group"
                    >
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black/20"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black/20"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black/20"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black/20"></div>

                        <span className="relative z-10">
                            Carregar Mais Produtos
                        </span>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Button>
                </div>
            )}
        </>
    )
}

