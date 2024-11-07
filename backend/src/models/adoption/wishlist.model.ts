import { model, Schema } from "mongoose";

interface adoptionWishList {
  user: Schema.Types.ObjectId;
  pets: [{ pet: Schema.Types.ObjectId }];
}

const adoptionWishListSchema = new Schema<adoptionWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pets: [
      {
        pet: {
          type: Schema.Types.ObjectId,
          ref: "PetProfle",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const AdoptionWishList = model("WishList", adoptionWishListSchema);
export default AdoptionWishList;
