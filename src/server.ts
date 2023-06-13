import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import logger from './shared/logger'

async function dataBaseConnect() {
  try {
    await mongoose.connect(config.dataBaseUrl as string)
    app.listen(config.port, () => {
      logger.logger.info(`Example app listening on port ${config.port} `)
    })
  } catch (err) {
    logger.errorlogger.error('Database Connection Failed', err)
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
dataBaseConnect()
