import { Example } from '@/Contexts/ContextExample/Example/domain/Example'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'

export interface IExampleOutputDTOResult {
  id: string
  title: string
  description: string
  email: string
}

export class ExampleOutputDTO implements DataTransferObject<IExampleOutputDTOResult> {
  private readonly example: Example

  constructor(example: Example) {
    this.example = example
  }

  sanitize() {
    return {
      ...this.example.toPrimitives(),
    }
  }
}
