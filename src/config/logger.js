import winston from 'winston';
import config from './config.js';
import { format } from 'date-fns';
import { Environments, LoggerLevel } from '../constants';

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) Object.assign(info, { message: info.stack });

  return info;
});

const logger = winston.createLogger({
  level: config.env === Environments.development ? LoggerLevel.debug : LoggerLevel.info,
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === Environments.development ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${format(new Date(), 'dd/MM/yyyy HH:mm')} - ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: [LoggerLevel.error],
    }),
  ],
});

export default logger;
