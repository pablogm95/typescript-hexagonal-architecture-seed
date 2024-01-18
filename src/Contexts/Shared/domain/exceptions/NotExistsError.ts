import { CustomError } from './CustomError'

export class NotExistsError extends CustomError {
  /**
   * @param {string} message Internal message
   */
  constructor(message = 'Not found') {
    super(message)
  }
}
