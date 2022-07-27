import { Request, Response, NextFunction, Router } from 'express'
import ForbiddenError from '../models/errors/forbidden.error.model'
import userRepository from '../repositories/user.repository'
import JWT from 'jsonwebtoken'
import { OK } from 'http-status-codes'
import { basicAuthMiddleware } from '../middlewares/basic-authorization.middleware'
import jwtAuthMiddleware from '../middlewares/jwt-authentication.middleware'

const authorizationRoute = Router()


authorizationRoute.post('/users', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    
  try {
    const user = req.user;

    if(!user) {
      throw new ForbiddenError('Usuário não informado')
    }
    const jwtPayload = { username : user.username }
    const jwtOptions = { subject: user?.uuid }
    const secretKey = 'my_secret_key'

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
    res.status(OK).json({ token: jwt })

  } catch (error) {
    next(error)
  }

})

authorizationRoute.post('/token/validate', jwtAuthMiddleware, (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(OK)
})


export default authorizationRoute;