import { useState, useEffect } from "react";
import { type Product } from "./productStore";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { X } from "lucide-react";

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Perfumes",
    subcategory: "Feminino",
    image: "",
    description: "",
    notes: "",
  });

  useEffect(() => {

    if (product) {

      setFormData({

        name: product.name,

        brand: product.brand,

        price: product.price,

        category: product.category,

        subcategory: product.subcategory,

        image: product.image,

        description: product.description,

        notes: product.notes ? [product.notes.top.join(", "), product.notes.heart.join(", "), product.notes.base.join(", ")].join(" | ") : "",

      });

    }

  }, [product]);



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const notesParts = formData.notes.split("|").map(part => part.trim());
    const topNotes = notesParts[0] ? notesParts[0].split(",").map((n) => n.trim()) : [];
    const heartNotes = notesParts[1] ? notesParts[1].split(",").map((n) => n.trim()) : [];
    const baseNotes = notesParts[2] ? notesParts[2].split(",").map((n) => n.trim()) : [];

    const productData: Omit<Product, "id"> = {
      name: formData.name,
      brand: formData.brand,
      price: formData.price,
      category: formData.category,
      subcategory: formData.subcategory,
      image: formData.image,
      description: formData.description,
      notes: formData.notes
        ? { top: topNotes, heart: heartNotes, base: baseNotes }
        : undefined,
    };
    onSave(productData);
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    // Reset subcategory based on category
    if (value === "Perfumes") {
      setFormData((prev) => ({ ...prev, subcategory: "Feminino" }));
    } else if (value === "Body Splash") {
      setFormData((prev) => ({ ...prev, subcategory: "Feminino" }));
    } else if (value === "Beleza") {
      setFormData((prev) => ({ ...prev, subcategory: "Skincare" }));
    }
  };

  const getSubcategoryOptions = () => {
    if (formData.category === "Perfumes" || formData.category === "Body Splash") {
      return ["Feminino", "Masculino", "Compartilhável"];
    } else if (formData.category === "Beleza") {
      return ["Skincare", "Maquiagem", "Utensílios"];
    }
    return [];
  };

  return (
    <Card className="bg-white border-[#C9A14A]/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#1A1A1A]">
            {product ? "Editar Produto" : "Adicionar Novo Produto"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1A1A1A]">
                Nome do Produto *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A14A]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className="text-[#1A1A1A]">
                Marca *
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, brand: e.target.value }))
                }
                required
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A14A]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#1A1A1A]">
                Preço *
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="R$ 39,90"
                required
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A14A]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#1A1A1A]">
                Categoria *
              </Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="border-[#C9A14A]/30 focus:ring-[#C9A14A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Perfumes">Perfumes</SelectItem>
                  <SelectItem value="Body Splash">Body Splash</SelectItem>
                  <SelectItem value="Beleza">Beleza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subcategory" className="text-[#1A1A1A]">
                Subcategoria *
              </Label>
              <Select
                value={formData.subcategory}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, subcategory: value }))
                }
              >
                <SelectTrigger className="border-[#C9A14A]/30 focus:ring-[#C9A14A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getSubcategoryOptions().map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image" className="text-[#1A1A1A]">
                URL da Imagem *
              </Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="https://..."
                required
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A14A]"
              />
              {formData.image && (
                <div className="mt-2 p-2 border border-[#C9A14A]/20 rounded">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-[#1A1A1A]">
                Descrição *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                rows={3}
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A14A]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes" className="text-[#1A1A1A]">
                Principais Notas (Topo | Coração | Base)
              </Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Nota1, Nota2 | Nota3, Nota4 | Nota5, Nota6"
                className="border-[#C9A14A]/30 focus-visible:ring-[#C9A1A]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#C9A14A] hover:bg-[#B69142] text-white"
            >
              {product ? "Atualizar Produto" : "Adicionar Produto"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-[#C9A14A]/30"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
