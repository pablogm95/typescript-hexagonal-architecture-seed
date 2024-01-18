import type { Router } from 'express'
import * as statusRoute from './status.route'
import * as exampleRoute from './examples.route'

export function registerRoutes(router: Router) {
  router.use('/status', statusRoute.generateRouter())
  router.use('/examples', exampleRoute.generateRouter())
}
