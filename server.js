import express from "express";
const app = express();
import fs from "fs";
const PORT = process.env.PORT || 5000;
import cors from "cors";
import bodyParser from "body-parser";
import { generateFile } from "./generateFile.js";
import { executeCpp } from "./runCode.js";
app.use(cors());
import path from "path";
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.json({ hello: "World" });
});

app.post("/runCode", async (req, res) => {
  const { language, code } = req.body;

  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Empty code body!!!" });
  } else if (language === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Language not specified!!!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const output = await executeCpp(filePath);
    fs.unlink(path.basename(filePath).split(".")[0] + ".cpp", (err) => {
      if (err) {
        throw err;
      }
    });
    fs.unlink(path.basename(filePath).split(".")[0], (err) => {
      if (err) {
        throw err;
      }
    });
    return res.json(output);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
