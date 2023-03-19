import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const dirCodes = path.dirname(__filename);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const python_generateFile = async (content) => {
  const jobId = v4();
  const filename = `${jobId}.py`;
  fs.writeFileSync(filename, content);
  return filename;
};

export const python_generateInputFile = async (input) => {
  const jobId = v4();
  const filename = `${jobId}.txt`;
  fs.writeFileSync(filename, input);
  return filename;
};
