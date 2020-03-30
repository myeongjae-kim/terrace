export interface TokenService<T> {
  generate(origin: T): Promise<string>;
  verify(token: string): Promise<T>;
}