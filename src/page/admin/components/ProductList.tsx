import { type Product } from "@/page/admin/service/productStore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
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

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <Card className="bg-white border-[#C9A14A]/30">
      <CardHeader>
        <CardTitle className="text-[#1A1A1A]">
          Produtos Cadastrados ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#C9A14A]/20">
                <TableHead className="text-[#1A1A1A]">Imagem</TableHead>
                <TableHead className="text-[#1A1A1A]">Nome</TableHead>
                <TableHead className="text-[#1A1A1A]">Marca</TableHead>
                <TableHead className="text-[#1A1A1A]">Preço</TableHead>
                <TableHead className="text-[#1A1A1A]">Categoria</TableHead>
                <TableHead className="text-[#1A1A1A]">Subcategoria</TableHead>
                <TableHead className="text-[#1A1A1A] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-[#666666] py-8"
                  >
                    Nenhum produto cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="border-[#C9A14A]/20">
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-[#1A1A1A]">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-[#666666]">
                      {product.brand}
                    </TableCell>
                    <TableCell className="text-[#C9A14A]">
                      {product.price}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#C9A14A] hover:bg-[#C9A14A] text-white">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-[#C9A14A]/30 text-[#666666]"
                      >
                        {product.subcategory}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(product)}
                          className="h-8 w-8 p-0 border-[#C9A14A]/30"
                        >
                          <Pencil className="h-4 w-4 text-[#C9A14A]" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-[#1A1A1A]">
                                Confirmar Exclusão
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-[#666666]">
                                Tem certeza que deseja excluir "{product.name}"?
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-[#C9A14A]/30">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(product.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
