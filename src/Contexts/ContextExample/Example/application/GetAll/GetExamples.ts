import { Inject, Service } from 'typedi'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { ExampleRepository } from '../../domain/ExampleRepository'
import { Example } from '../../domain/Example'

@Service()
export class GetAllExamples implements UseCase {
  @Inject('ContextExample.Example.ExampleRepository')
  private readonly exampleRepository: ExampleRepository

  constructor(exampleRepository: ExampleRepository) {
    this.exampleRepository = exampleRepository
  }

  async run(): Promise<Example[]> {
    const examples = await this.exampleRepository.searchAll()
    return examples
  }
}
