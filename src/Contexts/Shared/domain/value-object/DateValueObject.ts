import { ValueObject } from './ValueObject'

export abstract class DateValueObject extends ValueObject<Date> {
  constructor(value: string | Date) {
    super(new Date(value))
  }
}
