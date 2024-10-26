import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_TOKEN_PASS = process.env.JWT_TOKEN_PASS;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, `${JWT_TOKEN_PASS}` || "", {
    expiresIn: "10h",
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, `${JWT_TOKEN_PASS}` || "");
};
