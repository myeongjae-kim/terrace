import { Request } from "express";
import { interfaces } from "inversify-express-utils";

export interface AccessFilter {
  filter(req: Request, principal?: interfaces.Principal): Promise<void>;
}