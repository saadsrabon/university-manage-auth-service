import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
// import logger from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  console.log('uncaughtException we are closing the server...', error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.dataBaseUrl as string)
    console.log(`🛢   Database is connected successfully`)

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection we are closing the server...')
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }
})
bootstrap()
