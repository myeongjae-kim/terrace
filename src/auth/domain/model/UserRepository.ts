import Optional from "optional-js";
import { Repository } from "typeorm";
import { User } from ".";

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<Optional<User>>;
}