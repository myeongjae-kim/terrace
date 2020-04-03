import { formatDateTime, getSeoulDateFrom } from "src/util";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Daily {

  public static from({
    seq,
    title,
    content,
    slug
  }: Pick<Daily, "seq" | "title" | "content" | "slug">): Daily {
    const daily = new Daily();
    daily.seq = seq;
    daily.title = title;
    daily.content = content;
    daily.slug = slug;

    return daily;
  }

  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  @Index("ux_daily_seq", { unique: true })
  public seq!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @Column()
  public title!: string;

  @Column()
  @Index("ux_daily_slug", { unique: true })
  public slug!: string;

  @Column("text")
  public content!: string;

  public getUri = () => {
    return "/daily" + formatDateTime(this.createdAt, "/YYYY/MM/DD/") + this.slug;
  };

  public isDateMatched = (year: string, month: string, day: string) => {
    const date = getSeoulDateFrom(this.createdAt);
    return date.year() === Number(year) &&
      date.month() === (Number(month) - 1) &&
      date.date() === Number(day);
  };

  public update = ({seq, title, content, slug}: Daily): void => {
    this.seq = seq;
    this.title = title;
    this.content = content;
    this.slug = slug;
  };
}