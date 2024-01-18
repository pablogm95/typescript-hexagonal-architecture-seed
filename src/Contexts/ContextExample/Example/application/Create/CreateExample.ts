import { Inject, Service } from 'typedi'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { ExampleRepository } from '../../domain/ExampleRepository'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import { Example } from '../../domain/Example'

@Service()
export class CreateExample implements UseCase {
  @Inject('ContextExample.Example.ExampleRepository')
  private readonly exampleRepository: ExampleRepository

  @Inject('ContextExample.Shared.EventBus')
  private readonly eventBus: EventBus

  constructor(exampleRepository: ExampleRepository, eventBus: EventBus) {
    this.exampleRepository = exampleRepository
    this.eventBus = eventBus
  }

  async run(exampleData: { id: string; title: string; description: string; email: string }): Promise<void> {
    const example = Example.create({
      id: exampleData.id,
      title: exampleData.title,
      description: exampleData.description,
      email: exampleData.email,
    })

    await this.exampleRepository.save(example)
    await this.eventBus.publish(example.pullDomainEvents())
  }
}
