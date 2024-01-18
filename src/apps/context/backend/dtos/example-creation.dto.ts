import { z } from 'zod'
import { DataTransferObject } from '@/Contexts/Shared/domain/DataTransferObject'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'

interface IExampleCreationDTOResult {
  id: string
  title: string
  description: string
  email: string
}

interface IFeedCreationDTOParameters {
  id: string
  title: string
  description: string
  email: string
}

const schema = z.object({
  id: z.string().uuid(),
  title: z.string().trim(),
  description: z.string().trim(),
  email: z.string().email(),
})

export class ExampleCreationDTO implements DataTransferObject<IExampleCreationDTOResult> {
  id: string
  title: string
  description: string
  email: string

  constructor({ id, title, description, email }: IFeedCreationDTOParameters) {
    this.id = id
    this.title = title
    this.description = description
    this.email = email
  }

  sanitize() {
    const result = schema.safeParse({
      id: this.id,
      title: this.title,
      description: this.description,
      email: this.email,
    })

    if (!result.success) {
      throw new PropertyRequiredError(result.error.message)
    } else {
      return result.data
    }
  }
}
