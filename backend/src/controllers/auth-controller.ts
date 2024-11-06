import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { sendEmail } from "../utils/sendmail";
import crypto from "crypto";

//Mongoose => odm => object data mapping

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

export const getCurrentUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const { id } = req.user;
    const data = await User.findById(id);
    res.status(201).json({ message: "success", user: data });
    // console.log("ID", data);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, login_type } = req.body;
    const loggedUser = await User.findOne({ email, role: login_type });
    // console.log("loggedUser", loggedUser);
    if (!loggedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isChecked = bcrypt.compareSync(password, loggedUser.password);
      if (!isChecked) {
        res.status(404).json({
          message: "Хэрэглэгчийн и-мэйл эсвэл нууц үг тохирохгүй байна.",
        });
      } else {
        const token = generateToken({ id: loggedUser._id });
        res.status(201).json({ message: "Success", token, user: loggedUser });
      }
    }
    // res.status(201).json({ message: "Login Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't signed in" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    // const hashedPassword = bcrypt.hashSync(password, 10);
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      phoneNumber: "",
      address: "",
      role,
    });
    res.status(201).json({ message: "success", user: newUser });
    // console.log("pass", newUser);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export const sendRecoverEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const registeredUser = await User.findOne({ email: email });
    if (!registeredUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    registeredUser.otp = otp;
    await registeredUser.save();
    await sendEmail(email, otp);
    res.status(200).json({ message: "Sent successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(400).json({ message: "Couldn't send emailssss", error: error });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otpValue } = req.body;
    console.log("emai, otpValue", email, otpValue);
    const registeredUser = await User.findOne({ email: email, otp: otpValue });
    if (!registeredUser) {
      return res.status(404).json({ message: "User or OTP code not found" });
    }
    const resetToken = crypto.randomBytes(25).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    registeredUser.passwordResetToken = hashedResetToken;
    registeredUser.passwordResetTokenExpire = new Date(
      Date.now() + 10 * 60 * 1000
    );
    await registeredUser.save();
    console.log("resetToken", hashedResetToken, resetToken);
    await sendEmail(
      email,
      `<a href="http:localhost:3000/newpass?resettoken=${resetToken}">Password recovery link</a>`
    );
    res.status(200).json({ message: "Sent email successfully" });
  } catch (error) {
    console.log("OTP ERR", error);
    res.status(400).json({ message: "Couldn't send link" });
  }
};

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { password, resetToken } = req.body;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const registeredUser = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpire: { $gt: Date.now() },
    });
    if (!registeredUser) {
      return res.status(404).json({ message: "Time expired" });
    }
    registeredUser.password = password;
    await registeredUser.save();
    res
      .status(200)
      .json({ message: "Your password has been recovered successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't recovered password" });
  }
};
