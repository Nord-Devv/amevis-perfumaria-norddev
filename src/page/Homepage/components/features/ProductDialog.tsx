import {
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useSelectedProductStore } from "@/store/useSelectedProductStore";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/types/Product";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useWhatsApp } from "@/hooks/useWhatsApp";

interface ProductDialogProps {
  open: boolean;
  product: Product
}

export function ProductDialog({
  open,
  product,
}: ProductDialogProps) {

  const { isMobile } = useIsMobile();
  const { closeProduct } = useSelectedProductStore();
  const { addItem } = useCartStore();
  const { buySingleProduct } = useWhatsApp();

  function onOpenChange(isOpen: boolean) {
    !isOpen && closeProduct();
  }

  function handleAddItemToCart() {
    closeProduct()
    addItem({ ...product, quantity: 1 })
  }

  function handleBuySingleProduct() {
    buySingleProduct(product)
  }


  // Componente de conteúdo reutilizável
  const ProductContent = ({ isMobileDrawer = false }: { isMobileDrawer?: boolean }) => (
    <>
      <div className="flex flex-row-reverse">
        {/* Close Button */}
        <div className="flex w-full flex-row justify-end">
          <button
            onClick={closeProduct}
            className="cursor-pointer relative ml-3 z-50 w-14 h-18 flex items-center justify-center hover:bg-[#FF4D4D]/20 text-[#FF4D4D] hover:text-white rounded-none transition-all duration-300 group"
            aria-label="Fechar"
          >
            <X className="h-8 w-8 text-[#FF4D4D] group-hover:text-white transition-colors stroke-[2.5]" />
          </button>
        </div>
        {/* Header com padding */}
        <div className="p-6 flex-shrink-0 relative">
          {isMobileDrawer ? (
            <DrawerHeader className="p-0">
              <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-[#FF4D4D]" />
                    <DrawerDescription className="text-[#FF4D4D] uppercase tracking-widest text-xs">
                      {product.brand}
                    </DrawerDescription>
                  </div>
                  <DrawerTitle className="text-2xl sm:text-3xl text-white leading-tight pr-2">
                    {product.name}
                  </DrawerTitle>
                </div>
                <Badge className="bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] text-white border-0 uppercase tracking-wider rounded-none flex-shrink-0">
                  {product.category}
                </Badge>
              </div>
            </DrawerHeader>
          ) : (
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-[#FF4D4D]" />
                    <DialogDescription className="text-[#FF4D4D] uppercase tracking-widest text-xs">
                      {product.brand}
                    </DialogDescription>
                  </div>
                  {/* <DialogTitle className="text-3xl text-white leading-tight"> */}
                  {/*   {product.name} */}
                  {/* </DialogTitle> */}
                </div>
                <Badge className="bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] text-white border-0 uppercase tracking-wider rounded-none mx-[24px] my-[0px] mt-[0px] mr-[40px] mb-[0px] ml-[24px]">
                  {product.category}
                </Badge>
              </div>
            </DialogHeader>
          )}

        </div>


      </div>

      {/* Decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8D021F]/50 to-transparent"></div>


      {/*content */}
      <div className="flex flex-col mx-auto md:flex-row md:w-[90%] items-center justify-center gap-x-4">
        {/* Imagem com largura total - sem padding lateral */}
        <div className="w-full md:w-2/4 h-[400px] md:h-[570px] overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] flex-shrink-0 relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-lighten opacity-90"
          />
          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent"></div>
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 md:-bottom-4.5 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
        </div>

        {/* Informações do produto */}
        <div className="flex flex-col justify-between p-[24px] w-full md:p-0 md:pb-3 md:bg-none md:max-w-2/4 md:h-[570px]">

          <div className="flex flex-col gap-y-6">
            <DialogTitle className="text-3xl text-white leading-tight text-center">
              {product.name}
            </DialogTitle>

            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8D021F]/30"></div>
              <h3 className="text-[#FF4D4D] uppercase tracking-wider text-sm">Descrição</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8D021F]/30"></div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {product.description}
            </p>
            {product.notes && (
              <div className="bg-gradient-to-br from-[#8D021F]/10 to-[#8D021F]/5 rounded-none p-5 border border-[#8D021F]/40 shadow-inner relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#8D021F]/20"></div>

                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#FF4D4D]" />
                  <h3 className="text-[#FF4D4D] uppercase tracking-wider text-sm">
                    Principais Notas
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {[...product.notes.base].join(" • ")}
                </p>
              </div>
            )}
            {/* Price with decorative elements */}
            <div className="bg-gradient-to-r from-[#8D021F]/5 via-[#8D021F]/10 to-[#8D021F]/5 p-4 border border-[#8D021F]/30 rounded-none">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 uppercase tracking-wider text-xs">Preço</span>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-[#8D021F]/30"></div>
                  <span className="text-3xl text-[#FF4D4D] tracking-tight text-[20px]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>


          </div>


          <div className="pt-4 space-y-4">

            <Button
              onClick={handleAddItemToCart}
              variant="outline"
              className="w-full bg-transparent border-2 border-[#8D021F] text-[#FF4D4D] hover:bg-[#8D021F]/10 hover:text-[#FF4D4D] rounded-none h-12 uppercase tracking-wider transition-all duration-300"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho
            </Button>

            <Button
              onClick={handleBuySingleProduct}
              className="w-full bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] text-white rounded-none h-12 uppercase tracking-wider shadow-lg shadow-[#8D021F]/30 hover:shadow-[#8D021F]/50 transition-all duration-300"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5 mr-2" />
              Eu Quero
            </Button>

            <p className="text-center text-gray-500 text-xs uppercase tracking-wide">
              Atendimento personalizado via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Renderizar Drawer para mobile ou Dialog para desktop
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-w-[90vw] mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#8D021F] border-t-2 text-white p-0 flex flex-col rounded-none !max-h-[95vh] h-[95vh]">
          <div className="overflow-y-auto flex-1 overscroll-contain">
            <ProductContent isMobileDrawer={true} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#8D021F] border-2 text-white max-w-full min-h-[90vh] md:min-h-[85vh] md:pb-2 overflow-y-auto p-0 flex flex-col rounded-none shadow-2xl shadow-[#8D021F]/30">
        <ProductContent />
      </DialogContent>
    </Dialog>
  );
}
