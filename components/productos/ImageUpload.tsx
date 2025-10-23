"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
export default function ImageUpload() {
  const [imageURL, setImageUrl] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="sgtq6a08"
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();

          setImageUrl(result.info?.secure_url);
        }
      }}
      options={{
        maxFiles: 1,
      }}
      onUpload={(error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          console.log("Image uploaded:", result);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800">
              Imagen Producto
            </label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600  bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className=" text-lg font-semibold">Agregar Imagen</p>
              {imageURL && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="Imagen de Producto"
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageURL}
                  />
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="image" value={imageURL} />
        </>
      )}
    </CldUploadWidget>
  );
}
