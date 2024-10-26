import { model, Schema } from "mongoose";

interface IArticle {
  title: string;
  description: string;
  images: [string];
  category: Schema.Types.ObjectId;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
      default: ["img"],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Article category",
    },
  },
  {
    timestamps: true,
  }
);
const Article = model<IArticle>("Article", ArticleSchema);
export default Article;
