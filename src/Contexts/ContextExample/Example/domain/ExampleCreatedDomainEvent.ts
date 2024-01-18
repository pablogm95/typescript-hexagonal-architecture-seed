import { DomainEvent } from '@/Contexts/Shared/domain/DomainEvent'

type ExampleCreatedDomainEventAttributes = {
  readonly title: string
  readonly description: string
  readonly email: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class ExampleCreatedDomainEvent extends DomainEvent implements ExampleCreatedDomainEventAttributes {
  static readonly EVENT_NAME = 'example.created'

  readonly title: string
  readonly description: string
  readonly email: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor({
    eventId,
    aggregateId,
    occurredOn,
    title,
    description,
    email,
    createdAt,
    updatedAt,
  }: {
    eventId?: string
    aggregateId: string
    occurredOn?: Date
    title: string
    description: string
    email: string
    createdAt: Date
    updatedAt: Date
  } & ExampleCreatedDomainEventAttributes) {
    super({ eventName: ExampleCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
    this.title = title
    this.description = description
    this.email = email
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  // public eventName(): string {
  //   return ExampleCreatedDomainEvent.EVENT_NAME
  // }

  toPrimitives(): ExampleCreatedDomainEventAttributes {
    const { title, description, email, createdAt, updatedAt } = this
    return { title, description, email, createdAt, updatedAt }
  }

  static fromPrimitives(parameters: {
    eventId: string
    aggregateId: string
    occurredOn: Date
    attributes: ExampleCreatedDomainEventAttributes
  }): ExampleCreatedDomainEvent {
    const { eventId, aggregateId, occurredOn, attributes } = parameters

    return new ExampleCreatedDomainEvent({
      ...attributes,
      eventId,
      aggregateId,
      occurredOn,
    })
  }
}
