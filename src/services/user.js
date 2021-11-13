import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/user';
import validalidateUserInfo from '../schemas/createUserSchema';
import validalidateLogin from '../schemas/loginSchema';

function hashPassword(password) {
  const hashedPass = bcrypt.hashSync(password, 13);
  return hashedPass;
}

export async function checkEmailExists(email) {
  const user = await userRepository.getUserByEmail(email);
  const emailAlreadyExist = !!(user.length !== 0);
  return (emailAlreadyExist);
}

export function checkNewUserInfo(user) {
  const invalidUserInfo = validalidateUserInfo(user);
  return !!invalidUserInfo;
}

export async function createUser(userInfo) {
  const hashedPass = hashPassword(userInfo.password);
  await userRepository.insertUser({ ...userInfo, hashedPass });
}

export function checkUserInfo(user) {
  const invalidUserInfo = validalidateLogin(user);
  return !!invalidUserInfo;
}

function checkPasswordMatch(password, hashedPass) {
  return bcrypt.compareSync(password, hashedPass);
}

function generateToken() {
  const token = uuid();
  return token;
}

export async function login(loginInfo) {
  const userInfo = await userRepository.getUserByEmail(loginInfo.email);
  if (userInfo.length === 0) return false;

  const passwordMatch = checkPasswordMatch(loginInfo.password, userInfo[0].password);
  if (!passwordMatch) return false;

  const token = generateToken();
  const body = { user_id: userInfo[0].id, token };
  await userRepository.createSession(body);
  return body;
}
