import NoticeFormDto from "./NoticeFormDto";

export default class NoticeRequestDto {
  public static of(noticeFormDto: NoticeFormDto) {
    return new NoticeRequestDto(noticeFormDto);
  }

  private _title: string = "";
  private _content: string = "";

  public get title() {
    return this._title;
  }

  public get content() {
    return this._content;
  }

  public constructor({ title, content }: NoticeFormDto) {
    this._title = title;
    this._content = content;
  }
}