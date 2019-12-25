import { Repository } from "typeorm";
import { Musing } from "./Musing";

export interface MusingRepository extends Repository<Musing> { }