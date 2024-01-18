import PromiseRouter from 'express-promise-router'
import type { Router } from 'express'
import Container from 'typedi'
import { ExamplePostController } from '../controllers/ExamplePostController'
import { ExampleDeleteController } from '../controllers/ExampleDeleteController'
import { ExampleGetAllController } from '../controllers/ExampleGetAllController'

export const generateRouter = (): Router => {
  const router = PromiseRouter()

  const examplePostController = Container.get(ExamplePostController)
  const exampleGetAllController = Container.get(ExampleGetAllController)
  const exampleDeleteController = Container.get(ExampleDeleteController)

  router.route('/').get(exampleGetAllController.run).post(examplePostController.run)

  router.route('/:id').delete(exampleDeleteController.run)

  return router
}
