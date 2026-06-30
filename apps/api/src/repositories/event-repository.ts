import { prisma } from "../lib/prisma";

export type EventFilters = {
  seriesId?: string;
  country?: string;
  from?: string;
  to?: string;
};

export function findEvents(filters: EventFilters) {
  const { seriesId, country, from, to } = filters;

  return prisma.event.findMany({
    where: {
      seriesId,
      startDate: from ? { gte: new Date(from) } : undefined,
      endDate: to ? { lte: new Date(to) } : undefined,
      track: country
        ? {
            country: {
              equals: country,
              mode: "insensitive",
            },
          }
        : undefined,
    },
    include: {
      series: true,
      track: true,
    },
    orderBy: { startDate: "asc" },
  });
}

export function findEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      series: true,
      track: true,
    },
  });
}
