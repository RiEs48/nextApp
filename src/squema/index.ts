import { z } from 'zod'
export const ordenSquema = z.object({
    name: z.string().min(1, 'Nombre de Cliente Obligatorio'),
    total: z.number().min(1, 'Hay Errores En la Orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))

})
export const OrderIdSchema = z.object({
    orderId: z.string().transform((value) => parseInt(value)).refine(value => value > 0, { message: 'Hay Errores' })
})
