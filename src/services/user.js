import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user';

function hashPassword(password) {
  const hashedPass = bcrypt.hashSync(password, 13);
  return hashedPass;
}

// eslint-disable-next-line import/prefer-default-export
export async function createUser(userInfo) {
  const hashedPass = hashPassword(userInfo.password);
  await userRepository.insertUser({ ...userInfo, hashedPass });
}
