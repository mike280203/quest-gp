import { findTrackById, findTracks } from "../repositories/track-repository";

export function listTracks() {
  return findTracks();
}

export function getTrackById(id: string) {
  return findTrackById(id);
}
