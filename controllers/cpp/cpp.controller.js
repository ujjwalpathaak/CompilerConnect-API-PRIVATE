import { cpp_execute } from "../../cpp.execute.js";
import { cpp_generateFile } from "./cpp.generateFile.js";

const cpp_controller = async (code) => {
  try {
    let filePath = await cpp_generateFile(code);
    let output = await cpp_execute(filePath);
    return output;
  } catch (err) {
    console.log(err);
  }
};

export default cpp_controller;
