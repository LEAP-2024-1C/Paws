import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

//middlewares

app.use(cors());

app.use(express.json());

const PORT: string = process.env.PORT || "";

const MONGO_URI = process.env.MONGO_URI || "";

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome Paws API server");
});

//Server on

app.listen(8000, () => {
  console.log(`АPI Server is running on port:8000 `);
});
