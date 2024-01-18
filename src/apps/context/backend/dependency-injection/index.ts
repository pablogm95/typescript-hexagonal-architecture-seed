import Container from 'typedi'
import { MongoExampleRepository } from '@/Contexts/ContextExample/Example/infrastructure/persistence/MongoExampleRepository'
import { MongoConfigFactory } from '@/Contexts/ContextExample/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory'
import { PubSubEventBus } from '@/Contexts/Shared/infrastructure/EventBus/PubSub/PubSubEventBus'
import WinstonLogger from '@/Contexts/Shared/infrastructure/WinstonLogger'

// SHARED
Container.set('ContextExample.Shared.MongoConfig', MongoConfigFactory.createConfig())
Container.set(
  'ContextExample.Shared.ConnectionManager',
  MongoClientFactory.createClient('contextExample', Container.get('ContextExample.Shared.MongoConfig'))
)
Container.set('ContextExample.Shared.EventBus', new PubSubEventBus())
Container.set('Shared.Logger', new WinstonLogger())

// EXAMPLES
Container.set(
  'ContextExample.Example.ExampleRepository',
  new MongoExampleRepository(Container.get('ContextExample.Shared.ConnectionManager'))
)
