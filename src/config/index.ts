import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dataBaseUrl: process.env.DB_URL,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
}
