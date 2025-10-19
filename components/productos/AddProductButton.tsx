"use client";

import type { Product } from "@/app/generated/prisma";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
};
export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrden = useStore((state) => state.addToOrden);
  return (
    <button
      type="button"
      className="bg-indigo-800 hover:bg-indigo-950 uppercase font-bold cursor-pointer text-white w-full mt-5 p-3"
      onClick={() => addToOrden(product)}
    >
      Agregar
    </button>
  );
}
