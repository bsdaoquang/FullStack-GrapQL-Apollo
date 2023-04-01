import { ApolloError } from 'apollo-server'
import { CreateUserInput, LoginInput, UserModel } from '../schemas/user.schema'
import Context from '../types/context'
import bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwt'

class UserService {
  async createUser(input: CreateUserInput) {
    // Call user module to create a user
    return UserModel.create(input)
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid email or password'
    // Get user by email
    const user = await UserModel.find().findByEmail(input.email).lean()
    if (!user) {
      throw new ApolloError(e)
    }
    // validate password

    const passwordValidate = await bcrypt.compare(input.password, user.password)
    if (!passwordValidate) {
      throw new ApolloError(e)
    }
    // signin with jwt
    const token = signJwt(user)

    // set a cookie for the jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'productions',
    })
    // return jwt

    return token
  }
}

export default UserService
