import { model, Schema } from "mongoose";

interface IWishList {
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId }];
}

const wishListSchema = new Schema<IWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const WishList = model("WishList", wishListSchema);
export default WishList;
