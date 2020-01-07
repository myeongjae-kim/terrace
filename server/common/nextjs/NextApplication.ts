import { Request } from 'express';
import { ServerResponse } from 'http';
import { injectable } from 'inversify';
import Server from 'next/dist/next-server/server/next-server';
import { ParsedUrlQuery } from 'querystring';
import { CacheRenderingService } from 'src/common/domain/service';

@injectable()
export class NextApplication {

  public handle = this.app.getRequestHandler();

  public constructor(
    private cacheRenderingService: CacheRenderingService,
    private app: Server
  ) { }

  public render = async (
    isCacheRenderingEnabled: boolean,
    req: Request,
    res: ServerResponse,
    pathname: string,
    query?: ParsedUrlQuery,
    amp?: {
      amphtml?: boolean;
      hasAmp?: boolean;
      dataOnly?: boolean;
    }
  ): Promise<string | null> => {
    const renderToHTML = () => this.app.renderToHTML(req, res, pathname, query, amp);
    if (!isCacheRenderingEnabled) {
      return renderToHTML();
    }

    const path = req.path;
    const cached = this.cacheRenderingService.findByPath(path)

    if (cached.isPresent()) {
      res.setHeader('X-Cache', 'HIT');
      return cached.get();
    } else {
      res.setHeader('X-Cache', 'MISS');
    }

    const html = await renderToHTML();
    if (html) {
      this.cacheRenderingService.save(path, html);
    }

    return html;
  }
}