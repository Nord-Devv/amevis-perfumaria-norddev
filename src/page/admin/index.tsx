import { useState, useEffect } from "react";
import { ProductStore, type Product } from "@/page/admin/service/productStore";
import { ProductForm } from "@/page/admin/components/ProductForm";
import { ProductList } from "@/page/admin/components/ProductList";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Plus, ArrowLeft, RefreshCw } from "lucide-react";
import logoAmevi from "@/assets/e214b3767302229bb769b749498b0cffbf615395.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminPageProps {
  onBackToSite?: () => void;
  onProductsChange?: () => void;
}

export function AdminPage({ onBackToSite, onProductsChange }: AdminPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const loadedProducts = ProductStore.getProducts();
    setProducts(loadedProducts);
  };

  const handleSave = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      ProductStore.updateProduct(editingProduct.id, productData);
      toast.success("Produto atualizado com sucesso!");
    } else {
      ProductStore.addProduct(productData);
      toast.success("Produto adicionado com sucesso!");
    }
    loadProducts();
    // onProductsChange();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    ProductStore.deleteProduct(id);
    toast.success("Produto excluído com sucesso!");
    loadProducts();
    // onProductsChange();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleResetToDefaults = () => {
    ProductStore.resetToDefaults();
    loadProducts();
    // onProductsChange();
    toast.success("Produtos restaurados para o padrão!");
  };

  return (
    <div className="min-h-screen bg-[#FFFCFA]">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b border-[#C9A14A]/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoAmevi} alt="Amevi" className="h-10" />
              <div className="border-l border-[#C9A14A]/20 pl-4">
                <h1 className="text-xl text-[#1A1A1A]">Painel Administrativo</h1>
                <p className="text-sm text-[#666666]">Gerenciamento de Produtos</p>
              </div>
            </div>
            <Button
              onClick={onBackToSite}
              variant="outline"
              className="border-[#C9A14A]/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Site
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl text-[#1A1A1A]">Produtos</h2>
              <p className="text-[#666666] text-sm mt-1">
                Gerencie o catálogo de produtos da loja
              </p>
            </div>
            <div className="flex gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#C9A14A]/30"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restaurar Padrão
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#1A1A1A]">
                      Restaurar Produtos Padrão
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#666666]">
                      Isso irá substituir todos os produtos atuais pelos produtos
                      padrão. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-[#C9A14A]/30">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleResetToDefaults}
                      className="bg-[#C9A14A] hover:bg-[#B69142] text-white"
                    >
                      Restaurar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {!showForm && (
                <Button
                  onClick={handleAddNew}
                  className="bg-[#C9A14A] hover:bg-[#B69142] text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              )}
            </div>
          </div>

          {/* Form or List */}
          {showForm ? (
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C9A14A]/20 mt-12 py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-[#666666] text-sm">
            Painel Administrativo - Amevi Perfumes © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
