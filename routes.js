import express from "express";
import execute from "./execute.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Base get to URL
router.get("/", (req, res) => {
  res.send("API Working");
});

router.post("/execCode", execute);

export default router;