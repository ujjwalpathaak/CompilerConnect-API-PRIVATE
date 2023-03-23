import cpp_controller from "./controllers/cpp/cpp.controller.js";
import cpp_controller_input from "./controllers/cpp/cpp.controller_input.js";
import python_controller from "./controllers/python/python.controller.js";
import python_controller_input from "./controllers/python/python.controller_input.js";
import { saveNewCode, saveNewCodeInput, User } from "./newUser.js";

function checkFile(filename, username, password) {
  return new Promise(async (resolve, reject) => {
    let exist = await User.findOne({ username });
    if (exist && exist.password == password) {
      let result = exist.codesArray.filter((curr) => {
        {
          return curr.filename === filename;
        }
      });
      if (result.length === 0) {
        resolve(true);
      }
      resolve(false);
    }
  });
}

export const saveExecuteCpp = async (request, response) => {
  const { code, inputCheck, username, password, filename } = request.body;

  if (code === undefined) {
    return response
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = request.body;
    let exist = await User.findOne({ username });
    if (!exist) {
      return response.status(201).json({ error: "username does not exists" });
    }
    if (password !== exist.password) {
      return response.status(201).json({ error: "password is not correct" });
    }
    checkFile(filename, username, password).then((res) => {
      if (res == true) {
        saveNewCodeInput(code, input, "cpp", username, password, filename);
        cpp_controller_input(code, input).then((res) => {
          response
            .status(200)
            .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
        });
      } else {
        response.status(201).json({ error: "file already exists" });
      }
    });
  } else {
    if (!exist) {
      return response.status(201).json({ error: "username does not exists" });
    }
    if (password !== exist.password) {
      return response.status(201).json({ error: "password is not correct" });
    }
    checkFile(filename, username, password).then((res) => {
      if (res == true) {
        saveNewCode(code, "cpp", username, password, filename);
        cpp_controller(code).then((res) => {
          return response
            .status(200)
            .json({ ouput: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
        });
      } else {
        response.status(201).json({ error: "file already exists" });
      }
    });
  }
};

export const saveExecutePy = async (request, response) => {
  const { code, inputCheck, username, password, filename } = request.body;
  if (code === undefined) {
    return response
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = request.body;
    if (!exist) {
      return response.status(201).json({ error: "username does not exists" });
    }
    if (password !== exist.password) {
      return response.status(201).json({ error: "password is not correct" });
    }
    checkFile(filename, username, password).then((res) => {
      if (res == true) {
        saveNewCodeInput(code, input, "py", username, password, filename);
        python_controller_input(code, input).then((res) => {
          return response
            .status(200)
            .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
        });
      } else {
        response.status(201).json({ error: "file already exists" });
      }
    });
  } else {
    if (!exist) {
      return response.status(201).json({ error: "username does not exists" });
    }
    if (password !== exist.password) {
      return response.status(201).json({ error: "password is not correct" });
    }
    checkFile(filename, username, password).then((res) => {
      if (res == true) {
        saveNewCode(code, "py", username, password, filename);
        python_controller(code).then((res) => {
          return response
            .status(200)
            .json({ ouput: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
        });
      } else {
        response.status(201).json({ error: "file already exists" });
      }
    });
  }
};
