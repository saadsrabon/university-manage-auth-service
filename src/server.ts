import mongoose from 'mongoose'
import app from './app'
import config from './config'
async function dataBaseConnect() {
  try {
    await mongoose.connect(config.dataBaseUrl as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port} `)
    })
  } catch (err) {
    console.log('Database Connection Failed', err)
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
dataBaseConnect()
