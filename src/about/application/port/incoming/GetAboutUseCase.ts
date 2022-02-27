import {About} from "../../../domain/About";

export interface GetAboutUseCase {
  get(): Promise<About>
}
