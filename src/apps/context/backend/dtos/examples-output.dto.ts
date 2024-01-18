import { Example } from '@/Contexts/ContextExample/Example/domain/Example'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { ExampleOutputDTO, IExampleOutputDTOResult } from './example-output.dto'

export class ExamplesOutputDTO implements DataTransferObject<IExampleOutputDTOResult[]> {
  private readonly example: ExampleOutputDTO[]

  constructor(example: Example[]) {
    this.example = example.map(feed => new ExampleOutputDTO(feed))
  }

  sanitize() {
    return this.example.map(feed => feed.sanitize())
  }
}
