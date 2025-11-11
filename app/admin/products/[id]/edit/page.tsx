import EditProductForm from "@/components/productos/EditProductForm";
import ProductForm from "@/components/productos/ProductForm";
import Titulo from "@/components/ui/Titulo";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProductsById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }
  return product;
}
export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductsById(+params.id);

  return (
    <>
      <Titulo>Editar Producto : {product.name}</Titulo>
      <Link
        href={"/admin/products"}
        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
      >
        Volver
      </Link>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
