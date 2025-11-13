import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const comandas = await prisma.order.findMany({
    take: 8,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return Response.json(comandas);
}
