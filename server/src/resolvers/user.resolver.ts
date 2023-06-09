import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { CreateUserInput, LoginInput, User } from '../schemas/user.schema'
import UserService from '../service/user.service'
import Context from '../types/context'

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input)
  }

  @Mutation(() => String) // return JWT
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context)
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return {
      _id: '1',
      name: 'Dao Quang',
      email: 'dfasfjshj',
    }
  }
}
