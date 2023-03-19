import express from "express";
import { executeCpp, executePy } from "./execute.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Base get to URL
router.get("/", (req, res) => {
  res.send("API Working");
});

router.post("/execCodeCpp", executeCpp);
router.post("/execCodePy", executePy);

export default router;
