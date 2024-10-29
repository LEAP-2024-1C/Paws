import { model, Schema } from "mongoose";

interface IAdoption {
  _id: Schema.Types.ObjectId;
  petId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const adoptionSchema = new Schema<IAdoption>({
  petId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PetProfile",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
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
  status: {
    type: String,
    enum: ["posted", "in_progress", "adopted"],
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
