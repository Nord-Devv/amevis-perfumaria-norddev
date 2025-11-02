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
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import type { CartItem } from "@/types/Cart";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  // Função para calcular o total do carrinho e info de desconto
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCartStore();
  const calculateTotal = () => {
    // Separar itens por tipo de produto
    const perfumeComuns: CartItem[] = [];
    const perfumeBrands: CartItem[] = [];
    const bodySplashes: CartItem[] = [];
    const others: CartItem[] = [];

    cart.forEach(item => {
      const isPerfumaria = item.category.toLowerCase().includes('perfume') ||
        item.category.toLowerCase() === 'feminino' ||
        item.category.toLowerCase() === 'masculino' ||
        item.category.toLowerCase() === 'unissex';

      if (isPerfumaria) {
        if (item.productType === 'Brand Collection' || item.productType === 'Brand') {
          perfumeBrands.push(item);
        } else if (item.productType === 'Body Splash') {
          bodySplashes.push(item);
        } else {
          perfumeComuns.push(item);
        }
      } else {
        others.push(item);
      }
    });

    // Contar quantidades totais de cada tipo
    let comunsCount = perfumeComuns.reduce((sum, item) => sum + item.quantity, 0);
    const brandsCount = perfumeBrands.reduce((sum, item) => sum + item.quantity, 0);
    let bodySplashCount = bodySplashes.reduce((sum, item) => sum + item.quantity, 0);

    // Calcular totais originais (sem promoção)
    const originalComunsTotal = comunsCount * 39.90;
    const originalBrandsTotal = brandsCount * parseFloat(perfumeBrands[0]?.price.replace('R$', '').replace(',', '.').trim() || '0');
    const originalBodySplashTotal = bodySplashCount * parseFloat(bodySplashes[0]?.price.replace('R$', '').replace(',', '.').trim() || '0');

    let total = 0;
    let originalTotal = 0;

    // PROMOÇÃO 1: Comum + Body Splash = R$ 50,00
    const comboComumBodySplash = Math.min(comunsCount, bodySplashCount);
    if (comboComumBodySplash > 0) {
      total += comboComumBodySplash * 50.00;
      comunsCount -= comboComumBodySplash;
      bodySplashCount -= comboComumBodySplash;
    }

    // PROMOÇÃO 2: 2 Brands = R$ 140,00
    const brandPairs = Math.floor(brandsCount / 2);
    const brandRemainder = brandsCount % 2;
    if (brandPairs > 0) {
      total += brandPairs * 140.00;
    }
    if (brandRemainder > 0) {
      const brandPrice = parseFloat(perfumeBrands[0]?.price.replace('R$', '').replace(',', '.').trim() || '0');
      total += brandRemainder * brandPrice;
    }

    // PROMOÇÃO 3: Perfumes Comuns - 3 por R$ 90,00 ou 4 por R$ 130,00
    if (comunsCount === 1 || comunsCount === 2) {
      total += comunsCount * 39.90;
    } else if (comunsCount === 3) {
      total += 90.00;
    } else if (comunsCount >= 4) {
      const sets = Math.floor(comunsCount / 4);
      const remainder = comunsCount % 4;
      total += (sets * 130.00) + (remainder * 39.90);
    }

    // Body Splash restantes (sem promoção)
    if (bodySplashCount > 0) {
      const bodyPrice = parseFloat(bodySplashes[0]?.price.replace('R$', '').replace(',', '.').trim() || '0');
      total += bodySplashCount * bodyPrice;
    }

    // Outros itens (sem promoção)
    const othersTotal = others.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
      return sum + (price * item.quantity);
    }, 0);
    total += othersTotal;

    // Total original para comparação
    originalTotal = originalComunsTotal + originalBrandsTotal + originalBodySplashTotal + othersTotal;

    const hasDiscount = total < originalTotal;

    return {
      total,
      originalTotal: hasDiscount ? originalTotal : null,
      hasDiscount
    };
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message =
      "Olá! Gostaria de fazer um pedido dos seguintes produtos:\\n\\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* - ${item.brand}\\n`;
      message += `   Categoria: ${item.category}\\n`;
      message += `   Quantidade: ${item.quantity}\\n`;
      message += `   Preço unitário: ${item.price}\\n\\n`;
    });

    const { total, originalTotal, hasDiscount } = calculateTotal();

    if (hasDiscount && originalTotal) {
      message += `Total sem desconto: ~R$ ${originalTotal.toFixed(2).replace('.', ',')}~\\n`;
      message += `*Total com desconto: R$ ${total.toFixed(2).replace('.', ',')}*\\n\\n`;
    } else {
      message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\\n\\n`;
    }

    message +=
      "Aguardo retorno com informações sobre disponibilidade e forma de pagamento!";

    const encodedMessage = encodeURIComponent(message);
    // Substitua pelo número real do WhatsApp da vendedora (formato: 5511999999999)
    const whatsappNumber = "5585998039134";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative border-[#C9A14A]/30 text-white hover:bg-white/10 hover:border-[#C9A14A] hover:text-[#C9A14A] rounded-[0px]"
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#C9A14A] hover:bg-white/10 hover:text-[#C9A14A] border-0 text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border-l-2 border-[#C9A14A]/30">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center gap-2 font-['Cinzel']">
              <ShoppingCart className="h-5 w-5 text-[#C9A14A]" />
              Meu Carrinho
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none hover:bg-[#C9A14A]/20 text-[#C9A14A] hover:border-[#C9A14A] hover:text-[#C9A14A]">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-[#C9A14A]/70">
            {cart.length === 0
              ? "Seu carrinho está vazio"
              : `${cart.length} ${cart.length === 1 ? "item" : "itens"} selecionado${cart.length === 1 ? "" : "s"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-full bg-[#C9A14A]/10 flex items-center justify-center mb-4 border border-[#C9A14A]/30">
                <ShoppingCart className="h-12 w-12 text-[#C9A14A]" />
              </div>
              <p className="text-white/80 text-[15px]">
                Nenhum produto adicionado ainda
              </p>
              <p className="text-[#C9A14A]/60 text-sm mt-2 text-[13px]">
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
                    className="mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-none p-4 border border-[#C9A14A]/30 shadow-lg relative overflow-hidden group hover:border-[#C9A14A]/50 transition-all duration-300"
                  >

                    <div className="space-y-3 relative z-10">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-none overflow-hidden bg-[#0F0F0F] ring-2 ring-[#C9A14A]/40 flex-shrink-0">
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
                          <p className="text-[#C9A14A] text-sm">
                            {item.brand}
                          </p>
                          <p className="text-white/60 text-xs mt-1">
                            {item.category}
                          </p>
                          <p className="text-[#C9A14A] mt-2">
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
                      <div className="flex items-center justify-between pt-2 border-t border-[#C9A14A]/20">
                        <span className="text-white/70 text-sm">Quantidade:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              decreaseQuantity(index);
                            }}
                            className="h-7 w-7 hover:bg-[#C9A14A]/20 border border-[#C9A14A]/30 hover:border-[#C9A14A] rounded-none"
                          >
                            <Minus className="h-3 w-3 text-[#C9A14A]" />
                          </Button>
                          <span className="text-white min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => increaseQuantity(index)}
                            className="h-7 w-7 hover:bg-[#C9A14A]/20 border border-[#C9A14A]/30 hover:border-[#C9A14A] rounded-none"
                          >
                            <Plus className="h-3 w-3 text-[#C9A14A]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mx-auto border-[#C9A14A]/30 max-w-[98%] pt-4 mt-4 space-y-3">
                {/* Total */}
                <div className="bg-gradient-to-r from-[#C9A14A]/10 to-[#C9A14A]/5 border border-[#C9A14A]/40 rounded-none p-4 mb-3">
                  {(() => {
                    const { total, originalTotal, hasDiscount } = calculateTotal();
                    return (
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
                          <span className="text-[#C9A14A] tracking-wider">
                            R$ {total.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] text-black rounded-none shadow-lg shadow-[#C9A14A]/30 border border-[#C9A14A] uppercase tracking-wider transition-all duration-300"
                  size="lg"
                >
                  <WhatsAppIcon className="mr-2 h-5 w-5" />
                  Enviar Pedido via WhatsApp
                </Button>

                <Button
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
