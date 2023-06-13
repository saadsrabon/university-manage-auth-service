import { createLogger, format, transports } from 'winston'

import path from 'path'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
    }),
  ],
})
const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    }),
  ],
})

export default { logger, errorlogger }
