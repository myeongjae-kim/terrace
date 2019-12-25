import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Musing {

  @PrimaryGeneratedColumn()
  public id: number = -1;

  @Column({
    type: 'text'
  })
  public quote: string = "";

  @Column()
  public from: string = "";

  @Column()
  public language: 'EN' | 'KO' = 'EN'

}