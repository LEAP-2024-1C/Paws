import { Request, Response } from "express";
import Donations from "../../models/donation.model";

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const allDonations = await Donations.find({})
      .populate({
        path: "petId",
        model: "PetProfle",
      }) //populated
      .populate({
        path: "userId",
        model: "User",
        select: "firstname lastname",
      }); //populated
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
    const userId = req.user._id.toString(); //req.user
    const { description, title, images, petId, totalAmount, status } = req.body;
    if (!description || !title || !images || !totalAmount) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }
    const newDonation = await Donations.create({
      description,
      title,
      images,
      petId,
      totalAmount,
      userId,
      status,
    });
    res.status(201).json({
      message: "Created donations successfully",
      category: newDonation,
    });
  } catch (error) {
    console.log("err", error);
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
// export const updateDonation = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const report = await Donations.findByIdAndUpdate(id, { new: true });

//     if (!report) {
//       return res.status(404).json({ message: "Report not found" });
//     }

//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update report status" });
//   }
// };

export const updateDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, title, images, petId, totalAmount, status } = req.body; // Шинэ өгөгдлийг авах

  try {
    const report = await Donations.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "petId",
      model: "PetProfle",
    }); //populated;

    // Устгасан мэдээлэл олдсон эсэхийг шалгах
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error updating report:", error); // Алдааг консольд бичих
    res.status(500).json({ message: "Failed to update report status" });
  }
};
