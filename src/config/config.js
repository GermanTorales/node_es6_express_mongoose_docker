import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'develop', 'test', 'local').required(),
    PORT: Joi.number().default(3000),
    MONGO_USER: Joi.string().required().description('Mongo user name'),
    MONGO_PASS: Joi.string().required().description('Mongo user password'),
    MONGO_HOST: Joi.string().required().description('Mongo host'),
    MONGO_PORT: Joi.string().required().description('Mongo port'),
    MONGO_DB_NAME: Joi.string().required().description('Mongo database name'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const MONGO_URL = `mongodb://${envVars.MONGO_HOST}:${envVars.MONGO_PORT}/${envVars.MONGO_DB_NAME}`;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: MONGO_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
