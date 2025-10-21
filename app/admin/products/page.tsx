import ProductSearchForm from "@/components/productos/ProductSearchForm";
import ProductsPagination from "@/components/productos/ProductsPagination";
import ProductTable from "@/components/productos/ProductsTable";
import Titulo from "@/components/ui/Titulo";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductsConCategoria = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNumber = page ? parseInt(page, 10) : 1;
  const pageSize = 10;
  if (pageNumber < 1) redirect("/admin/products");
  const productsData = getProducts(pageNumber, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (pageNumber > totalPages && totalPages > 0) {
    redirect("/admin/products");
  }

  return (
    <>
      <Titulo>Administrar Productos</Titulo>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>
      <ProductTable products={products} />
      <ProductsPagination page={pageNumber} totalPages={totalPages} />
    </>
  );
}
