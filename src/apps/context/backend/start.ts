import 'reflect-metadata'
import { ExampleBackendApp } from './ExampleBackendApp'

try {
  new ExampleBackendApp().start()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', error => {
  console.error('uncaughtException', error)
  process.exit(1)
})
