import { User } from "../user";

export interface UserRepository {
  create(user: User): Promise<string>
  existsByEmail(userId: string): Promise<boolean>
  existsUserByEmailAndPassword(email: string, password: string): Promise<boolean>
  findByEmailAndPassword(email: string, password: string): Promise<User>
}