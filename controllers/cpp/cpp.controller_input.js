import { cpp_execute_input } from "../../cpp.execute.js";
import { cpp_generateFile, cpp_generateInputFile } from "./cpp.generateFile.js";

const cpp_controller_input = async (code, input) => {
  try {
    let filePath = await cpp_generateFile(code);
    let inputFilePath = await cpp_generateInputFile(input);
    let output = await cpp_execute_input(filePath, inputFilePath);

    return output;
  } catch (err) {
    console.log(err);
  }
};

export default cpp_controller_input;
