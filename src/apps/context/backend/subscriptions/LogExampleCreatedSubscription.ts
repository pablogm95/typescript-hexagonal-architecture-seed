import { LogExampleCreation } from '@/Contexts/ContextExample/Example/application/LogCreation/LogExampleCreation'
import { ExampleCreatedDomainEvent } from '@/Contexts/ContextExample/Example/domain/ExampleCreatedDomainEvent'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import { DomainEventClass } from '@/Contexts/Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber'
import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'

export class LogExampleCreatedSubscription implements DomainEventSubscriber<ExampleCreatedDomainEvent> {
  private readonly events = new Set<DomainEventClass>([ExampleCreatedDomainEvent])
  private readonly action: UseCase

  constructor(action: LogExampleCreation) {
    this.action = action
  }

  subscribedTo(): Set<DomainEventClass> {
    return this.events
  }

  async on(domainEvent: ExampleCreatedDomainEvent): Promise<void> {
    try {
      await this.action.run({
        ...domainEvent.toPrimitives(),
        aggregateId: domainEvent.aggregateId,
      })
    } catch (error) {
      if (!(error instanceof AlreadyExistsError)) {
        throw error
      }
    }
  }
}
