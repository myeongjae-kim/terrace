import {About} from "../../../domain/About";

export interface AboutLoadPort {
  get(): Promise<About>
}
