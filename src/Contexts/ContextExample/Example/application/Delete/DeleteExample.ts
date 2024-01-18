import { Inject, Service } from 'typedi'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { ExampleRepository } from '../../domain/ExampleRepository'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

@Service()
export class DeleteExample implements UseCase {
  @Inject('ContextExample.Example.ExampleRepository')
  private readonly exampleRepository: ExampleRepository

  constructor(exampleRepository: ExampleRepository) {
    this.exampleRepository = exampleRepository
  }

  async run(id: string): Promise<void> {
    await this.exampleRepository.delete(new Uuid(id))
  }
}
