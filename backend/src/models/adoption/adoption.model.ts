import { model, Schema } from "mongoose";

interface IAdoption {
  _id: Schema.Types.ObjectId;
  pet: Schema.Types.ObjectId;
  // userId?: Schema.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  imgUrl: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

const adoptionSchema = new Schema<IAdoption>({
  pet: {
    type: Schema.Types.ObjectId,
    ref: "PetProfile",
    required: true,
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    requied: true,
  },
  imgUrl: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["posted", "in-progress", "adopted"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Adoption = model("Adoption", adoptionSchema);

export default Adoption;
