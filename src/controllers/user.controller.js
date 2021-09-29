import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { UserService } from '../services/index.js';

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);

  return res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await UserService.queryUsers(filter, options);

  return res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await UserService.updateUserById(req.params.userId, req.body);

  return res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await UserService.deleteUserById(req.params.userId);

  return res.status(httpStatus.NO_CONTENT).send();
});

export default { createUser, getUsers, getUser, updateUser, deleteUser };
