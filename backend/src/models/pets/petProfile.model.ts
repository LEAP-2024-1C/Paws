import { model, Schema } from "mongoose";

interface IPetProfile {
  _id: Schema.Types.ObjectId;
  name: string;
  breed: string;
  age: number;
  ageGroup: string;
  gender: string;
  imageUrl: [string];
  healthCondition: string;
  size: string;
  vaccinated: boolean;
  spayed?: boolean;
  neutered?: boolean;
  wormed: boolean;
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
    },
    ageGroup: {
      type: String,
      enum: ["puppy", "kitten", "young", "adult", "senior", ""],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    imageUrl: {
      type: [String],
      default: ["img"],
    },
    size: {
      type: String,
      enum: ["small", "medium", "big"],
    },
    vaccinated: {
      type: Boolean,
      required: true,
    },
    spayed: {
      type: Boolean,
    },
    neutered: {
      type: Boolean,
    },
    wormed: {
      type: Boolean,
      required: true,
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
