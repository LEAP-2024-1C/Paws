import { Request, Response } from "express";
import Donations from "../../models/donation.model";

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const allDonations = await Donations.find({})
      .populate({
        path: "petId",
        model: "PetProfle",
      })
      .populate({
        path: "userId",
        model: "User",
        select: "firstname lastname",
      });
    res.status(200).json({ message: "Success", allDonations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleDonation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getSinglePost = await Donations.findById(id).populate({
      path: "petId",
      model: "PetProfle",
      select: "name",
    });
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
    const userId = req.user._id.toString();
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
  const { description, title, images, petId, totalAmount, status } = req.body;

  try {
    const report = await Donations.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "petId",
      model: "PetProfle",
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
    const updatedDonation = await donation.save();

    return res.status(200).json({
      message: "Added comment successfully",
      addedComment:
        updatedDonation.comments[updatedDonation.comments.length - 1],
    });
  } catch (error) {
    console.error("Couldn't add the comment:", error);

    return res.status(500).json({
      message: "An error occurred while adding the comment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
// export const deleteDonationComment = async (req: Request, res: Response) => {
//   try {
//     const { id, commentId } = req.params;
//     const { userId } = req.body;

//     if (!id || !commentId) {
//       return res
//         .status(400)
//         .json({ message: "Donation ID and Comment ID are required" });
//     }

//     const donation = await Donations.findById(id);

//     if (!donation) {
//       return res.status(404).json({ message: "Donation post not found" });
//     }

//     const commentIndex = donation.comments.findIndex(
//       (comment) => comment._id.toString() === commentId
//     );

//     if (commentIndex === -1) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//     const comment = donation.comments[commentIndex];
//     if (comment.user.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this comment" });
//     }
//     donation.comments.splice(commentIndex, 1);
//     const updatedDonation = await donation.save();
//     return res.status(200).json({
//       message: "Comment deleted successfully",
//       updatedDonation,
//     });
//   } catch (error) {
//     console.error("Couldn't delete the comment:", error);

//     return res.status(500).json({
//       message: "An error occurred while deleting the comment",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
