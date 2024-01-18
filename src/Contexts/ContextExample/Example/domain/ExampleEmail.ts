import { InvalidArgumentError } from '@/Contexts/Shared/domain/exceptions/InvalidArgumentError'
import { StringValueObject } from '@/Contexts/Shared/domain/value-object/StringValueObject'

export class ExampleEmail extends StringValueObject {
  private readonly validEmailRegExp: RegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValidEmail(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValidEmail(value: string): void {
    if (!this.validEmailRegExp.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }
}
