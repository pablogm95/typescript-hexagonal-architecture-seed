import { DomainEvent, DomainEventClass } from './DomainEvent'

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Set<DomainEventClass>
  on(domainEvent: T): Promise<void>
}
