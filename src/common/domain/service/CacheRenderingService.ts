import Optional from "optional-js";

export interface CacheRenderingService {
  findByPath(path: string): Optional<string>;
  save(path: string, html: string): void;
}