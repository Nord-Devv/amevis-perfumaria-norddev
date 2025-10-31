// Gerenciamento de produtos com localStorage

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  category: string;
  productType?: string; // "Comum", "Body Splash", "Brand Collection" (para Perfumaria)
  subcategory: string;
  image: string;
  description: string;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

export interface ProductInput {
  id?: string;
  name: string;
  brand: string;
  price: string;
  category: string;
  productType?: string; // "Comum", "Body Splash", "Brand Collection" (para Perfumaria)
  subcategory: string;
  image: string;
  description: string;
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

const STORAGE_KEY = 'amevi_products';

// Produtos iniciais (padrão) - IDs serão adicionados automaticamente
export let defaultProducts: Product[] = [];

// Function to initialize default products from initial data
export function initializeDefaultProducts(initialData: ProductInput[]): void {
  defaultProducts = initialData.map((product, index) => ({
    ...product,
    id: product.id || `default_${index + 1}`,
  }));
}

export class ProductStore {
  static getProducts(): Product[] {
    if (typeof window === 'undefined') return defaultProducts;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const products = JSON.parse(stored);
        // Ensure all products have IDs
        return products.map((p: ProductInput, index: number) => ({
          ...p,
          id: p.id || `product_${index}_${Date.now()}`,
        }));
      } catch (e) {
        console.error('Erro ao carregar produtos:', e);
        return defaultProducts;
      }
    }
    return defaultProducts;
  }

  static saveProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  static addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  static updateProduct(id: string, updates: Partial<Product>): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
    }
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    this.saveProducts(filtered);
  }

  static resetToDefaults(): void {
    this.saveProducts(defaultProducts);
  }
}
