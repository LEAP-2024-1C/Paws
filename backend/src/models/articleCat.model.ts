import { model, Schema } from "mongoose";

interface ICategory {
  name: string;
}

const articleCatSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleCat = model("Article category", articleCatSchema);

export default ArticleCat;
