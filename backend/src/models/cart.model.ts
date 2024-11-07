import { model, Schema } from "mongoose";

interface ICart {
  user: Schema.Types.ObjectId;
  products: [
    { product: Schema.Types.ObjectId; quantity: number; size: object }
  ];
  totalAmount: number;
}

const cartSchema = new Schema<ICart>(
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
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          size: String,
          id: String,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);
export default Cart;
