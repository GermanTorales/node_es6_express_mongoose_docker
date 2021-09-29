import connectMongoose from './config/database.js';
import app from './app.js';
import logger from './config/logger.js';
import config from './config/config.js';

await connectMongoose();

const server = app.listen(config.port, () =>
  logger.info(`Server starting on port ${config.port}`)
);

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
