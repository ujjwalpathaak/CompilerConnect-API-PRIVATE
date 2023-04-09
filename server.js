import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();

const PORT = process.env.PORT || 6000;

import router from "./routes.js";

const Connection = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });
    console.log("database connected");
  } catch (error) {
    console.log("error connecting to database", err.message);
  }
};

Connection();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
