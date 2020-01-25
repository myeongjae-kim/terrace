import bcrypt from "bcryptjs";
import { injectable } from "inversify";
import { PasswordEncoder } from ".";

@injectable()
export class BCryptPasswordEncoder implements PasswordEncoder {
  public encode = (input: string): Promise<string> => bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(input, salt));

  public match = (actual: string, encoded: string): Promise<boolean> => bcrypt.compare(actual, encoded);
}