import { Request, Response } from "express";
import Donations from "../models/donation.model";

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const allDonations = await Donations.find({});
    res.status(200).json({ message: "Success", category: allDonations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getDonationPost = async (req: Request, res: Response) => {
  try {
    const getDonationPosts = await Donations.findOne({});
    res.status(200).json({ message: "Success", category: getDonationPosts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createDonations = async (req: Request, res: Response) => {
  try {
    const {
      description,
      title,
      images,
      amount,
      userId,
      petId,
      totalAmount,
      currentAmount,
      contributors,
    } = req.body;
    if (
      !description ||
      !title ||
      !images ||
      !amount ||
      !userId ||
      !petId ||
      !totalAmount ||
      !currentAmount ||
      !contributors
    ) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    const newDonation = await Donations.create({
      description,
      title,
      images,
      amount,
      userId,
      petId,
      totalAmount,
      currentAmount,
      contributors,
    });
    res.status(201).json({
      message: "Created danations successfully",
      category: newDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
