// const f = [
//   {
//     donationId: "12312414",
//     title: "",
//     amount: 5,
//     userEmail: "123123",
//   },
//   {
//     donationId: "12312414",
//     title: "",
//     amount: 5,
//     userEmail: "123123",
//   },
//   {
//     donationId: "98876",
//     title: "",
//     amount: 3,
//     userEmail: "123123",
//   },
// ];

// f.find({donationId});

import { model, Schema } from "mongoose";

interface DonationTransaction {
  donationId: Schema.Types.ObjectId;
  description: string;
  amount: number;
  userEmail: string;
}

const DonationTransactionSchema = new Schema<DonationTransaction>({
  donationId: {
    type: Schema.Types.ObjectId,
    ref: "Donations",
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
  },
});

const DonationTransaction = model<DonationTransaction>(
  "DonationTransaction",
  DonationTransactionSchema
);
export default DonationTransaction;
