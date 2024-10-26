import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string | object;
        // id: any;
      };
    }
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("user", req.user);
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Please sign In first" });
    }
    const token = req.headers.authorization?.split(" ")[1];
    const user = decodeToken(token);
    // console.log("USERR", user);
    req.user = user as any;
    next();
  } catch (error) {
    console.log("cattt", error);
    res.status(400).json({ message: "Please sign In first" });
  }
};
