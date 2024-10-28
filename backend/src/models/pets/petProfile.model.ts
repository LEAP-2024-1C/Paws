import { model, Schema } from "mongoose";

interface IPetProfile {
  _id: Schema.Types.ObjectId;
  name: string;
  breed: string;
  age: number;
  gender: string;
  images?: [string];
  healthCondition: string;
  category: Schema.Types.ObjectId;
}

const petsSchema = new Schema<IPetProfile>(
  {
    name: {
      type: String,
      required: [true, "Pet name is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    age: {
      type: Number,
      required: [true, "Please insert pet's age"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    images: {
      type: [String],
      default: ["img"],
    },
    healthCondition: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Petcategory",
    },
  },
  { timestamps: true }
);

const PetProfile = model("PetProfle", petsSchema);
export default PetProfile;
