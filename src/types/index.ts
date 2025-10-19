import { Product } from "@/app/generated/prisma";

export type OrdenItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}