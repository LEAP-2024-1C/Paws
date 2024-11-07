import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt";
import User, { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUser | any;
    }
  }
}

export const authentication = async (
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
    const user = decodeToken(token) as { id: string };
    // console.log("USERR", user);
    // req.user = user as any;
    req.user = await User.findById(user.id);
    // console.log("REQ user", req.user._id.toString());
    next();
  } catch (error) {
    // console.log("cattt", error);
    res.status(400).json({ message: "Please sign In first" });
  }
};

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "admin") {
      throw Error("not admin");
    }

    next();
  } catch (error) {
    // console.log("cattt", error);
    res.status(400).json({ message: "Admin erheer ene uildliig hiine" });
  }
};
