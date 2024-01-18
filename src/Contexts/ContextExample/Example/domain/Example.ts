import { AggregateRoot } from '@/Contexts/Shared/domain/AggregateRoot'
import { ExampleId } from './ExampleId'
import { ExampleTitle } from './ExampleTitle'
import { ExampleDescription } from './ExampleDescription'
import { ExampleDate } from './ExampleDate'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'
import { ExampleCreatedDomainEvent } from './ExampleCreatedDomainEvent'
import { ExampleEmail } from './ExampleEmail'

export class Example extends AggregateRoot {
  public readonly id: ExampleId
  private title: ExampleTitle
  private description: ExampleDescription
  private email: ExampleEmail
  private updatedAt: ExampleDate
  private readonly createdAt: ExampleDate

  constructor({
    id,
    title,
    description,
    email,
    updatedAt,
    createdAt,
  }: {
    id: ExampleId
    title: ExampleTitle
    description: ExampleDescription
    email: ExampleEmail
    updatedAt: ExampleDate
    createdAt: ExampleDate
  }) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.email = email
    this.updatedAt = updatedAt
    this.createdAt = createdAt
  }

  static create({
    id,
    title,
    description,
    email,
  }: {
    id?: string
    title: string
    description: string
    email: string
  }): Example {
    const now = new Date()

    const example = new Example({
      id: new ExampleId(id ?? Uuid.random().value),
      title: new ExampleTitle(title),
      description: new ExampleDescription(description),
      email: new ExampleEmail(email),
      updatedAt: new ExampleDate(now),
      createdAt: new ExampleDate(now),
    })

    // Domain event when required
    example.record(
      new ExampleCreatedDomainEvent({
        aggregateId: example.id.value,
        title: example.title.value,
        description: example.description.value,
        email: example.email.value,
        createdAt: example.createdAt.value,
        updatedAt: example.updatedAt.value,
      })
    )

    return example
  }

  static fromPrimitives(plainData: {
    id: string
    title: string
    description: string
    email: string
    updatedAt: string | Date
    createdAt: string | Date
  }): Example {
    return new Example({
      id: new ExampleId(plainData.id ?? Uuid.random().value),
      title: new ExampleTitle(plainData.title),
      description: new ExampleDescription(plainData.description),
      email: new ExampleEmail(plainData.email),
      updatedAt: new ExampleDate(plainData.updatedAt),
      createdAt: new ExampleDate(plainData.createdAt),
    })
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      email: this.email.value,
      updatedAt: this.updatedAt.value,
      createdAt: this.createdAt.value,
    }
  }
}
