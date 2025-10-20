import { Product, type Order, type OrderProducts } from "@/app/generated/prisma";

export type OrdenItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}
export type OrderConProductos = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}