import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/Header";
import { ProductCard } from "./components/ProductCard";
import { ProductDialog } from "./components/ProductDialog";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { Button } from "./components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Instagram,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { type CartItem } from "./components/CartDrawer";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import logoAmevi from "./assets/e214b3767302229bb769b749498b0cffbf615395.png";
import {
  ProductStore,
  type Product,
  type ProductInput,
  initializeDefaultProducts,
} from "./admin/productStore";
import { AdminPage } from "./admin/AdminPage";
import { fetchCatalog } from "./services/fetchCatalog";
import { Footer } from "./components/layout/footer";

// Initial products (will be auto-assigned IDs)
const initialProductsData = fetchCatalog();

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] =
    useState<string>("Perfumaria");
  const [productTypeFilter, setProductTypeFilter] =
    useState<string>("Todos"); // Body Splash, Brand
  const [subcategoryFilter, setSubcategoryFilter] = useState<
    string[]
  >([]); // Array para múltipla seleção de gênero
  const [showFilters, setShowFilters] = useState(false); // Controlar visibilidade dos filtros
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(8); // Mostrar 9 produtos inicialmente (3 colunas x 3 linhas)

  // Initialize default products and load from storage on mount
  useEffect(() => {
    initializeDefaultProducts(initialProductsData);
    loadProducts();
  }, []);

  const loadProducts = () => {
    const loadedProducts = ProductStore.getProducts();
    setProducts(loadedProducts);
  };
  
  // Fast slideshow automation for luxury gallery
  useEffect(() => {
    const totalSlides = 4;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 2500); // Troca a cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.name === product.name &&
        item.brand === product.brand,
    );

    if (existingItemIndex >= 0) {
      // Item exists, increase quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      toast.success(`${product.name} - quantidade atualizada!`);
    } else {
      // New item, add to cart
      const cartItem: CartItem = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        category: product.category,
        productType: product.productType,
        quantity: 1,
      };
      setCartItems([...cartItems, cartItem]);
      toast.success(`${product.name} adicionado ao carrinho!`);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    toast.info("Produto removido do carrinho");
  };

  const handleUpdateQuantity = (
    index: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.info("Carrinho limpo");
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setProductTypeFilter("Todos"); // Reset product type when main category changes
    setSubcategoryFilter([]); // Reset subcategory when main category changes
    setShowFilters(false); // Hide filters when category changes
    setVisibleProducts(8); // Reset visible products count
  };

  const handleProductTypeChange = (value: string) => {
    setProductTypeFilter(value);
    setSubcategoryFilter([]); // Reset gender filter when product type changes
    setVisibleProducts(8); // Reset visible products count
  };

  const handleSubcategoryToggle = (value: string) => {
    setSubcategoryFilter((prev) => {
      if (prev.includes(value)) {
        // Remove se já estiver selecionado
        return prev.filter((item) => item !== value);
      } else {
        // Adiciona se não estiver selecionado
        return [...prev, value];
      }
    });
    setVisibleProducts(8); // Reset visible products count
  };

  // Apply all filters
  let filteredProducts = products;

  // Filter by main category (sempre aplica, não tem mais "Todos")
  filteredProducts = filteredProducts.filter(
    (product) => product.category === categoryFilter,
  );

  // PERFUMARIA - Filter by product type (Body Splash, Brand)
  if (categoryFilter === "Perfumaria") {
    if (productTypeFilter !== "Todos") {
      filteredProducts = filteredProducts.filter(
        (product) => product.productType === productTypeFilter,
      );
    }
    // When "Todos" is selected, show all product types (no filtering by productType)

    // Filter by gender (Masculino, Feminino, Unissex) - múltipla seleção
    if (subcategoryFilter.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        subcategoryFilter.includes(product.subcategory || ""),
      );
    }
  }

  // MAQUIAGEM e AUTOCUIDADO - Filter by subcategory - múltipla seleção
  if (
    (categoryFilter === "Maquiagem" ||
      categoryFilter === "Autocuidado") &&
    subcategoryFilter.length > 0
  ) {
    filteredProducts = filteredProducts.filter((product) =>
      subcategoryFilter.includes(product.subcategory || ""),
    );
  }

  // Get product types based on main category (2nd level filter)
  const getProductTypes = () => {
    if (categoryFilter === "Perfumaria") {
      return ["Todos", "Comum", "Body Splash", "Brand"];
    }
    return [];
  };

  // Get subcategories/gender based on main category (3rd level filter)
  const getSubcategories = () => {
    if (categoryFilter === "Perfumaria") {
      return ["Feminino", "Masculino", "Unissex"];
    } else if (categoryFilter === "Maquiagem") {
      return ["Rosto", "Olhos", "Boca", "Acessórios"];
    } else if (categoryFilter === "Autocuidado") {
      return ["Corpo", "Rosto"];
    }
    return [];
  };

  const productTypes = getProductTypes();
  const subcategories = getSubcategories();

  // Show admin page if requested
  if (showAdmin) {
    return (
      <AdminPage
        onBackToSite={() => {
          setShowAdmin(false);
          // Remove admin param from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("admin");
          window.history.replaceState({}, "", url.toString());
        }}
        onProductsChange={loadProducts}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-0 pb-0 px-0 relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://drive.google.com/thumbnail?id=1u_wq0NLYhHXhy1uNFdC7wxQvKN-FGclV&sz=w3000"
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

      {/* Catalog Section */}
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
              value={categoryFilter}
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
                    value={productTypeFilter}
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
                          className={`min-w-[80px] px-4 py-2 border rounded-none transition-all duration-300 uppercase tracking-wider text-[10px] sm:text-xs ${subcategoryFilter.includes(
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
                      handleViewDetails(product)
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

      {/* Luxury Gallery Section - Fast Upward Carousel */}
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
                  src="https://drive.google.com/thumbnail?id=1z_F_0MsBA9b6kGP07GWwhY4Wlw9szFpt&sz=w3000"
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
                  src="https://drive.google.com/thumbnail?id=1p1DhAMta9K-CmQcCwM02MAvwjHfWipp2&sz=w3000"
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
                  src="https://drive.google.com/thumbnail?id=1OLCm4tMbmOt_X-cgzU6KzXoWAS6M2gC-&sz=w3000"
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
                  src="https://drive.google.com/thumbnail?id=1QihvFHsotudEEbrz2YZWcxgV57nkluty&sz=w3000"
                  alt="Golden Perfumes Table"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Dialog */}
      {selectedProduct && (
        <ProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          product={selectedProduct}
          onAddToCart={() => handleAddToCart(selectedProduct)}
        />
      )}

      {/* Footer */}

      <Footer setShowAdmin={setShowAdmin}/>

      {/* Toaster */}
      <Toaster />
    </div>
  );
}
