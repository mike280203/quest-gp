import { prisma } from "../lib/prisma";

export function findCountries() {
  return prisma.track.findMany({
    select: { country: true },
    distinct: ["country"],
    orderBy: { country: "asc" },
  });
}
