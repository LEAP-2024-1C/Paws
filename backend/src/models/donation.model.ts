import { model, Schema, Document, Types } from "mongoose";

interface Comment {
  user: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

interface Donations extends Document {
  description: string;
  title: string;
  images: string[];
  totalAmount: number;
  currentAmount: number;
  contributors: number;
  petId: Types.ObjectId;
  userId?: Types.ObjectId;
  comments: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
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
      ref: "Pets",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Donations = model<Donations>("Donations", DonationsSchema);
export default Donations;
