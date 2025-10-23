import type { Product } from "@/app/generated/prisma";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCartProps = {
  product: Product;
};
export default function ProductoCard({ product }: ProductCartProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="border bg-white">
      <Image
        width={500}
        height={400}
        src={imagePath}
        alt={`Imagen Platillo ${product.name}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
