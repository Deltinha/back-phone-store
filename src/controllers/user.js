import * as userService from '../services/user';

// eslint-disable-next-line import/prefer-default-export
export async function postNewUser(req, res) {
  const userInfo = req.body;
  console.log({ userInfo });
  await userService.createUser(userInfo);
  res.sendStatus(201);
}
