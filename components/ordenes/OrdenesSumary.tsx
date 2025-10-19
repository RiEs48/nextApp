"use client";
import { useStore } from "@/src/store";
import React from "react";
import ProductosDetalles from "./ProductosDetalles";

export default function OrdenesSumary() {
  const order = useStore((state) => state.orden);
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El Carrito esta Vacio </p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductosDetalles key={item.id} item={item} />
          ))}
        </div>
      )}
    </aside>
  );
}
