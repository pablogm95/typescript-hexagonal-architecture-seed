import MongoConfig from '../../../../../Shared/infrastructure/persistence/mongo/MongoConfig'

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: process.env.MONGODB_URL!,
    }
  }
}
