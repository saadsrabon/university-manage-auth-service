import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  logger.logger.error(error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.dataBaseUrl as string)
    logger.logger.info(`🛢   Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    logger.logger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection we are cloasdingf')
    if (server) {
      server.close(() => {
        logger.logger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

process.on('SIGTERM', () => {
  logger.logger.info('SIGTERM signal received: closing HTTP server')
  if (server) {
    server.close(() => {
      logger.logger.info('HTTP server closed')
    })
  }
})
bootstrap()
