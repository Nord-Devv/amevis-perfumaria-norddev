import type { CartItem } from "@/types/Cart";
import { convertCurrencyStringToFloat } from "./convertCurrencyStringToFloat";

// Handles the "3 for 85" deal for perfumes priced at R$39.90
const calculateThirtyNineNinetyDeal = (items: CartItem[]) => {
  let total = 0;
  let quantity = items.reduce((acc, item) => acc + item.quantity, 0);

  while (quantity >= 3) {
    total += 85;
    quantity -= 3;
  }

  total += quantity * 39.9;

  return total;
};

const calculateTradicionalDeal = (items: CartItem[]) => {
  let total = 0;
  let quantity = items.reduce((acc, item) => acc + item.quantity, 0);

  while (quantity >= 3) {
    total += 100;
    quantity -= 3;
  }

  // Add the cost of any remaining items that don't make a full set of 3
  if (quantity > 0 && items.length > 0) {
    const priceOfLeftoverItem = convertCurrencyStringToFloat(items[0].price);
    total += quantity * priceOfLeftoverItem;
  }

  return total;
};

export const calculateTotal = (cart: CartItem[]) => {
  if (!cart || cart.length === 0) {
    return {
      total: 0,
      originalTotal: null,
      hasDiscount: false,
    };
  }

  // Calculate original total without any discounts
  const originalTotal = cart.reduce(
    (acc, item) =>
      acc + convertCurrencyStringToFloat(item.price) * item.quantity,
    0
  );

  // Group items for discounts
  const thirtyNineNinetyItems: CartItem[] = [];
  const tradicionalItems: CartItem[] = []; // For the "3 for 100" deal
  const otherItems: CartItem[] = [];

  for (const item of cart) {
    const price = convertCurrencyStringToFloat(item.price);
    // Group for "3 for 85" deal
    if (item.category === "Perfumaria" && price === 39.9) {
      thirtyNineNinetyItems.push(item);
    }
    // Group for "3 for 100" deal - assumes a 'Tradicional' productType
    else if (
      item.category === "Perfumaria" &&
      (item as any).productType === "Tradicional"
    ) {
      tradicionalItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  // Calculate total with discounts
  const thirtyNineNinetyTotal =
    calculateThirtyNineNinetyDeal(thirtyNineNinetyItems);
  const tradicionalTotal = calculateTradicionalDeal(tradicionalItems);
  const othersTotal = otherItems.reduce(
    (acc, item) =>
      acc + convertCurrencyStringToFloat(item.price) * item.quantity,
    0
  );

  const totalWithDiscount =
    thirtyNineNinetyTotal + tradicionalTotal + othersTotal;

  // Round to 2 decimal places to avoid floating point issues
  const roundedTotalWithDiscount = Math.round(totalWithDiscount * 100) / 100;
  const roundedOriginalTotal = Math.round(originalTotal * 100) / 100;

  const hasDiscount = roundedTotalWithDiscount < roundedOriginalTotal;

  return {
    total: hasDiscount ? roundedTotalWithDiscount : roundedOriginalTotal,
    originalTotal: hasDiscount ? roundedOriginalTotal : null,
    hasDiscount,
  };
};