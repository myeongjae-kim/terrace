import { formatDateTime } from "src/util";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Daily {

  public static from({ seq, createdAt, updatedAt, title, content, slug }: Omit<Daily, "id">): Daily {
    const daily = new Daily();
    daily.seq = seq;
    daily.createdAt = createdAt;
    daily.updatedAt = updatedAt;
    daily.title = title;
    daily.content = content;
    daily.slug = slug;

    return daily;
  }

  @PrimaryGeneratedColumn()
  public id!: string

  @Column()
  @Index("ux_daily_seq", { unique: true })
  public seq!: number

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date

  @Column()
  public title!: string

  @Column()
  @Index("ux_daily_slug", { unique: true })
  public slug!: string

  @Column('text')
  public content!: string

  public getUri = () => {
    return "/daily" + formatDateTime(this.createdAt, "/YYYY/MM/DD/") + this.slug;
  }
}