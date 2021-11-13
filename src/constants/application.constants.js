import { getProperty } from '../helpers';

export const Environments = new Proxy(['production', 'development', 'local', 'test'], getProperty);
export const LoggerLevel = new Proxy(['debug', 'info', 'error'], getProperty);
