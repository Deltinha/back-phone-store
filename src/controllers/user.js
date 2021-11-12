import * as userService from '../services/user';

// eslint-disable-next-line import/prefer-default-export
export async function postNewUser(req, res) {
  const userInfo = req.body;
  const repeatedEmail = await userService.checkEmailExists(userInfo.email);
  if (repeatedEmail) return res.sendStatus(403);
  const invalidUserInfo = await userService.checkUserInfo(userInfo);
  if (invalidUserInfo) return res.sendStatus(400);
  await userService.createUser(userInfo);
  return res.sendStatus(201);
}
