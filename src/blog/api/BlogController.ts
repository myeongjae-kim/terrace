import assert from 'assert-plus';
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPut, interfaces, request, requestBody, requestParam, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";
import { BlogArticleService } from "../domain/service";
import { BlogArticleRequestDto } from "./dto";

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
    return this.nextApp.render(true, req, res, PATH)
  }

  @httpGet("/:year/:month/:date/:slug")
  public getDetailPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(true, req, res, PATH_DETAIL);
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

  @httpPut("/api/:year/:month/:day/:slug")
  public editDetail(
    @requestParam("year") year: string,
    @requestParam("month") month: string,
    @requestParam("day") day: string,
    @requestParam("slug") slug: string,
    @requestBody() body: BlogArticleRequestDto
  ) {
    assert.object(body, "body must be an object.");
    assert.number(body.seq, "body.seq must be a number.");
    assert.ok(body.title, "body.title must not be blank.");
    assert.ok(body.content, "body.content must not be blank.");
    assert.ok(body.slug, "body.slug must not be blank.");
    assert.ok(!body.slug.includes("/"), "body.slug must not include slashes.");

    return this.blogArticleService.update({ year, month, day, slug }, body);
  }
}