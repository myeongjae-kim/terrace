import {formatDateTime} from "src/util";

export class BlogArticle {
  public static createUri = ({createdAt, slug}: {createdAt: string, slug: string}) =>
    "/blog" + formatDateTime(createdAt, "/YYYY/MM/DD/") + slug;
}
