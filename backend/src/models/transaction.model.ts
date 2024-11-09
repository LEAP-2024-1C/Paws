import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donations",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    default: "card",
  },
  description: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DonationTransaction = mongoose.model(
  "DonationTransaction",
  transactionSchema
);

export default DonationTransaction;
