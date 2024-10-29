import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth-route";
import petRoute from "./routes/pets/pet-routes";
import articleRoute from "./routes/article/article-route";
import articleCatRoute from "./routes/article/category-route";
import petCategoryRoute from "./routes/pets/category-routes";
import adoptionRoute from "./routes/adoption/adoption-route";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
// import shopRoute from "./routes/shop/shop-route";
// import sosRoute from "./routes/sos/sos-route";
// import donationRoute from "./routes/donation/donation-route";
// import adoptionRoute from "./routes/adoption/adoption-route";
dotenv.config();

//express application obj uusgeh
const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || "";

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pets", petRoute);
app.use("/api/v1/pets/category", petCategoryRoute);

app.use("/api/v1/articles", articleRoute);
app.use("/api/v1/articlesCat", articleCatRoute);
// app.use("/api/v1/adoption", adoptionRoute);
// app.use("/api/v1/products", shopRoute);
// app.use("/api/v1/sos", sosRoute);
// app.use("api/v1/donation", donationRoute);

connectDB(MONGO_URL);

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
