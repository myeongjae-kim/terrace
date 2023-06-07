import { MusingStrapi } from "./MusingStrapi";

export interface MusingLoadPort {
  findAll(): Promise<MusingStrapi[]>
}
