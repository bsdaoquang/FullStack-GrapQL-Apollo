import { User } from '../schemas/user.schema'
import { Request, Response } from 'express'

interface Context {
  req: Request
  res: Response
  user: User | null
}

export default Context
