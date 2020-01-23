import bcrypt from "bcryptjs";
import { injectable } from "inversify";

export interface PasswordEncoder {
  encode(input: string): Promise<string>
  match(actual: string, encoded: string): Promise<boolean>
}

@injectable()
export class BCryptPasswordEncoder implements PasswordEncoder {

  public encode = (input: string): Promise<string> => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(input, salt));
  }

  public match = (actual: string, encoded: string): Promise<boolean> => {
    return bcrypt.compare(actual, encoded);
  }
}