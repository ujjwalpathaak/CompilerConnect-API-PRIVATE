import cpp_controller from "./controllers/cpp/cpp.controller.js";
import cpp_controller_input from "./controllers/cpp/cpp.controller_input.js";
import python_controller from "./controllers/python/python.controller.js";
import python_controller_input from "./controllers/python/python.controller_input.js";
import { User } from "./newUser.js";

export const executeCpp = async (request, response) => {
  // console.log("cakled")
  const { code, inputCheck } = request.body;
  if (code === undefined) {
    return response
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = request.body;
    cpp_controller_input(code, input).then((res) => {
      response
        .status(200)
        .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  } else {
    cpp_controller(code).then((res) => {
      response
        .status(200)
        .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  }
};

export const executePy = async (request, response) => {
  const { code, inputCheck } = request.body;
  if (code === undefined) {
    return response
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = request.body;
    python_controller_input(code, input).then((res) => {
      response
        .status(200)
        .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  } else {
    python_controller(code).then((res) => {
      response
        .status(200)
        .json({ output: res.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  }
};
