import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { AuthService, UserService } from '../services/index.js';

const register = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);

  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.loginUserWithEmailAndPassword(email, password);

  res.send({ user });
});

const resetPassword = catchAsync(async (req, res) => {
  await AuthService.resetPassword(req.query.token, req.body.password);

  res.status(httpStatus.NO_CONTENT).send();
});

export default { register, login, resetPassword };
