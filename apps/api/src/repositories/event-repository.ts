import { prisma } from "../lib/prisma";

export type EventFilters = {
  seriesId?: string;
  country?: string;
  from?: string;
  to?: string;
};

export type EventPagination = {
  take: number;
  cursor?: string;
};

export function findEvents(filters: EventFilters, pagination: EventPagination) {
  const { seriesId, country, from, to } = filters;

  return prisma.event.findMany({
    take: pagination.take,
    skip: pagination.cursor ? 1 : undefined,
    cursor: pagination.cursor ? { id: pagination.cursor } : undefined,
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
    orderBy: [{ startDate: "asc" }, { id: "asc" }],
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

export function findEventCursorById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    select: { id: true },
  });
}
