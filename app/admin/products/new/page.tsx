import AddProductForm from "@/components/productos/AddProductForm";
import ProductForm from "@/components/productos/ProductForm";
import Titulo from "@/components/ui/Titulo";

export default function CreateProductPage() {
  return (
    <>
      <Titulo>Nuevo Producto</Titulo>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
