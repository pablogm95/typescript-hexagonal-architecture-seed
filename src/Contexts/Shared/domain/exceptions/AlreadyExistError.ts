import { CustomError } from './CustomError'

export class AlreadyExistsError extends CustomError {
  /**
   * @param {string} message Internal message
   */
  constructor(message = 'Already exists') {
    super(message)
  }
}
