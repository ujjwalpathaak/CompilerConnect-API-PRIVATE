import { py_execute } from "../../py.execute.js";
import { python_generateFile } from "./python.generateFile.js";

const python_controller = async (code, language) => {
  try {
    let filePath = await python_generateFile(code);
    let output = await py_execute(filePath);
    return output;
  } catch (err) {
    console.log(err);
  }
};

export default python_controller;