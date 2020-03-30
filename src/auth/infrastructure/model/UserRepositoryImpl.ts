import Optional from "optional-js";
import { User, UserRepository } from "src/auth/domain/model";
import { EntityRepository, getConnection, Repository } from "typeorm";

export const createUserRepositoryImpl = () => {
  const conn = getConnection();
  return conn.getCustomRepository(UserRepositoryImpl);
};

@EntityRepository(User)
class UserRepositoryImpl extends Repository<User> implements UserRepository {
  public findByEmail = (email: string): Promise<Optional<User>> =>
    this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne()
      .then(Optional.ofNullable);
}