import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

  public static from({
    createdAt,
    updatedAt,
    email,
    password
  }: Omit<User, "id">): User {
    const user = new User();
    user.createdAt = createdAt;
    user.updatedAt = updatedAt;
    user.email = email;
    user.password = password;

    return user;
  }

  @PrimaryGeneratedColumn()
  public id!: string

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date

  @Column()
  @Index("ux_user_email", { unique: true })
  public email!: string

  @Column()
  public password!: string
}