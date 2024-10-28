import { model, Schema } from "mongoose";

interface IPetcategory {
  id: Schema.Types.ObjectId;
  name: string;
  description: string;
}

const petcategorySchema = new Schema<IPetcategory>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Petcategory = model<IPetcategory>("Petcategory", petcategorySchema);
export default Petcategory;
