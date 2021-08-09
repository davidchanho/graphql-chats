import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../../shared/types/users/index";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (user: IUser) => {
  return jwt.sign({ _id: user._id }, 'secret', {
    expiresIn: 3600,
  });
};

export const validateJWT = (token: string) => {
  return jwt.verify(token, 'secret');
};

export const getUser = (token: string) => {
  if (token) {
    try {
      return validateJWT(token);
    } catch (err) {
      throw new Error("Session invalid");
    }
  }
};