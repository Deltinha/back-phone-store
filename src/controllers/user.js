import * as userService from '../services/user';

export async function postNewUser(req, res) {
  const userInfo = req.body;
  const repeatedEmail = await userService.checkEmailExists(userInfo.email);
  if (repeatedEmail) return res.sendStatus(403);
  const invalidUserInfo = userService.checkNewUserInfo(userInfo);
  if (invalidUserInfo) return res.sendStatus(400);
  await userService.createUser(userInfo);
  return res.sendStatus(201);
}

export async function login(req, res) {
  const loginInfo = req.body;
  const invalidLoginInfo = userService.checkUserInfo(loginInfo);
  if (invalidLoginInfo) return res.sendStatus(400);
  const userInfo = await userService.login(loginInfo);
  if (!userInfo) return res.sendStatus(401);
  return res.status(200).send(userInfo);
}
