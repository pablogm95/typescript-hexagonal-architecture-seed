import { ExampleRepository } from '@/Contexts/ContextExample/Example/domain/ExampleRepository'
import { Example } from '@/Contexts/ContextExample/Example/domain/Example'
import { ExampleId } from '@/Contexts/ContextExample/Example/domain/ExampleId'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoRepository'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { ExampleFilters } from '@/Contexts/ContextExample/Example/domain/ExampleFilters'
import { Filter, Document } from 'mongodb'

interface ExampleDocument extends Document {
  _id: string
  title: string
  description: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class MongoExampleRepository extends MongoRepository<Example> implements ExampleRepository {
  protected collectionName(): string {
    return 'examples'
  }

  public save(example: Example): Promise<void> {
    return this.persist(example.id.value, example)
  }

  public async search(id: ExampleId): Promise<Nullable<Example>> {
    const collection = await this.collection<ExampleDocument>()
    const document = await collection.findOne({ _id: id.value })

    return document
      ? Example.fromPrimitives({
          id: id.value,
          title: document.title,
          description: document.description,
          email: document.email,
          updatedAt: document.updatedAt,
          createdAt: document.createdAt,
        })
      : null
  }

  public async searchBy(filters: ExampleFilters): Promise<Example[]> {
    const documents = await this.searchByQuery<ExampleDocument>(this.buildFilter(filters))

    return documents.map(document =>
      Example.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        email: document.email,
        updatedAt: document.updatedAt,
        createdAt: document.createdAt,
      })
    )
  }

  public async searchAll(): Promise<Example[]> {
    const collection = await this.collection()
    const documents = await collection.find<ExampleDocument>({}, {}).toArray()

    return documents.map(document =>
      Example.fromPrimitives({
        id: document._id,
        title: document.title,
        description: document.description,
        email: document.email,
        updatedAt: document.updatedAt,
        createdAt: document.createdAt,
      })
    )
  }

  public async delete(id: ExampleId): Promise<void> {
    const collection = await this.collection<ExampleDocument>()
    await collection.deleteOne({ _id: id.value })
  }

  /**
   * Create a query filter based on example filters
   * @param filterParams Example filters
   * @returns Filter Query
   */
  private buildFilter(filterParameters?: ExampleFilters): Record<string, unknown> {
    const filter: Filter<ExampleDocument> = {}

    if (filterParameters?.title) {
      filter.title = filterParameters.title.value
    }

    if (filterParameters?.startDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $gte: filterParameters.startDate.value,
      }
    }
    if (filterParameters?.endDate) {
      filter.newsDate = {
        ...filter.newsDate,
        $lte: filterParameters.endDate.value,
      }
    }

    return filter
  }
}
