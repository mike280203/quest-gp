import { z } from "zod";

export const uuidSchema = z.uuid();

export const dateStringSchema = z.iso.datetime({ offset: true }).or(z.iso.date());
