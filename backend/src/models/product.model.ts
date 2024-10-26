import { model, Schema } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  size: string;
  images: [string];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: Schema.Types.ObjectId;
  comment?: [
    {
      user: Schema.Types.ObjectId;
      rating: number;
      comment: string;
    }
  ];
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Бүтээгдэхүүний нэрийг заавал оруулна"],
    },
    price: {
      type: Number,
      required: [true, "Бүтээгдэхүүний үнэ заавал оруулна"],
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL"],
      default: " ",
    },
    description: {
      type: String,
      required: [true, "Бүтээгдэхүүний тайлбарыг заавал оруулна"],
    },
    images: {
      type: [String],
      default: ["img"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    comment: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
