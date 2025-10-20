"use server"

import { prisma } from "@/src/lib/prisma"
import { ordenSquema } from "@/src/squema"


export async function createOrder(data: unknown) {
    const result = ordenSquema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }

    }
    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity

                    }))
                }
            }
        })
    } catch (error) {

    }

}