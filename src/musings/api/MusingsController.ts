import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";
import { MusingService } from "../domain/service";

const PATH = Endpoints.musings;

@controller(PATH)
export class MusingsController implements interfaces.Controller {

  constructor(
    @inject(TYPES.NextApplication) private nextApp: NextApplication,
    @inject(TYPES.MusingService) private musingService: MusingService
  ) { }

  @httpGet("/")
  public getPage(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH)
  }

  @httpGet("/api")
  public get() {
    return this.musingService.findAll();
  }
}