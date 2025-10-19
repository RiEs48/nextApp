import { create } from 'zustand'
import type { OrdenItem } from './types'
import type { Product } from '@/app/generated/prisma'

interface Store {
    orden: OrdenItem[]
    addToOrden: (product: Product) => void
}
export const useStore = create<Store>((set) => ({
    orden: [],
    addToOrden: (product) => {

        const { categoryId, image, ...data } = product

        set((state) => ({
            orden: [...state.orden, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]

        }))

    }

}))