import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";
import { DailyService } from "../domain/service";

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
    return this.nextApp.render(req, res, PATH)
  }

  @httpGet("/:year/:month/:date/:slug")
  public getDetailPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH_DETAIL);
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
}