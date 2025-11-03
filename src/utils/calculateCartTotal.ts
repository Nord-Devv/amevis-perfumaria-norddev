import type { CartItem } from "@/types/Cart";
import { convertCurrencyStringToFloat } from "./convertCurrencyStringToFloat";
import type { PerfumariaProduct } from "@/types/Product";

export const calculateTotal = (cart: CartItem[]) => {
  // Separar itens por tipo de produto
  // apenas produtos de perfumaria tem desconto, tipos:
  // "Comum" | "Body Splash" | "Brand"
  let perfumeComuns: CartItem[] = [];
  let perfumeBrands: CartItem[] = [];
  let bodySplashes: CartItem[] = [];

  let others: CartItem[] = [];

  let totalWithoutDiscount = 0;

  cart.forEach(cartItem => {
    const product = { ...cartItem }
    const { category } = product;
    const isPerfumaria = category === "Perfumaria";

    totalWithoutDiscount += product.quantity * convertCurrencyStringToFloat(product.price);

    if (isPerfumaria) {
      const { productType } = product as Pick<PerfumariaProduct, "productType">

      productType === "Brand" && perfumeBrands.push(product);
      productType === "Body Splash" && bodySplashes.push(product);
      productType === "Comum" && perfumeComuns.push(product);
      return;
    }

    others.push(product);
  })

  // first apply discount based on comum perfumes quantity
  // second apply discount to pairs of comum perfme and bodysplash
  // also apply discount on brand perfumes quantity
  const comumDiscount = calculateComumPerfumeDiscount();
  const comboDiscount = calculatePerfumeAndBodysplahDiscount()
  const brandDiscount = calculateBrandPerfumDiscount();

  const perfumeTotalWithDiscount = comboDiscount + comumDiscount + brandDiscount + calculateBodysplashs();

  const totalDiscount = perfumeTotalWithDiscount + calculateOthersValues()
  const hasDiscount = totalDiscount > 0 && totalDiscount < totalWithoutDiscount;

  return {
    total: hasDiscount ? totalDiscount : totalWithoutDiscount,
    originalTotal: hasDiscount ? totalWithoutDiscount : null,
    hasDiscount
  };



  function calculateOthersValues() {
    let total = 0;
    total = total + others.reduce((acc, p) => acc + convertCurrencyStringToFloat(p.price),
      0)

    return total
  }

  function calculateComumPerfumeDiscount() {
    let total = 0;
    perfumeComuns.forEach(perfume => {
      while (perfume.quantity >= 4) {
        total += 130;
        perfume.quantity -= 4;
      }
      while (perfume.quantity >= 3) {
        total += 90;
        perfume.quantity -= 3;
      }
    });

    return total;
  }

  function calculatePerfumeAndBodysplahDiscount() {
    let total = 0;

    perfumeComuns.forEach(perfume => {
      while (perfume.quantity > 0 && bodySplashes.length > 0) {
        perfume.quantity--;
        const body = bodySplashes[0];
        if (body.quantity === 1) {
          bodySplashes.shift();
        } else {
          body.quantity--;
        }
        total += 50;
      }

    })
    return total;


  }

  function calculateBodysplashs() {
    let total = 0
    bodySplashes.forEach(product => {
      total = total + product.quantity * convertCurrencyStringToFloat(product.price);
    })
    return total
  }

  function calculateBrandPerfumDiscount() {
    let total = 0;
    let totalQty = perfumeBrands.reduce((acc, perfume) => acc + perfume.quantity, 0)

    while (totalQty >= 2) {
      total += 135;
      totalQty -= 2;
    }

    const price = convertCurrencyStringToFloat(perfumeBrands[0]?.price || "0");
    total += totalQty * price;

    return total;

  }

};

