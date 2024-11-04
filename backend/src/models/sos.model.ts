import { model, Schema } from "mongoose";

interface ISos {
  _id: Schema.Types.ObjectId;
  description: string;
  location: string;
  imageUrl?: string;
  phoneNumber: string;
  status: "Pending" | "In-progress" | "Saved";
  createdAt: Date;
  updatedAt: Date;
}

const sosSchema = new Schema<ISos>(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    imageUrl: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "In-progress", "Saved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Sos = model("Sos", sosSchema);

export default Sos;
