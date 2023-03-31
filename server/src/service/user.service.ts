import { CreateUserInput, UserModel } from "../schemas/user.schema";

class UserService {
  async createUser(input: CreateUserInput) {
    // Call user module to create a user
    return UserModel.create(input);
  }
}

export default UserService;