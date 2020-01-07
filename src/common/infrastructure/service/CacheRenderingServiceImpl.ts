import { injectable } from 'inversify';
import LRUCache from 'lru-cache';
import Optional from 'optional-js';
import { CacheRenderingService } from 'src/common/domain/service';

@injectable()
export class CacheRenderingServiceImpl implements CacheRenderingService {
  private ssrCache: LRUCache<string, string>;

  public constructor() {
    this.ssrCache = new LRUCache<string, string>({
      max: 100 * 1024 * 1024, /* cache size will be 100 MB using `return n.length` as length() function */
      length(n, _) {
        return n.length
      },
      maxAge: 1000 * 60
    });
  }

  public findByPath = (path: string): Optional<string> => Optional.ofNullable(this.ssrCache.get(path));
  public save = (path: string, html: string): void => {
    this.ssrCache.set(path, html)
  }
}