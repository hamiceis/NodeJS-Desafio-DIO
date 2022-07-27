import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken'
import userRepository from "../repositories/user.repository";


async function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {

  try {

    const authorizationHeader = req.headers['authorization']

    if(!authorizationHeader) {
      throw new ForbiddenError('Credencias não informadas')
    }

    const [ authenticationType, token ] = authorizationHeader.split(' ')

    if(authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválida')
    }

    const tokenPayload = JWT.verify(token, 'my_secret_key')

    if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválida')
    }

    const uuid = tokenPayload.sub;
    const user = await userRepository.findById(uuid)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }

}


export default jwtAuthMiddleware;