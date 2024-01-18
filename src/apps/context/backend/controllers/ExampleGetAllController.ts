import { Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import { Controller } from './Controller'
import Container, { Service } from 'typedi'
import { ExamplesOutputDTO } from '../dtos/examples-output.dto'
import { GetAllExamples } from '@/Contexts/ContextExample/Example/application/GetAll/GetExamples'

@Service()
export class ExampleGetAllController implements Controller {
  async run(req: Request, res: Response) {
    const result = await Container.get(GetAllExamples).run()

    const response = new ExamplesOutputDTO(result).sanitize()

    res.status(StatusCodes.OK).json(response)
  }
}
