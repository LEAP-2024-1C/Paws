import { Request, Response } from "express";
import DonationTransaction from "../../models/transaction.model";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { donationId, description, amount,
        //  userEmail 
        } = req.body;
    const donationTrans = await DonationTransaction.create({
      donationId,
      description,
      amount,
    //   userEmail,
    });
    res.status(201).json({
      message: "Created donation trans successfully",
      donationTrans,
    });
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
