import type { EventFilters } from "../repositories/event-repository";
import { findEventById, findEventCursorById, findEvents } from "../repositories/event-repository";

export type EventPageOptions = {
  limit: number;
  cursor?: string;
};

export async function listEvents(filters: EventFilters, pageOptions: EventPageOptions) {
  if (pageOptions.cursor) {
    const cursorEvent = await findEventCursorById(pageOptions.cursor);

    if (!cursorEvent) {
      return null;
    }
  }

  const events = await findEvents(filters, {
    take: pageOptions.limit + 1,
    cursor: pageOptions.cursor,
  });
  const hasNextPage = events.length > pageOptions.limit;
  const data = hasNextPage ? events.slice(0, pageOptions.limit) : events;
  const nextCursor = hasNextPage ? (data.at(-1)?.id ?? null) : null;

  return {
    data,
    pageInfo: {
      nextCursor,
      hasNextPage,
    },
  };
}

export function getEventById(id: string) {
  return findEventById(id);
}
