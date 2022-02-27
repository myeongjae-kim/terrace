import {About} from "../../../domain/About";

export interface LoadAboutPort {
  get(): Promise<About>
}
