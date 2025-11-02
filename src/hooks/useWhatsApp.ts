import type { CartItem } from "@/types/Cart";
import type { Product } from "@/types/Product";
import { calculateTotal } from "@/utils/calculateCartTotal";

export const useWhatsApp = () => {
  const buySingleProduct = (product: Product) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no perfume *${product.name}* da marca ${product.brand}. Gostaria de mais informações!`,
    );
    const whatsappNumber = "5585998039134";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
    );
  };

  const buyCartProducts = (cart: CartItem[]) => {
    let message =
      "Olá! Gostaria de fazer um pedido dos seguintes produtos:\\n\\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* - ${item.brand}\\n`;
      message += `   Categoria: ${item.category}\\n`;
      message += `   Quantidade: ${item.quantity}\\n`;
      message += `   Preço unitário: ${item.price}\\n\\n`;
    });

    const { total, originalTotal, hasDiscount } = calculateTotal(cart);

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

  }

  return {
    buySingleProduct, buyCartProducts
  }
}
