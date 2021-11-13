import connectMongoose from './config/database.js';
import Api from './app.js';
import logger from './config/logger.js';
import config from './config/config.js';
import express from 'express';

const app = express();
const api = new Api();

const start = async () => {
  await connectMongoose();
  await api.bootstrap(app);

  const server = app.listen(config.port, () => logger.info(`Express already start, server on: ${config.host}`));

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = error => {
    logger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');

    if (server) server.close();
  });
};

start();
