import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, requestParam, response, httpPost, requestBody, httpPut, httpDelete } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";
import { DailyService } from "../domain/service";
import { DailyRequestDto } from "./dto/DailyRequestDto";
import { CreationResponse } from "src/common/api/dto/CreationResponse";
import assert from "assert-plus";

const PATH = Endpoints.daily;
const PATH_DETAIL = Endpoints["daily.detail"];

@controller(PATH)
export class DailyController implements interfaces.Controller {

  constructor(
    @inject(TYPES.NextApplication) private nextApp: NextApplication,
    @inject(TYPES.DailyService) private dailyService: DailyService
  ) { }

  @httpGet("/")
  public getListPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(true, req, res, PATH);
  }

  @httpGet("/:year/:month/:date/:slug")
  public getDetailPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(true, req, res, PATH_DETAIL);
  }

  @httpPost("/api")
  public async postDetail(
    @requestBody() body: DailyRequestDto
  ): Promise<CreationResponse> {
    assert.object(body, "body must be an object.");
    assert.number(body.seq, "body.seq must be a number.");
    assert.ok(body.title, "body.title must not be blank.");
    assert.ok(body.content, "body.content must not be blank.");
    assert.ok(body.slug, "body.slug must not be blank.");
    assert.ok(!body.slug.includes("/"), "body.slug must not include slashes.");

    return {
      id: await this.dailyService.create(body)
    };
  }

  @httpGet("/api")
  public get() {
    return this.dailyService.findAll();
  }

  @httpGet("/api/:year/:month/:day/:slug")
  public getDetail(
    @requestParam("year") year: string,
    @requestParam("month") month: string,
    @requestParam("day") day: string,
    @requestParam("slug") slug: string,
  ) {
    return this.dailyService.find({ year, month, day, slug });
  }

  @httpPut("/api/:year/:month/:day/:slug")
  public editDetail(
    @requestParam("year") year: string,
    @requestParam("month") month: string,
    @requestParam("day") day: string,
    @requestParam("slug") slug: string,
    @requestBody() body: DailyRequestDto
  ) {
    assert.object(body, "body must be an object.");
    assert.number(body.seq, "body.seq must be a number.");
    assert.ok(body.title, "body.title must not be blank.");
    assert.ok(body.content, "body.content must not be blank.");
    assert.ok(body.slug, "body.slug must not be blank.");
    assert.ok(!body.slug.includes("/"), "body.slug must not include slashes.");

    return this.dailyService.update({ year, month, day, slug }, body);
  }

  @httpDelete("/api/:year/:month/:day/:slug")
  public deleteDetail(
    @requestParam("year") year: string,
    @requestParam("month") month: string,
    @requestParam("day") day: string,
    @requestParam("slug") slug: string,
  ) {
    return this.dailyService.delete({ year, month, day, slug });
  }
}