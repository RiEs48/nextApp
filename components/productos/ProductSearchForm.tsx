"use client";
import { SearchSchema } from "@/src/squema";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter();
  const handlesearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form className="flex items-center" action={handlesearchForm}>
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 w-full bg-white border"
        name="search"
      />
      <input
        type="submit"
        value={"Buscar"}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  );
}
