import type { CartItem } from "@/types/Cart";
import { convertCurrencyStringToFloat } from "./convertCurrencyStringToFloat";
import type { PerfumariaProduct } from "@/types/Product";

export const calculateTotal = (cart: CartItem[]) => {
  let comumPerfumes: CartItem[] = [];
  let comumPerfumesQt: number = 0;

  let brandPerfumes: CartItem[] = [];
  let brandPerfumesQt: number = 0;

  let bodySplashes: CartItem[] = [];
  let bodySplashesQt: number = 0;


  let others: CartItem[] = [];

  let totalWithoutDiscount = 0;
  let totalWithDiscount = 0

  cart.forEach(cartItem => {
    const product = { ...cartItem }
    const { category } = product;
    const isPerfumaria = category === "Perfumaria";

    totalWithoutDiscount += product.quantity * convertCurrencyStringToFloat(product.price);

    if (isPerfumaria) {
      const { productType } = product as Pick<PerfumariaProduct, "productType">

      productType === "Brand" && brandPerfumes.push(product);
      productType === "Body Splash" && bodySplashes.push(product);
      productType === "Comum" && comumPerfumes.push(product);

      comumPerfumesQt = comumPerfumes.reduce((totalPerfumes, cartItem) => totalPerfumes + cartItem.quantity, 0);
      brandPerfumesQt = brandPerfumes.reduce((totalPerfumes, cartItem) => totalPerfumes + cartItem.quantity, 0);
      bodySplashesQt = bodySplashes.reduce((totalBodysplashes, cartItem) => totalBodysplashes + cartItem.quantity, 0);

      return;
    }

    others.push(product);
  })

  // these functions will calculate the value with the discounts 
  // and update the totalWithDiscount and totalWithoutDiscount variables
  // the discounts can be stackable
  calculateWithoutDiscountValue()
  calculateComumPerfumesCombos();
  calculateBodysplashes();
  calculateComumperfumesRemaining()
  calculateBrandPerfumes();
  calculateOthers();

  const hasDiscount = totalWithDiscount > 0 && totalWithDiscount < totalWithoutDiscount

  return {
    total: hasDiscount ? totalWithDiscount : totalWithoutDiscount,
    originalTotal: hasDiscount ? totalWithoutDiscount : null,
    hasDiscount
  };

  function calculateWithoutDiscountValue() {
    totalWithoutDiscount = comumPerfumesQt * 39.90;
    totalWithoutDiscount += bodySplashesQt * 30;
    totalWithoutDiscount += brandPerfumesQt * 75;

  }

  function calculateComumPerfumesCombos() {
    let total = 0

    while (comumPerfumesQt >= 4) {
      total += 130;
      comumPerfumesQt -= 4;
    }

    while (comumPerfumesQt >= 3) {
      total += 90;
      comumPerfumesQt -= 3;
    }

    totalWithDiscount += total;

  }

  function calculateComumperfumesRemaining() {
    totalWithDiscount += comumPerfumesQt * 39.90;
  }

  function calculateBodysplashes() {
    let total = 0;

    // check if there's a comum perfume to get the discount
    while (bodySplashesQt > 0 && comumPerfumesQt >= 1) {
      total += 50;
      bodySplashesQt--
      comumPerfumesQt--
    }

    total += bodySplashesQt * 30;
    totalWithDiscount += total;
  }

  function calculateBrandPerfumes() {
    let total = 0;

    while (brandPerfumesQt >= 2) {
      total += 135;
      brandPerfumesQt -= 2;
    }

    total += brandPerfumesQt * 75;
    totalWithDiscount += total;
  }

  function calculateOthers() {
    const total = others.reduce((othersTotal, otherItem) => othersTotal + otherItem.quantity, 0);
    totalWithDiscount += total;
    totalWithoutDiscount += total;
  }



};

