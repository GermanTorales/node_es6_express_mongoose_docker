import { getProperty } from '../helpers/enums.helpers.js';

export const UserRoles = new Proxy(['user', 'admin'], getProperty);
