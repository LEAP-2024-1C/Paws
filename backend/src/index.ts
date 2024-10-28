import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth-route";
import petRoute from "./routes/pets/pet-routes";
import petCategoryRoute from "./routes/pets/category-routes";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
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

connectDB(MONGO_URL);

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
