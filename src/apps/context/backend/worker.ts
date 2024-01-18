/* eslint-disable no-console */
import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import Container from 'typedi'
import { LogExampleCreatedSubscription } from './subscriptions/LogExampleCreatedSubscription'
import { LogExampleCreation } from '@/Contexts/ContextExample/Example/application/LogCreation/LogExampleCreation'

export class Worker {
  private readonly eventBus: EventBus

  constructor() {
    this.eventBus = Container.get('ContextExample.Shared.EventBus')
  }

  async start() {
    const subscribers = new Set<DomainEventSubscriber<DomainEvent>>([
      // Add subscription here
      new LogExampleCreatedSubscription(Container.get(LogExampleCreation)),
    ])

    await this.eventBus.addSubscribers(new Set(subscribers))

    console.info(`Worker is running in ${process.env.NODE_ENV} mode`)
  }
}
