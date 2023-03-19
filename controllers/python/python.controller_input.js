import { py_execute_input } from "../../py.execute.js";
import {
  python_generateFile,
  python_generateInputFile,
} from "./python.generateFile.js";

const python_controller_input = async (code, input) => {
  try {
    let filePath = await python_generateFile(code);
    let inputFilePath = await python_generateInputFile(input);
    let output = await py_execute_input(filePath, inputFilePath);
    return output;
  } catch (err) {
    console.log(err);
  }
};

export default python_controller_input;
