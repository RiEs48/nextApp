import OrdenCarrito from "@/components/ordenes/OrdenCarrito";
import Titulo from "@/components/ui/Titulo";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
  //consulta para traer de la base de datos con prisma
  const ordenes = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return ordenes;
}

export default async function OrdenesPage() {
  const ordenes = await getPendingOrders();
  return (
    <>
      <Titulo>Administra Tus Ordenes</Titulo>
      {ordenes.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {ordenes.map((order) => (
            <OrdenCarrito key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay Ordenes Pendientes</p>
      )}
    </>
  );
}
