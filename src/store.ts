import { create } from 'zustand'
import type { OrdenItem } from './types'
import type { Product } from '@/app/generated/prisma'

interface Store {
    orden: OrdenItem[]
    addToOrden: (product: Product) => void
    incrementarCantidad: (id: Product['id']) => void
    decrementarCantidad: (id: Product['id']) => void
    eliminarItem: (id: Product['id']) => void
    clearOrder: () => void
}
export const useStore = create<Store>((set, get) => ({
    orden: [],
    addToOrden: (product) => {

        const { categoryId, image, ...data } = product
        let orden: OrdenItem[] = []
        if (get().orden.find(item => item.id === product.id)) {
            orden = get().orden.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)

        } else {
            orden = [...get().orden, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]

        }

        set(() => ({
            orden: orden

        }))

    },
    incrementarCantidad: (id) => {
        set((state) => ({
            orden: state.orden.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decrementarCantidad: (id) => {

        const orden = get().orden.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)
        set(() => ({
            orden
        }))

    },
    eliminarItem: (id) => {
        set((state) => ({
            orden: state.orden.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            orden: []
        }))
    }

}))