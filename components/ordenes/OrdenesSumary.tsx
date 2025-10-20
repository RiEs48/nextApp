"use client";
import { useStore } from "@/src/store";
import React, { useMemo } from "react";
import ProductosDetalles from "./ProductosDetalles";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-actions";
import { ordenSquema } from "@/src/squema";
import { toast } from "react-toastify";

export default function OrdenesSumary() {
  const order = useStore((state) => state.orden);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = ordenSquema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issues) => {
        toast.error(issues.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (!response?.errors) {
      response?.errors.forEach((issues) => {
        toast.error(issues.message);
      });
    }
    toast.success("Perdido Realizado Correctamente");
    clearOrder();
  };
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El Pedido Esta Vacio esta Vacio </p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductosDetalles key={item.id} item={item} />
          ))}
          <p className="text-2xl text-center mt-20">
            Total a Pagar :{""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="bg-white border border-gray-200 p-2 w-full"
              name="name"
            />
            <input
              type="submit"
              className="uppercase rounded-sm text-white bg-black py-5 text-center cursor-pointer w-full font-bold"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
