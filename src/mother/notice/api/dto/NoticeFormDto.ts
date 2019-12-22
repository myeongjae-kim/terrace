import Notice from "../../domain/model/Notice";

export default class NoticeFormDto {
  public static of = (notice: Notice) => {
    return new NoticeFormDto(notice);
  }

  public title: string = "";
  public content: string = "";

  public constructor({ title, content }: Notice) {
    this.title = title;
    this.content = content;
  }
}