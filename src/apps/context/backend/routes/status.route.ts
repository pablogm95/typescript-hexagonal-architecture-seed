import PromiseRouter from 'express-promise-router'
import type { Router } from 'express'
import Container from 'typedi'
import { StatusGetController } from '../controllers/StatusGetController'

export const generateRouter = (): Router => {
  const router = PromiseRouter()

  const statusGetController = Container.get(StatusGetController)

  router.get('/', statusGetController.run)

  return router
}
