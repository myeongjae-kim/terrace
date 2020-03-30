export interface PasswordEncoder {
  encode(input: string): Promise<string>;
  match(actual: string, encoded: string): Promise<boolean>;
}
