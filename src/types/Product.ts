export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  category: "Perfumaria" | "Maquiagem" | "Autocuidado";
  image: string;
  description: string;

  productType?: string; // "Comum", "Body Splash", "Brand" (para Perfumaria)

  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}


export interface PerfumariaProduct extends BaseProduct {
  category: "Perfumaria";
  productType: "Comum" | "Body Splash" | "Brand";
  subcategory: "Feminino" | "Masculino" | "Unissex";
}
interface MaquiagemProduct extends BaseProduct {
  category: "Maquiagem";
  subcategory: "Rosto" | "Olhos" | "Boca" | "Acessórios"

}
interface AutocuidadoProduct extends BaseProduct {
  category: "Autocuidado";
  subcategory: "Corpo" | "Rosto";
}

export type Product = PerfumariaProduct | MaquiagemProduct | AutocuidadoProduct
