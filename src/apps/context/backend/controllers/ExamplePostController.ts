import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { ExampleCreationDTO } from '../dtos/example-creation.dto'
import { CreateExample } from '@/Contexts/ContextExample/Example/application/Create/CreateExample'

@Service()
export class ExamplePostController implements Controller {
  async run(req: Request, res: Response) {
    const exampleCreationDTO = new ExampleCreationDTO(req.body)

    await Container.get(CreateExample).run(exampleCreationDTO.sanitize())

    res.status(StatusCodes.CREATED).end()
  }
}
