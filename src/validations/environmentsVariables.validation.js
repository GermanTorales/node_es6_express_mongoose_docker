import Joi from 'joi';
import { Environments } from '../constants';

export const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(...Environments)
      .required(),
    NODE_HOST: Joi.string().required().description('Server host url'),
    PORT: Joi.number().default(3000),
    MONGO_USER: Joi.string().required().description('Mongo user name'),
    MONGO_PASS: Joi.string().required().description('Mongo user password'),
    MONGO_HOST: Joi.string().required().description('Mongo host'),
    MONGO_PORT: Joi.string().required().description('Mongo port'),
    MONGO_DB_NAME: Joi.string().required().description('Mongo database name'),
    MONGO_URL: Joi.string().required().description('Mongo url connection'),
    MONGO_AUTHENTICATION: Joi.string().required().description('Mongo authentication database'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
  })
  .unknown();
