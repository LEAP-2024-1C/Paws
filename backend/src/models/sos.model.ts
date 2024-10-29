import { model, Schema } from "mongoose";

interface ISos {
  _id: Schema.Types.ObjectId;
  location: string;
  image: string[];
  postedDate: Date;
  status: "active" | "saved" | "pending";
  phoneNumber: string;
}

const sosSchema = new Schema<ISos>({
  location: {
    type: String,
    required: [true, "Байршил заавал оруулах"],
  },
  image: {
    type: [String],
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: [true, "Утасны дугаар заавал оруулах"],
  },
});

const Sos = model("Sos", sosSchema);

export default Sos;
