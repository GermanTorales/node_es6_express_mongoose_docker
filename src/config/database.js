import mongoose from 'mongoose';
import config from './config.js';
import logger from './logger.js';

const connectMongoose = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);

    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error("Can't connect database", error);
  }
};

export default connectMongoose;
