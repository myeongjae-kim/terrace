import {About} from "../../../domain/About";

export interface AboutGetUseCase {
  get(): Promise<About>
}
