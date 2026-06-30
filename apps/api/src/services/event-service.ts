import type { EventFilters } from "../repositories/event-repository";
import { findEventById, findEvents } from "../repositories/event-repository";

export function listEvents(filters: EventFilters) {
  return findEvents(filters);
}

export function getEventById(id: string) {
  return findEventById(id);
}
