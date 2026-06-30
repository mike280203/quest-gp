import { findSeries, findSeriesById } from "../repositories/series-repository";

export function listSeries() {
  return findSeries();
}

export function getSeriesById(id: string) {
  return findSeriesById(id);
}
