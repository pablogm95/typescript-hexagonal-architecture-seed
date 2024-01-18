import { Inject, Service } from 'typedi'
import { UseCase } from '@/Contexts/Shared/application/UseCase'
import Logger from '@/Contexts/Shared/domain/Logger'

@Service()
export class LogExampleCreation implements UseCase {
  @Inject('Shared.Logger')
  private readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  async run(message: unknown): Promise<void> {
    this.logger.info(`Entity created: ${JSON.stringify(message)}`)
  }
}
