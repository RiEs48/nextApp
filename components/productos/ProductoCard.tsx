import type { Product } from "@/app/generated/prisma";
import { formatCurrency } from "@/src/utils";
import Image from "next/image";

type ProductCartProps = {
  product: Product;
};
export default function ProductoCard({ product }: ProductCartProps) {
  return (
    <div className="border bg-white">
      <Image
        width={500}
        height={400}
        src={`/products/${product.image}.jpg`}
        alt={`Imagen Platillo ${product.name}`}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <button
          type="button"
          className="bg-indigo-800 hover:bg-indigo-950 uppercase font-bold cursor-pointer text-white w-full mt-5 p-3"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
