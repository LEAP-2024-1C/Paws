import { model, Schema } from "mongoose";

interface ISos {
  _id: Schema.Types.ObjectId;
  location: string;
  image: string[];
  postedDate: Date;
  phoneNumber: number;
  userId: { type: Schema.Types.ObjectId; ref: "User"; required: true };
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
    type: Number,
    required: [true, "Утасны дугаар заавал оруулах"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Хэрэглэгчийн ID заавал оруулах"],
  },
});

const Sos = model("Sos", sosSchema);

export default Sos;
