import express from "express";
import { executeCpp, executePy } from "./execute.js";
import { saveExecuteCpp, saveExecutePy } from "./saveExecute.js";
import { newUser, getCode, getSpecificCode } from "./newUser.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Base get to URL
router.get("/", (req, res) => {
  res.send("API Working");
});

router.post("/py", executePy);
router.post("/cpp", executeCpp);
router.post("/save/cpp", saveExecuteCpp);
router.post("/save/py", saveExecutePy);
router.post("/newuser", newUser);
router.post("/getCodeAll", getCode);
router.post("/getSpecificCode", getSpecificCode);

export default router;
