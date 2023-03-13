import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const outputPath = path.dirname(__filename);

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

function compileCpp(filepath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filepath).split(".")[0];
    const compileProcess = spawn("g++", [filepath, "-o", fileName]);

    compileProcess.on("close", (code) => {
      if (code !== 0) {
        fs.unlink("./" + fileName + ".cpp", (err) => {
          if (err) {
            throw err;
          }
        });
        console.error(`Compilation failed with code ${code}`);
        return;
      }
      const runProcess = spawn(`./${fileName}`);
      runProcess.stdout.on("data", (data) => {
        const output = data.toString();

        fs.unlink("./" + fileName + ".cpp", (err) => {
          if (err) {
            throw err;
          }
        });
        resolve(output);
      });
      runProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
      });
    });
  });
}

export const cpp_execute = async (filepath) => {
  try {
    return await compileCpp(filepath);
  } catch (error) {
    console.error(error);
  }
};

// With input
function compileCpp_input(filepath, inputFilePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filepath).split(".")[0];
    const compileProcess = spawn("g++", [filepath, "-o", fileName]);

    compileProcess.on("close", (code) => {
      if (code !== 0) {
        fs.unlink("./" + fileName + ".cpp", (err) => {
          if (err) {
            throw err;
          }
        });
        fs.unlink("./" + inputFilePath, (err) => {
          if (err) {
            throw err;
          }
        });
        console.error(`Compilation failed with code ${code}`);
        return;
      }
      const runProcess = spawn(`./${fileName}`);
      runProcess.stdout.on("data", (data) => {
        const output = data.toString();
        fs.unlink("./" + fileName + ".cpp", (err) => {
          if (err) {
            throw err;
          }
        });
        fs.unlink("./" + inputFilePath, (err) => {
          if (err) {
            throw err;
          }
        });
        resolve(output);
      });
      runProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
      });
      const inputStream = fs.createReadStream(inputFilePath);
      inputStream.pipe(runProcess.stdin);
    });
  });
}

export const cpp_execute_input = async (filepath, inputFilePath) => {
  try {
    return await compileCpp_input(filepath, inputFilePath);
  } catch (error) {
    console.error(error);
  }
};
