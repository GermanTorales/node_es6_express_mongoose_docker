import { getProperty } from '../helpers';

export const UserRoles = new Proxy(['user', 'admin'], getProperty);
