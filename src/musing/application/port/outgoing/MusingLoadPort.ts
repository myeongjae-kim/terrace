import { Musing } from "./Musing";

export interface MusingLoadPort {
  findAll(): Promise<Musing[]>
}
