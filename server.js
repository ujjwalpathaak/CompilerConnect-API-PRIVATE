import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

const PORT = process.env.PORT || 5000;

import router from "./routes.js";

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});