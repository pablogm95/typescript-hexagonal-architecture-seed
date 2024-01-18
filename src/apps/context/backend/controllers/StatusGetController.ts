import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import { Service } from 'typedi'

@Service()
export class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ status: 'Alive' })
  }
}
