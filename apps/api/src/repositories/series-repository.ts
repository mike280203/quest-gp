import { prisma } from "../lib/prisma";

export function findSeries() {
  return prisma.series.findMany({
    orderBy: { name: "asc" },
  });
}

export function findSeriesById(id: string) {
  return prisma.series.findUnique({
    where: { id },
    include: {
      events: {
        orderBy: { startDate: "asc" },
        include: { track: true },
      },
    },
  });
}
