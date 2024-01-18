import './dependency-injection'
import { Server } from './server'
import { Worker } from './worker'

export class ExampleBackendApp {
  server?: Server

  async start() {
    this.startServer()
    this.startWorker()
  }

  async startServer() {
    const port = process.env.PORT ?? '8080'
    this.server = new Server(port)

    return this.server.listen()
  }

  async startWorker() {
    const worker = new Worker()
    await worker.start()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  async stop() {
    return this.server?.stop()
  }
}
