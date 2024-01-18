import { Collection, Document, Filter, MongoClient, ObjectId } from 'mongodb'
import { AggregateRoot } from '../../../domain/AggregateRoot'

export abstract class MongoRepository<T extends AggregateRoot> {
  private _client: Promise<MongoClient>

  constructor(_client: Promise<MongoClient>) {
    this._client = _client
  }

  protected abstract collectionName(): string

  protected client(): Promise<MongoClient> {
    return this._client
  }

  protected async collection<D extends Document>(): Promise<Collection<D>> {
    return (await this._client).db().collection<D>(this.collectionName())
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined,
    }

    await collection.updateOne({ _id: id as unknown as ObjectId }, { $set: document }, { upsert: true })
  }

  protected async searchByQuery<D = unknown>(filter: Filter<Document>): Promise<D[]> {
    const collection = await this.collection()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await collection.find<any>(filter).toArray()
  }
}
