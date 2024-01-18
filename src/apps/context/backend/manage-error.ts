import { AlreadyExistsError } from '@/Contexts/Shared/domain/exceptions/AlreadyExistError'
import { NotExistsError } from '@/Contexts/Shared/domain/exceptions/NotExistsError'
import { PropertyRequiredError } from '@/Contexts/Shared/domain/exceptions/PropertyRequiredError'
import { InvalidArgumentError } from '@/Contexts/Shared/domain/exceptions/InvalidArgumentError'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

/**
 * Handle HTTP errors
 * @param error Error catched
 * @param req App request
 * @param res App response
 * @param next NextFunction. Is not used but needed to know this middleware is an error handler
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  // error.constructor is the same that instanceof Error
  // If the instance of the error is a business exception, return a custom message
  switch (error.constructor) {
    case AlreadyExistsError:
      return res.status(StatusCodes.CONFLICT).json(error.message)
    case NotExistsError:
    case InvalidArgumentError:
      return res.status(StatusCodes.BAD_REQUEST).json(error.message)
    case PropertyRequiredError:
      return res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(error.message))
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
  }
}
