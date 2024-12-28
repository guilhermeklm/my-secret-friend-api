import { User } from "../user";

export interface UserRepository {
  create(user: User): Promise<string>
  existsByEmail(userId: string): Promise<boolean>
}