import { Repository } from "typeorm";
import { Musing } from ".";

export interface MusingRepository extends Repository<Musing> { }