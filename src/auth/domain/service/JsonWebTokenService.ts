import { injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { TokenService } from "./TokenService";

const JWT_SECRET = process.env.JWT_SECRET;

@injectable()
export class JsonWebTokenService implements TokenService<any> {
  public generate = (origin: any): Promise<string> => new Promise<string>((resolve, reject) => {
    jwt.sign(origin, JWT_SECRET!, { expiresIn: "10s" }, (err, token) => {
      if (!token) {
        reject(err)
        return;
      }

      resolve(token);
    });
  });

  public verify = (token: string): Promise<any> => new Promise<any>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET!, (err, decoded) => {
      if (!decoded) {
        reject(err)
        return;
      }

      resolve(decoded);
    })
  });
}