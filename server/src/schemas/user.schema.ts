import {
  ReturnModelType,
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
} from '@typegoose/typegoose'
import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import bcrypt from 'bcrypt'
import { AsQueryMethod } from '@typegoose/typegoose/lib/types'

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelper>,
  email: User['email'],
) {
  return this.findOne({ email })
}

interface QueryHelper {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

@pre<User>('save', async function () {
  // Check that password is being modified

  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(this.password, salt)

  this.password = hash
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string

  @Field(() => String)
  @prop({ required: true })
  name: string

  @Field(() => String)
  @prop({ required: true })
  email: string

  @prop({ required: true })
  password: string
}

export const UserModel = getModelForClass<typeof User, QueryHelper>(User)

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @IsEmail()
  @Field(() => String)
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(20, {
    message: 'Password must not be longer than 20 characters',
  })
  @Field(() => String)
  password: string
}

@InputType()
export class LoginInput {
  @IsEmail()
  @prop({ required: true })
  @Field(() => String)
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @MaxLength(20, {
    message: 'Password must not be longer than 20 characters',
  })
  @Field(() => String)
  password: string
}
