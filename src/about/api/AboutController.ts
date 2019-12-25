import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";
import { Endpoints } from "src/common/constants/Constants";

const PATH = Endpoints.about;

@controller(PATH)
export class AboutController implements interfaces.Controller {

  constructor(@inject(TYPES.NextApplication) private nextApp: NextApplication) { }

  @httpGet("/")
  public get(@request() req: Request, @response() res: Response) {
    return this.nextApp.render(req, res, PATH)
  }
}