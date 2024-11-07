import { Request, Response } from "express";
import DonationTransaction from "../../models/transaction.model";
import Donations from "../../models/donation.model";

// export const addComment = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { comment, rating, user } = req.body;
//     const comments = await Product.findById(productId).populate("comment.user");
//     // .select("firstname");
//     comments?.comment?.push({ comment, rating, user });
//     const addedComment = await comments?.save();
//     res
//       .status(200)
//       .json({ message: "Added comment successfully", addedComment });
//   } catch (error) {
//     console.log("Couldn't added the comment", error);
//     res.status(400).json({ message: "Comment error", error });
//   }
// };

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { donationId } = req.params;
    const {
      description,
      amount,
      //  userEmail
    } = req.body;
    const donationTrans = await Donations.findById(donationId);
    donationTrans?.collectedDonations?.push({ description, amount });
    const currentAmount = await donationTrans?.save();
    res.status(201).json({
      message: "Created donation trans successfully",
      currentAmount,
    });

    // console.log("Amount:", amount, "Type:", typeof amount);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTransactionData = async (req: Request, res: Response) => {
  const { id: donationId } = req.params;
  try {
    const transactionData = await DonationTransaction.find({
      donationId,
    }).populate({
      path: "donationId",
      model: "Donations",
    });

    res.status(200).json({ message: "Success", transactionData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
