import ProductoCard from "@/components/productos/ProductoCard";
import Titulo from "@/components/ui/Titulo";
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
      <div className=" relative min-h-screen">
        <div className="sticky top-0 z-10 bg-gray-100 p-4 py-3 px-4">
          <Titulo>Elije y personaliza tu pedido a Continuacion</Titulo>
        </div>

        <div className="pt-20 pb-8 px-4">
          <div className=" grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
            {products.map((product) => (
              <ProductoCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
