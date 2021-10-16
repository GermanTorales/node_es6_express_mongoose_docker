import httpStatus from 'http-status';
import userService from './user.service.js';
import ApiError from '../utils/ApiError.js';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');

  return user;
};

export default { loginUserWithEmailAndPassword };
