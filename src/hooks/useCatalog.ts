import { fetchCatalog } from "@/services/fetchCatalog";
import type { PerfumariaProduct, Product } from "@/types/Product";
import { convertCurrencyStringToFloat } from "@/utils/convertCurrencyStringToFloat";
import { useEffect, useState } from "react";

export const useCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProdutcs] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Perfumaria")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Todos")
  const [selectedType, setSelectedType] = useState<string>("Todos")
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("Todos");
    setSelectedType("Todos");
  };

  // options to list 
  const productTypes =
    selectedCategory === "Perfumaria"
      ? ["Todos", "Originais", "Comum", "Body Splash", "Brand"]
      : [];

  const subcategories =
    selectedCategory === "Perfumaria"
      ? ["Feminino", "Masculino", "Unissex"]
      : selectedCategory === "Maquiagem"
        ? ["Rosto", "Olhos", "Boca", "Acessórios"]
        : selectedCategory === "Autocuidado"
          ? ["Corpo", "Rosto"]
          : [];


  // fetch catalog api (json)
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

  // update filtered products list when selected category, type or subcategory change
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (selectedType !== "Todos" && selectedCategory === "Perfumaria") {
      if (selectedType === "Originais") {
        filtered = filtered.filter((p) => {
          const price = convertCurrencyStringToFloat(p.price);
          return price === 250 || price === 200;
        });
      }
      else {
        filtered = filtered.filter(
          (p) => (p as PerfumariaProduct).productType === selectedType
        );
      }
    }

    if (selectedSubcategory !== "Todos") {
      filtered = filtered.filter(
        (p) => (p as any).subcategory === selectedSubcategory
      );
    }

    filtered.sort((a, b) => {
      const pa = convertCurrencyStringToFloat(a.price);
      const pb = convertCurrencyStringToFloat(b.price);
      return pb - pa;
    });

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
  };


  return {
    filteredProducts,
    visibleProducts,
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
  }

}
