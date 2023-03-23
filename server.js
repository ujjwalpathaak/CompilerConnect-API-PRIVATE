import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();

const PORT = process.env.PORT || 5000;

import router from "./routes.js";

const Connection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://ujjwalpath2002:ujju2002@cluster0.0zjqj0s.mongodb.net/?retryWrites=true&w=majority",
      { useUnifiedTopology: true }
    );
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
