import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user';
import validalidateUserInfo from '../schemas/createUserSchema';

function hashPassword(password) {
  const hashedPass = bcrypt.hashSync(password, 13);
  return hashedPass;
}

export async function createUser(userInfo) {
  const hashedPass = hashPassword(userInfo.password);
  await userRepository.insertUser({ ...userInfo, hashedPass });
}

export async function checkEmailExists(email) {
  const emailAlreadyExist = await userRepository.getUserByEmail(email);
  return (emailAlreadyExist !== 0);
}

export async function checkUserInfo(user) {
  const invalidUserInfo = validalidateUserInfo(user);
  return !!invalidUserInfo;
}
