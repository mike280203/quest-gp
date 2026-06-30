import { prisma } from "../lib/prisma";

export function findTracks() {
  return prisma.track.findMany({
    orderBy: [{ country: "asc" }, { name: "asc" }],
  });
}

export function findTrackById(id: string) {
  return prisma.track.findUnique({
    where: { id },
    include: {
      events: {
        orderBy: { startDate: "asc" },
        include: { series: true },
      },
    },
  });
}
