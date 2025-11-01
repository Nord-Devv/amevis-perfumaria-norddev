import { fetchCatalog } from "@/services/fetchCatalog";
import { useEffect, useState } from "react";

export interface BaseProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  category: "Perfumaria" | "Maquiagem" | "Autocuidado";
  image: string;
  description: string;

  productType?: string; // "Comum", "Body Splash", "Brand Collection" (para Perfumaria)

  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}


interface PerfumariaProduct extends BaseProduct {
  category: "Perfumaria";
  subcategory: "Feminino" | "Masculino" | "Unissex";
  productType: "Comum" | "Body Splash" | "Brand"
  ;
}
interface MaquiagemProduct extends BaseProduct {
  category: "Maquiagem";
  subcategory: "Rosto" | "Olhos" | "Boca" | "Acessórios"

}
interface AutocuidadoProduct extends BaseProduct {
  category: "Autocuidado";
  subcategory: "Corpo" | "Rosto";
}

type Product = PerfumariaProduct | MaquiagemProduct | AutocuidadoProduct



export const useCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProdutcs] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Perfumaria")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Todos")
  const [selectedType, setSelectedType] = useState<string>("Todos")
  const [visibleProducts, setVisibleProducts] = useState(8);


  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("Todos");
    setSelectedType("Todos");
  };


  const productTypes =
    selectedCategory === "Perfumaria"
      ? ["Todos", "Comum", "Body Splash", "Brand"]
      : [];

  const subcategories =
    selectedCategory === "Perfumaria"
      ? ["Feminino", "Masculino", "Unissex"]
      : selectedCategory === "Maquiagem"
        ? ["Rosto", "Olhos", "Boca", "Acessórios"]
        : selectedCategory === "Autocuidado"
          ? ["Corpo", "Rosto"]
          : [];

  useEffect(() => {
    const fetchProducts = async () => {

      const initialValues = fetchCatalog();
      const addProductsId = initialValues.map((product, index) => ({
        ...product,
        id: `${index + 1}`,
      })) as Product[]

      setProducts(addProductsId);
      setFilteredProdutcs(addProductsId)
    }

    fetchProducts()

  }, [])

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (selectedType !== "Todos" && selectedCategory === "Perfumaria") {
      filtered = filtered.filter(
        (p) => (p as PerfumariaProduct).productType === selectedType
      );
    }

    if (selectedSubcategory !== "Todos") {
      filtered = filtered.filter(
        (p) => (p as any).subcategory === selectedSubcategory
      );
    }

    setFilteredProdutcs(filtered);
    setVisibleProducts(8);
  }, [products, selectedCategory, selectedSubcategory, selectedType]);


  const handleProductTypeChange = (value: string) => {
    setSelectedType(value);
    setSelectedSubcategory("Todos");
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    // wuando user clicar na mesma subcategoria volta pra "Todos"
    if (selectedSubcategory === subcategory) {
      setSelectedSubcategory("Todos");
      return;
    }

    setSelectedSubcategory(subcategory);
    if (selectedCategory === "Perfumaria") {
      setSelectedType("Todos");
    }
  };



  function handleViewDetails(product: Product): void {
    throw new Error("Function not implemented.");
  }

  function handleAddToCart(product: Product): void {
    throw new Error("Function not implemented.");
  }

  return {
    filteredProducts,
    visibleProducts,
    selectedProduct,
    showFilters,
    selectedCategory,
    selectedSubcategory,
    selectedType,
    productTypes,
    subcategories,
    setVisibleProducts,
    setShowFilters,
    handleCategoryChange,
    handleProductTypeChange,
    handleSubcategoryToggle,
    handleViewDetails,
    handleAddToCart,
  }

}
