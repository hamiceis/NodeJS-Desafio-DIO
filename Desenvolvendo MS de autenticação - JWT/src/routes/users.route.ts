import { NextFunction, Request, Response, Router } from "express";
import { CREATED, INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRoute = Router()


usersRoute.get('/users', async (req :Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.status(OK).send(users)
})

usersRoute.get('/users/:uuid', async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid
    const user = await userRepository.findById(uuid)
    res.status(OK).send(user)
  } catch(erro) {
    next(erro)
  }
})

usersRoute.post('/users', async (req :Request, res: Response, next: NextFunction) => {
  const newUser = req.body;
  const uuid = await userRepository.create(newUser)
  res.status(CREATED).send(uuid)
})

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const modifiedUser = req.body

  modifiedUser.uuid = uuid;

  await userRepository.update(modifiedUser)
  res.status(OK).send()
})

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string}>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid

  await userRepository.remove(uuid)
  res.sendStatus(OK)
})

export { usersRoute };
