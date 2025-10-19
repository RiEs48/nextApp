import ProductoCard from "@/components/productos/ProductoCard";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

export default async function OrdenesPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <>
      <h1 className="text-2xl my-10">
        Elige y Personaliza Tu Pedido a Continuacion
      </h1>
      <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start ">
        {products.map((product) => (
          <ProductoCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
