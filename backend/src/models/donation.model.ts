import { model, Schema } from "mongoose";

interface Donations {
  description: string;
  title: string;
  images: [string];
  donation: number;
  amount: number;
  liked: number;
  petId: { type: Schema.Types.ObjectId; ref: "Pets"; required: true };
  users: { type: Schema.Types.ObjectId; ref: "User"; required: true };
  updateDate: Date;
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
    amount: {
      type: Number,
      required: true,
    },
    donation: {
      type: Number,
      required: [true, "Цуглуулах хандивын хэмжээг заавал бичнэ үү."],
    },
    liked: {
      type: Number,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pets",
      required: true,
    },
    users: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Donations = model<Donations>("Donations", DonationsSchema);
export default Donations;
