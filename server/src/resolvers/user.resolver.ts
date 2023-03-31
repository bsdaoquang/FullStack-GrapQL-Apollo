import { Query, Resolver } from "type-graphql";
import { User } from "../schemas/user.schema";

@Resolver()
export default class UserResolver {
  @Query(() => User)
  me() {
    return {
      _id: '1',
      name: 'Dao Quang',
      email: 'bsdaoquang@gmail.com'
    };
  }

}