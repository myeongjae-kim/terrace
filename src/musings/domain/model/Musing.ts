export class Musing {

  public static from({ quote, from, language }: Omit<Musing, "id">) {
    const obj = new Musing();
    obj.quote = quote;
    obj.from = from;
    obj.language = language;

    return obj;
  }

  public id!: string;
  public quote!: string;
  public from!: string;
  public language!: "EN" | "KO";
}
