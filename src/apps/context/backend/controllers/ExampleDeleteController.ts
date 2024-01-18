import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { DeleteExample } from '@/Contexts/ContextExample/Example/application/Delete/DeleteExample'

@Service()
export class ExampleDeleteController implements Controller {
  async run(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params

    await Container.get(DeleteExample).run(id)

    res.status(StatusCodes.NO_CONTENT).end()
  }
}
