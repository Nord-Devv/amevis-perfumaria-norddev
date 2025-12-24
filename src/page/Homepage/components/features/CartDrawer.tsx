import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useCartStore } from "@/store/useCartStore";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export function CartDrawer() {
  const { cart, hasDiscount, originalTotal, total, increaseQuantity, decreaseQuantity, removeItem, cleanCart } = useCartStore();
  const { buyCartProducts } = useWhatsApp();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    buyCartProducts(cart);
    cleanCart();
  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative  border-[#8D021F]/30 text-white hover:bg-white/10 hover:border-[#8D021F] hover:text-[#FF4D4D] rounded-[0px]"
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#8D021F] hover:bg-white/10 hover:text-[#FF4D4D] border-0 text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border-l-2 border-[#8D021F]/30">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center gap-2 font-['Cinzel']">
              <ShoppingCart className="h-5 w-5 text-[#FF4D4D]" />
              Meu Carrinho
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none hover:bg-[#8D021F]/20 text-[#FF4D4D] hover:border-[#8D021F] hover:text-[#FF4D4D]">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-[#FF4D4D]/70">
            {cart.length === 0
              ? "Seu carrinho está vazio"
              : `${cart.length} ${cart.length === 1 ? "item" : "itens"} selecionado${cart.length === 1 ? "" : "s"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-full bg-[#8D021F]/10 flex items-center justify-center mb-4 border border-[#8D021F]/30">
                <ShoppingCart className="h-12 w-12 text-[#FF4D4D]" />
              </div>
              <p className="text-white/80 text-[15px]">
                Nenhum produto adicionado ainda
              </p>
              <p className="text-[#FF4D4D]/60 text-sm mt-2 text-[13px]">
                Explore nosso catálogo e adicione seus itens
                favoritos
              </p>
            </div>
          ) : (
            <>
              <div className="mx-auto w-full flex-1 justify-center items-center overflow-y-auto space-y-4 px-[8px] py-[0px]">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-none p-4 border border-[#8D021F]/30 shadow-lg relative overflow-hidden group hover:border-[#8D021F]/50 transition-all duration-300"
                  >

                    <div className="space-y-3 relative z-10">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-none overflow-hidden bg-[#0F0F0F] ring-2 ring-[#8D021F]/40 flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white truncate font-['Cinzel']">
                            {item.name}
                          </h4>
                          <p className="text-[#FF4D4D] text-sm">
                            {item.brand}
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            {item.category}
                          </p>
                          <p className="text-[#FF4D4D] mt-2">
                            {item.price}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="h-8 w-8 flex-shrink-0 hover:bg-red-900/30 group border border-red-500/30 hover:border-red-500 rounded-none"
                        >
                          <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#8D021F]/20">
                        <span className="text-white/70 text-sm">Quantidade:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              decreaseQuantity(index);
                            }}
                            className="h-7 w-7 hover:bg-[#8D021F]/20 border border-[#8D021F]/30 hover:border-[#8D021F] rounded-none"
                          >
                            <Minus className="h-3 w-3 text-[#FF4D4D]" />
                          </Button>
                          <span className="text-white min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => increaseQuantity(index)}
                            className="h-7 w-7 hover:bg-[#8D021F]/20 border border-[#8D021F]/30 hover:border-[#8D021F] rounded-none"
                          >
                            <Plus className="h-3 w-3 text-[#FF4D4D]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mx-auto border-[#8D021F]/30 max-w-[98%] pt-4 mt-4 space-y-3">
                {/* Total */}
                <div className="bg-gradient-to-r from-[#8D021F]/10 to-[#8D021F]/5 border border-[#8D021F]/40 rounded-none p-4 mb-3">
                  <div className="space-y-2">
                    {hasDiscount && originalTotal && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm">Sem desconto:</span>
                        <span className="text-white/60 line-through text-sm">
                          R$ {originalTotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-white uppercase tracking-wider">
                        {hasDiscount ? 'Total com Desconto:' : 'Total:'}
                      </span>
                      <span className="text-[#FF4D4D] tracking-wider">
                        R$ {total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-gradient-to-r from-[#8D021F] to-[#580000] hover:from-[#580000] hover:to-[#580000] text-white rounded-none shadow-lg shadow-[#8D021F]/30 border border-[#8D021F] uppercase tracking-wider transition-all duration-300"
                  size="lg"
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Enviar Pedido via WhatsApp
                </Button>

                <Button
                  onClick={cleanCart}
                  variant="outline"
                  className="w-full border-2 border-red-500/40 bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 hover:border-red-500/60 rounded-none transition-all duration-300 uppercase"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Limpar Carrinho
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
