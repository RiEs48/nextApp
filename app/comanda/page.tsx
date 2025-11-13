"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import React from "react";

import type { OrderConProductos } from "@/src/types";
import ComandaItem from "@/components/ordenes/ComandaItem";

export default function OrdenesPantallaPage() {
  const url = "comanda/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, isLoading } = useSWR<OrderConProductos[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (isLoading) return <p> Cargando Un Momento Por favor </p>;
  if (data)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes Listas
        </h1>
        <Logo />
        {data.length ? (
          <div className="grid  grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <ComandaItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay Ordenes Aun </p>
        )}
      </>
    );
}
