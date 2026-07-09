export type Brand<T, TBrand extends string> = T & {
  readonly __brand: TBrand;
};

export type IsoDateTimeString = Brand<string, "IsoDateTimeString">;
