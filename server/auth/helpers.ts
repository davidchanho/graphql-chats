import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../../shared/types/users/index";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (user: IUser) => {
  return jwt.sign({ id: user._id }, 'secret');
};

export const validateJWT = (token: string) => {
  return jwt.verify(token, 'secret');
};
