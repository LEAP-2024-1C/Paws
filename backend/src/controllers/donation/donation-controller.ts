import { Request, Response } from "express";
import Donations from "../../models/donation.model";

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const allDonations = await Donations.find({});
    res.status(200).json({ message: "Success", category: allDonations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getSinglePost = await Donations.findById(id);
    res
      .status(200)
      .json({ message: "get donation post successfully", getSinglePost });
  } catch (error) {
    console.log("Couldn't get donation post", error);
    res.status(500).json({ message: "SingleDonation: Server error", error });
  }
};

export const createDonations = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD:backend/src/controllers/donation/donation-controller.ts
    const { description, title, images, petId, totalAmount, updateDate } =
      req.body;
    if (!description || !title || !images || !totalAmount) {
=======
    const { description, title, images, amount, userId, petId, totalAmount } =
      req.body;
    if (
      !description ||
      !title ||
      !images ||
      !amount ||
      !userId ||
      !petId ||
      !totalAmount
    ) {
>>>>>>> 8131707 (edit):backend/src/controllers/donation-controller.ts
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    const newDonation = await Donations.create({
      description,
      title,
      images,
      petId,
      totalAmount,
<<<<<<< HEAD:backend/src/controllers/donation/donation-controller.ts
      updateDate,
=======
>>>>>>> 8131707 (edit):backend/src/controllers/donation-controller.ts
    });
    res.status(201).json({
      message: "Created danations successfully",
      category: newDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
