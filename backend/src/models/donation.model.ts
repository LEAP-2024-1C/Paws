import { model, Schema } from "mongoose";

interface Donations {
  description: string;
  title: string;
  images: [string];
  totalAmount: number;
  currentAmount: number;
  contributors: number;
  petId: { type: Schema.Types.ObjectId; ref: "Pets"; required: true };
  userId: { type: Schema.Types.ObjectId; ref: "User"; required: true }; //userId? ==> userId
  updateDate: Date;
  comments: [string];
}

const DonationsSchema = new Schema<Donations>(
  {
    title: {
      type: String,
      required: [true, "Хандивын нэрийг заавал бичнэ үү."],
    },
    description: {
      type: String,
      required: [true, "Хандив цуглуулж буй зорилгоо заавал бичнэ үү."],
    },
    images: {
      type: [String],
      default: ["img"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    contributors: {
      type: Number,
      default: 0,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "PetProfle", // ref: "Pets" ==> "PetProfle"
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, //added req: true
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
const Donations = model<Donations>("Donations", DonationsSchema);
export default Donations;
