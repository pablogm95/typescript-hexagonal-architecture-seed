import { CustomError } from './CustomError'

export class PropertyRequiredError extends CustomError {
  /**
   * @param {string} message Internal message
   */
  constructor(message = 'Property required') {
    super(message)
  }
}
