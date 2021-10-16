import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { UserRoles } from '../config/roles.js';

const verifyCallback = (req, next, requiredRights) => async (err, user, info) => {
  if (err || info || !user) return new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');

  req.user = user;

  if (requiredRights.length) {
    const userRights = UserRoles(user.role);
    const hasRequiredRights = requiredRights.every(requiredRight => userRights.includes(requiredRight));

    if (!hasRequiredRights && req.params.userId !== user.id) return new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  next();
};

const auth = (...requiredRights) => async (req, res, next) => {
  try {
    await passport.authenticate('jwt', { session: false }, verifyCallback(req, next, requiredRights))(req, res, next);

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
