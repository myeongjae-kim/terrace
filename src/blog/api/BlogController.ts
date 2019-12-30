import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";
import { BlogArticleService } from "../domain/service";

const PATH = Endpoints.blog;
const PATH_DETAIL = Endpoints["blog.detail"];

@controller(PATH)
export class BlogController implements interfaces.Controller {

  constructor(
    @inject(TYPES.NextApplication) private nextApp: NextApplication,
    @inject(TYPES.BlogArticleService) private blogArticleService: BlogArticleService,
  ) { }

  @httpGet("/")
  public getPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH)
  }

  @httpGet("/:year/:month/:date/:slug")
  public getDetailPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH_DETAIL);
  }

  @httpGet("/api")
  public get() {
    return this.blogArticleService.findAll();
  }

  @httpGet("/api/:year/:month/:day/:slug")
  public getDetail(
    @requestParam("year") year: string,
    @requestParam("month") month: string,
    @requestParam("day") day: string,
    @requestParam("slug") slug: string,
  ) {
    return this.blogArticleService.find({ year, month, day, slug });
  }
}