import { prisma } from "@/src/lib/prisma";

export async function GET() {

    //consulta para traer de la base de datos con prisma
    const ordenes = await prisma.order.findMany({
        where: {
            status: false,
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                },
            },
        },
    });


    return Response.json(ordenes)

}
// export async function POST(params: type) {

// }