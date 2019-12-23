import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "server/common/inversify/types";
import { NextApplication } from "server/common/nextjs/NextApplication";

const PATH = "/";

@controller(PATH)
export class CommonController implements interfaces.Controller {

  constructor(@inject(TYPES.NextApplication) private nextApplication: NextApplication) { }

  @httpGet("/")
  public get(@request() req: Request, @response() res: Response) {
    return this.nextApplication.render(req, res, PATH)
  }
}