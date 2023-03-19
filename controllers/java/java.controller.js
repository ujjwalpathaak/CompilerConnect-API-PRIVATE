import { java_execute } from "../../java.execute.js";
import { java_generateFile } from "./java.generateFile.js";

const java_controller = async (code, language) => {
  try {
    let filePath = await java_generateFile(language, code);
    let output = await java_execute(filePath);
    return output;
  } catch (err) {
    console.log(err);
  }
};

export default java_controller;
