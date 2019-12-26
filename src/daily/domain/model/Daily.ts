import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Daily {

  public static from({ seq, createdAt, updatedAt, title, content }: Omit<Daily, "id">): Daily {
    const daily = new Daily();
    daily.seq = seq;
    daily.createdAt = createdAt;
    daily.updatedAt = updatedAt;
    daily.title = title;
    daily.content = content;

    return daily;
  }

  @PrimaryGeneratedColumn()
  public id!: string

  @Column()
  public seq!: number

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date

  @Column()
  public title!: string

  @Column('text')
  public content!: string
}