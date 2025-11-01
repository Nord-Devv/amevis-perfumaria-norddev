import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { ProductCard } from "./ProductCard";
import { useCatalog } from "@/hooks/useCatalog";
import { useSelectedProductStore } from "@/store/useSelectedProductStore";

interface sectionCatalogProps {
  toggleDialog: (open: boolean) => void;
}
export const SectionCatalog = ({ toggleDialog }: sectionCatalogProps) => {

  const { filteredProducts, productTypes, selectedCategory, selectedSubcategory, selectedType, showFilters, subcategories,
    handleAddToCart, handleCategoryChange, handleProductTypeChange, handleSubcategoryToggle, setShowFilters, setVisibleProducts, visibleProducts } = useCatalog();
  const { openProduct } = useSelectedProductStore();


  return (<>
    <section
      id="catalog"
      className="py-24 px-4 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Decorative top line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent w-32"></div>
            <div className="w-2 h-2 bg-[#C9A14A] rotate-45 mx-4"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent w-32"></div>
          </div>

          <h2 className="text-5xl text-white mb-4 tracking-tight">
            Nosso Catálogo
          </h2>
          <p className="text-[#C9A14A]/80 tracking-wide uppercase text-sm">
            Explore nossa coleção de fragrâncias de luxo
          </p>

          {/* Decorative bottom line */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A]/50 to-transparent w-24"></div>
          </div>
        </div>

        {/* Main Category Tabs */}
        <div className="flex justify-center mb-6">
          <Tabs
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            className="w-full max-w-3xl"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border border-[#C9A14A]/30 p-1 rounded-none h-12">
              <TabsTrigger
                value="Perfumaria"
                className="text-[#C9A14A]/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase tracking-wider text-[14px] rounded-none transition-colors duration-200"
              >
                Perfumaria
              </TabsTrigger>
              <TabsTrigger
                value="Maquiagem"
                className="text-[#C9A14A]/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase text-[14px] tracking-wider rounded-none transition-colors duration-200"
              >
                Maquiagem
              </TabsTrigger>
              <TabsTrigger
                value="Autocuidado"
                className="text-[#C9A14A]/70 text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase tracking-wider text-[14px] rounded-none transition-colors duration-200"
              >
                Autocuidado
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Botão Exibir Filtros */}
        {(productTypes.length > 0 ||
          subcategories.length > 0) && (
            <div className="flex justify-center mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] hover:from-[#3A3A3A] hover:to-[#2A2A2A] border border-[#C9A14A]/30 text-[#C9A14A] px-8 py-3 rounded-none uppercase tracking-widest text-xs transition-all duration-300 flex items-center gap-2"
              >
                {showFilters ? (
                  <>
                    Ocultar Filtros
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Exibir Filtros
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}

        {/* Product Type Tabs (2nd level - Body Splash, Brand Collection) */}
        <AnimatePresence>
          {showFilters && productTypes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col items-center gap-3 mb-6">
                <Tabs
                  value={selectedType}
                  onValueChange={handleProductTypeChange}
                  className="w-full max-w-2xl"
                >
                  {/* Primeira linha - TODOS (grande) */}
                  <div className="flex justify-center mb-3">
                    <TabsList className="bg-transparent border-0 p-0">
                      <TabsTrigger
                        value="Todos"
                        className="min-w-[280px] px-6 py-3 bg-transparent border border-[#8B7355]/20 text-[#8B7355]/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B7355]/40 data-[state=active]:via-[#C9A14A]/30 data-[state=active]:to-[#8B7355]/40 data-[state=active]:text-[#C9A14A] data-[state=active]:border-[#C9A14A]/60 uppercase tracking-wider text-xs sm:text-sm rounded-none transition-all duration-300 hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                      >
                        Todos
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Segunda linha - Body Splash / Brand */}
                  <div className="flex justify-center">
                    <TabsList className="flex gap-2 bg-transparent border-0 p-0">
                      {productTypes
                        .filter((type) => type !== "Todos")
                        .map((type) => (
                          <TabsTrigger
                            key={type}
                            value={type}
                            className="px-5 py-2 bg-transparent border border-[#8B7355]/20 text-[#8B7355]/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B7355]/40 data-[state=active]:via-[#C9A14A]/30 data-[state=active]:to-[#8B7355]/40 data-[state=active]:text-[#C9A14A] data-[state=active]:border-[#C9A14A]/60 uppercase tracking-wider text-[10px] sm:text-xs rounded-none transition-all duration-300 whitespace-nowrap hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                          >
                            {type}
                          </TabsTrigger>
                        ))}
                    </TabsList>
                  </div>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gender/Subcategory Toggle Buttons (3rd level - seleção múltipla) */}
        <AnimatePresence>
          {showFilters && subcategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                delay: productTypes.length > 0 ? 0.1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col items-center gap-3 mb-10">
                <div className="flex justify-center">
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                    {subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        onClick={() =>
                          handleSubcategoryToggle(subcategory)
                        }
                        variant="outline"
                        className={`min-w-[80px] px-4 py-2 border rounded-none transition-all duration-300 uppercase tracking-wider text-[10px] sm:text-xs ${selectedSubcategory.includes(
                          subcategory,
                        )
                          ? "bg-gradient-to-r from-[#8B7355]/40 via-[#C9A14A]/30 to-[#8B7355]/40 text-[#C9A14A] border-[#C9A14A]/60"
                          : "bg-transparent border-[#8B7355]/20 text-[#8B7355]/50 hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                          }`}
                      >
                        {subcategory}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-[1.125rem]">
            {filteredProducts
              .slice(0, visibleProducts)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onViewDetails={() =>
                    openProduct(product)
                  }
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
          </div>

          {/* Load More Button */}
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
        </div>
      </div>
    </section>

  </>)
}
