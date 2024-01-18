export abstract class EnumValueObject<T> {
  readonly value: T
  readonly validValues: T[]

  constructor(value: T, validValues: T[]) {
    this.value = value
    this.validValues = validValues
    this.checkValueIsValid(value)
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value)
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void

  equals(other: EnumValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value
  }
}
