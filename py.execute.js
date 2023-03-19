import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const outputPath = path.dirname(__filename);

class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }
}
let stack = new Stack();

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

function compilePy(filepath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [filepath]);
    pythonProcess.stdout.on("data", (data) => {
      const output = data.toString();
      resolve(output);
    });
  });
}

export const py_execute = async (filepath) => {
  try {
    return await compilePy(filepath);
  } catch (error) {
    console.error(error);
  }
};

// With input
function compilePy_input(filepath, inputFilePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [filepath]);
    const inputFileStream = fs.createReadStream(inputFilePath);
    inputFileStream.pipe(pythonProcess.stdin);

    pythonProcess.stdout.on("data", async (data) => {
      const output = data.toString();
      stack.push(output);

      setTimeout(() => resolve(stack.pop()), 3000);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });
  });
}

export const py_execute_input = async (filepath, inputFilePath) => {
  try {
    let output = await compilePy_input(filepath, inputFilePath);
    const fileName = path.basename(filepath).split(".")[0];
    fs.unlink("./" + fileName + ".py", (err) => {
      if (err) {
        throw err;
      }
    });
    fs.unlink("./" + inputFilePath, (err) => {
      if (err) throw err;
    });
    return output;
  } catch (error) {
    console.error(error);
  }
};
