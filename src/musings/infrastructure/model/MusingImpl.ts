import { Musing } from 'src/musings/domain/model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("musing")
export class MusingImpl implements Musing {

  public static from({ quote, from, language }: Omit<MusingImpl, "id">) {
    const obj = new MusingImpl();
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
  public quote: string = '';

  @Column()
  public from: string = '';

  @Column()
  public language: 'EN' | 'KO' = 'EN';

}