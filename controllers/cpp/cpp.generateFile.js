import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const dirCodes = path.dirname(__filename);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const cpp_generateFile = async (lang, content) => {
  const jobId = v4();
  const filename = `${jobId}.${lang}`;
  fs.writeFileSync(filename, content);
  return filename;
};

export const cpp_generateInputFile = async (input) => {
  const jobId = v4();
  const filename = `${jobId}.txt`;
  fs.writeFileSync(filename, input);
  return filename;
};