"use client";
import useSWR from "swr";
import OrdenCarrito from "@/components/ordenes/OrdenCarrito";
import Titulo from "@/components/ui/Titulo";
import type { OrderConProductos } from "@/src/types";

export default function OrdenesPage() {
  const url = "/admin/ordenes/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderConProductos[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (isLoading) return "Cargando. un Momento Por Favor...";
  if (data)
    return (
      <>
        <Titulo>Administra Tus Ordenes</Titulo>
        {/* <form
      metodo para hacer refresh  y revalidar los datos
        action={async () => {
          "use server";
          revalidatePath("admin/orders");
        }}
      >
        <input type="submit" value="actualizar Ordenes Click" />
      </form> */}

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrdenCarrito key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p>No hay Ordenes Pendientes</p>
        )}
      </>
    );
}
