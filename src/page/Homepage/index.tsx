import { useState } from "react";
import { toast } from "sonner";

import { Header } from "../../components/layout/Header";
import { ProductDialog } from "../../components/ProductDialog";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { type CartItem } from "../../components/CartDrawer";
import { Toaster } from "../../components/ui/sonner";
// import { AdminPage } from "./admin/AdminPage";
import { Footer } from "../../components/layout/footer";
import { CarouselGallery } from "../../components/features/carouselGallery";
import { SectionCatalog } from "../../components/SectionCatalog";

import { type Product } from "../admin/components/productStore";
import { useSelectedProductStore } from "../../store/useSelectedProductStore";

export function HomePage() {
    const [showAdmin, setShowAdmin] = useState(false);
    // const [products, setProducts] = useState<Product[]>([]);
    // const [selectedProduct, setSelectedProduct] =
    //   useState<Product | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [categoryFilter, setCategoryFilter] =
    useState<string>("Perfumaria");
    // const [productTypeFilter, setProductTypeFilter] =
    useState<string>("Todos"); // Body Splash, Brand
    // const [showFilters, setShowFilters] = useState(false); // Controlar visibilidade dos filtros
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    // const [visibleProducts, setVisibleProducts] = useState(8); // Mostrar 9 produtos inicialmente (3 colunas x 3 linhas)
    //
    const selectedProduct = useSelectedProductStore().product;

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


    //
    //   function loadProducts(): void {
    //       console.log("implementar função de atualização do catalogo");
    //   }
    //
    //   return (
    //     <AdminPage
    //       onBackToSite={() => {
    //         setShowAdmin(false);
    //         // Remove admin param from URL
    //         const url = new URL(window.location.href);
    //         url.searchParams.delete("admin");
    //         window.history.replaceState({}, "", url.toString());
    //       }}
    //       onProductsChange={loadProducts}
    //     />
    //   );
    // }
    //

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

            <SectionCatalog toggleDialog={setIsDialogOpen} />
            {/* Luxury Gallery Section - Fast Upward Carousel */}
            <CarouselGallery />

            {/* Product Dialog */}
            {selectedProduct && (
                <ProductDialog
                    open={!!selectedProduct}
                    onOpenChange={setIsDialogOpen}
                    product={selectedProduct}
                    onAddToCart={() => handleAddToCart(selectedProduct)}
                />
            )}

            {/* Footer */}
            <Footer setShowAdmin={setShowAdmin} />

            {/* Toaster */}
            <Toaster />
        </div>
    )
}

