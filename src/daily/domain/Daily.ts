import {formatDateTime} from "src/util";

export class Daily {
  public static createUri = ({createdAt, slug}: {createdAt: string, slug: string}) =>
    "/daily" + formatDateTime(createdAt, "/YYYY/MM/DD/") + slug;
}
