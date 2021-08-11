import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../../shared/types/users/index";
import config from "./config";

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
  return jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: 3600,
  });
};

export const validateJWT = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
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
