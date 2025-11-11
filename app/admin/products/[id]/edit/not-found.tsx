import Titulo from "@/components/ui/Titulo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center ">
      <Titulo>Producto No Encontrado </Titulo>
      <Link
        href="/admin/products"
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center cursor-pointer w-full lg:w-auto"
      >
        Ir a Productos
      </Link>
    </div>
  );
}
