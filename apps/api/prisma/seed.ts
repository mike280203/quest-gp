import { prisma } from "../src/lib/prisma";

const seriesSeeds = [
  {
    name: "Formula 1",
    slug: "formula-1",
    description: "The top international single-seater racing championship.",
  },
  {
    name: "FIA World Endurance Championship",
    slug: "wec",
    description: "Global endurance racing championship featuring prototype and GT cars.",
  },
  {
    name: "IMSA SportsCar Championship",
    slug: "imsa",
    description: "North American sports car championship with endurance classics.",
  },
  {
    name: "DTM",
    slug: "dtm",
    description: "German-based GT racing championship with iconic European tracks.",
  },
  {
    name: "MotoGP",
    slug: "motogp",
    description: "The premier motorcycle road racing world championship.",
  },
  {
    name: "GT World Challenge Europe",
    slug: "gt-world-challenge-europe",
    description: "European GT3 championship with sprint and endurance races.",
  },
] as const;

const trackSeeds = [
  {
    name: "Circuit de la Sarthe",
    slug: "circuit-de-la-sarthe",
    city: "Le Mans",
    country: "France",
    latitude: "47.9500",
    longitude: "0.2070",
    description: "Legendary semi-permanent circuit known for the 24 Hours of Le Mans.",
  },
  {
    name: "Nuerburgring",
    slug: "nuerburgring",
    city: "Nuerburg",
    country: "Germany",
    latitude: "50.3356",
    longitude: "6.9475",
    description: "Historic German racing venue with Grand Prix circuit and Nordschleife.",
  },
  {
    name: "Circuit de Spa-Francorchamps",
    slug: "spa-francorchamps",
    city: "Stavelot",
    country: "Belgium",
    latitude: "50.4372",
    longitude: "5.9714",
    description: "Fast Ardennes circuit famous for Eau Rouge and endurance racing.",
  },
  {
    name: "Circuit de Monaco",
    slug: "circuit-de-monaco",
    city: "Monte Carlo",
    country: "Monaco",
    latitude: "43.7347",
    longitude: "7.4206",
    description: "Iconic street circuit through the streets of Monte Carlo.",
  },
  {
    name: "Daytona International Speedway",
    slug: "daytona-international-speedway",
    city: "Daytona Beach",
    country: "United States",
    latitude: "29.1852",
    longitude: "-81.0705",
    description: "American superspeedway and road course known for endurance racing.",
  },
  {
    name: "Silverstone Circuit",
    slug: "silverstone-circuit",
    city: "Silverstone",
    country: "United Kingdom",
    latitude: "52.0786",
    longitude: "-1.0169",
    description: "Classic British circuit and home of major international racing events.",
  },
] as const;

const eventSeeds = [
  {
    name: "Le Mans 24 Hours 2027",
    slug: "le-mans-24-hours-2027",
    description: "MVP sample event for the classic French endurance race.",
    startDate: "2027-06-12T14:00:00.000Z",
    endDate: "2027-06-13T14:00:00.000Z",
    seriesSlug: "wec",
    trackSlug: "circuit-de-la-sarthe",
    officialUrl: "https://www.24h-lemans.com/",
  },
  {
    name: "Nuerburgring 24 Hours 2027",
    slug: "nuerburgring-24-hours-2027",
    description: "MVP sample event for the German endurance classic.",
    startDate: "2027-05-15T14:00:00.000Z",
    endDate: "2027-05-16T14:00:00.000Z",
    seriesSlug: "gt-world-challenge-europe",
    trackSlug: "nuerburgring",
    officialUrl: "https://www.24h-rennen.de/",
  },
  {
    name: "Monaco Grand Prix 2027",
    slug: "monaco-grand-prix-2027",
    description: "MVP sample event for the famous Monaco street race.",
    startDate: "2027-05-23T13:00:00.000Z",
    endDate: "2027-05-23T15:00:00.000Z",
    seriesSlug: "formula-1",
    trackSlug: "circuit-de-monaco",
    officialUrl: "https://www.formula1.com/",
  },
  {
    name: "Daytona 24 Hours 2027",
    slug: "daytona-24-hours-2027",
    description: "MVP sample event for the North American endurance opener.",
    startDate: "2027-01-30T18:00:00.000Z",
    endDate: "2027-01-31T18:00:00.000Z",
    seriesSlug: "imsa",
    trackSlug: "daytona-international-speedway",
    officialUrl: "https://www.imsa.com/",
  },
  {
    name: "Belgian Grand Prix 2027",
    slug: "belgian-grand-prix-2027",
    description: "MVP sample event at Spa-Francorchamps.",
    startDate: "2027-07-25T13:00:00.000Z",
    endDate: "2027-07-25T15:00:00.000Z",
    seriesSlug: "formula-1",
    trackSlug: "spa-francorchamps",
    officialUrl: "https://www.formula1.com/",
  },
  {
    name: "Silverstone MotoGP 2027",
    slug: "silverstone-motogp-2027",
    description: "MVP sample event for premier motorcycle racing in the UK.",
    startDate: "2027-08-08T12:00:00.000Z",
    endDate: "2027-08-08T14:00:00.000Z",
    seriesSlug: "motogp",
    trackSlug: "silverstone-circuit",
    officialUrl: "https://www.motogp.com/",
  },
] as const;

async function seedSeries() {
  const records = await Promise.all(
    seriesSeeds.map((series) =>
      prisma.series.upsert({
        where: { slug: series.slug },
        update: series,
        create: series,
        select: { id: true, slug: true },
      }),
    ),
  );

  return new Map(records.map((record) => [record.slug, record]));
}

async function seedTracks() {
  const records = await Promise.all(
    trackSeeds.map((track) =>
      prisma.track.upsert({
        where: { slug: track.slug },
        update: track,
        create: track,
        select: { id: true, slug: true },
      }),
    ),
  );

  return new Map(records.map((record) => [record.slug, record]));
}

async function seedEvents(
  seriesBySlug: Map<string, { id: string }>,
  tracksBySlug: Map<string, { id: string }>,
) {
  await Promise.all(
    eventSeeds.map((event) => {
      const series = seriesBySlug.get(event.seriesSlug);
      const track = tracksBySlug.get(event.trackSlug);

      if (!series || !track) {
        throw new Error(`Missing series or track for event seed: ${event.slug}`);
      }

      return prisma.event.upsert({
        where: { slug: event.slug },
        update: {
          name: event.name,
          description: event.description,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          officialUrl: event.officialUrl,
          seriesId: series.id,
          trackId: track.id,
        },
        create: {
          name: event.name,
          slug: event.slug,
          description: event.description,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          officialUrl: event.officialUrl,
          seriesId: series.id,
          trackId: track.id,
        },
      });
    }),
  );
}

async function main() {
  const seriesBySlug = await seedSeries();
  const tracksBySlug = await seedTracks();
  await seedEvents(seriesBySlug, tracksBySlug);

  const [seriesCount, trackCount, eventCount] = await Promise.all([
    prisma.series.count(),
    prisma.track.count(),
    prisma.event.count(),
  ]);

  console.log(`Seed complete: ${seriesCount} series, ${trackCount} tracks, ${eventCount} events.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
