import { java_execute_input } from "../../java.execute.js";
import { java_generateFile, java_generateInputFile } from "./java.generateFile.js";

const java_controller_input = async (code, input) => {
  try {
    let filePath = await java_generateFile(code);
    let inputFilePath = await java_generateInputFile(input);
    let output = await java_execute_input(filePath, inputFilePath);

    return output;
  } catch (err) {
    console.log(err);
  }
};

export default java_controller_input;
