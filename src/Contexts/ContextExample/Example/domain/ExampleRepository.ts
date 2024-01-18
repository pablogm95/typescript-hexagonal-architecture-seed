import { Example } from './Example'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { ExampleFilters } from './ExampleFilters'
import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

export interface ExampleRepository {
  save(example: Example): Promise<void>
  search(exampleId: Uuid): Promise<Nullable<Example>>
  searchAll(): Promise<Array<Example>>
  searchBy(filters: ExampleFilters): Promise<Array<Example>>
  delete(exampleId: Uuid): Promise<void>
}
