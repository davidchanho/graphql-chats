import jwt from "jsonwebtoken";

export enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
}

type JWT = {
  userId: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type Credentials = {
  token: string;
};

const jwtSecret = "secret";

export const signToken = (userId: string) => {
  return jwt.sign({ _id: userId }, jwtSecret, {
    expiresIn: 3600,
  });
};

export function isTokenValid(token: string): JWT | false {
  const bearerToken = token && token.split(" ");

  if (bearerToken) {
    try {
      const decoded = jwt.verify(bearerToken[1], jwtSecret) as JWT;

      return decoded;
    } catch (e) {
      return false;
    }
  }

  return false;
}
