import type { ReactNode } from "react";

export default function Titulo({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl my-10">{children}</h1>;
}
