import { CustomError } from './CustomError'

export class InvalidArgumentError extends CustomError {
  /**
   * @param {string} message Internal message
   */
  constructor(message = 'Invalid argument') {
    super(message)
  }
}
