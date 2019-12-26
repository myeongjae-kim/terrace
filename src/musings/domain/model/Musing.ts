import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Musing {

  public static from({ quote, from, language }: Omit<Musing, "id">) {
    const obj = new Musing();
    obj.quote = quote;
    obj.from = from;
    obj.language = language;

    return obj;
  }

  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  public id!: string;

  @Column({
    type: 'text'
  })
  public quote!: string;

  @Column()
  public from!: string;

  @Column()
  public language!: 'EN' | 'KO';

}