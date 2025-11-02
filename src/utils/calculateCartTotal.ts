import type { CartItem } from "@/types/Cart";

export const calculateTotal = (cart: CartItem[]) => {
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

