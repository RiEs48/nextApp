import ProductSearchForm from "@/components/productos/ProductSearchForm";
import ProductTable from "@/components/productos/ProductsTable";
import Titulo from "@/components/ui/Titulo";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const search = (await searchParams).search;
  const products = await searchProducts(search);
  return (
    <>
      <Titulo>Resultados De Busqueda : {search}</Titulo>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-2xl font-extrabold">No hay Resultados</p>
      )}
    </>
  );
}
