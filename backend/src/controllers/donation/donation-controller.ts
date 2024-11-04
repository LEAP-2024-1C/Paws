import { Request, Response } from "express";
import Donations from "../../models/donation.model";

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const allDonations = await Donations.find({});
    res.status(200).json({ message: "Success", allDonations });
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
    const { description, title, images, petId, totalAmount, createAt } =
      req.body;
    if (!description || !title || !images || !totalAmount) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    const newDonation = await Donations.create({
      description,
      title,
      images,
      petId,
      totalAmount,
      createAt,
    });
    res.status(201).json({
      message: "Created danations successfully",
      category: newDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const deleteDonationReport = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedDonation = await Donations.findByIdAndDelete(id);
    if (!deletedDonation) {
      return res.status(404).json({ message: "Donation report not found" });
    }
    res.status(200).json({
      message: "Deleted Donation report successfully",
      deletedDonation,
    });
  } catch (error) {
    console.error("Error deleting donation report:", error);
    res.status(500).json({ message: "Failed to delete Donation report" });
  }
};

export const updateDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const report = await Donations.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Failed to update report status" });
  }
};

export const addDonationComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment, user } = req.body;
    if (!id || !comment || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const donation = await Donations.findById(id).populate("comments.user");

    if (!donation) {
      return res.status(404).json({ message: "Donation post not found" });
    }
    donation.comments.push({ comment, user, createdAt: new Date() });
    const addedComment = await donation.save();

    return res.status(200).json({
      message: "Added comment successfully",
      addedComment,
    });
  } catch (error) {
    console.error("Couldn't add the comment:", error);

    return res.status(500).json({
      message: "An error occurred while adding the comment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
