export type PageProps<T = object> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};
