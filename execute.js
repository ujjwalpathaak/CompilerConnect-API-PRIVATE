import cpp_controller from "./controllers/cpp/cpp.controller.js";
import cpp_controller_input from "./controllers/cpp/cpp.controller_input.js";
// import java_controller from "./controllers/java/java.controller.js";
// import java_controller_input from "./controllers/java/java.controller_input.js";
import python_controller from "./controllers/python/python.controller.js";
import python_controller_input from "./controllers/python/python.controller_input.js";

export const executeCpp = async (req, res) => {
  const { code, inputCheck } = req.body;
  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = req.body;
    cpp_controller_input(code, input).then((response) => {
      res.status(200).json({ output: response.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  } else {
    cpp_controller(code).then((response) => {
      res.status(200).json({ ouput: response.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  }
};

export const executePy = async (req, res) => {
  const { code, inputCheck } = req.body;
  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = req.body;
    python_controller_input(code, input).then((response) => {
      res
        .status(200)
        .json({ output: response.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  } else {
    python_controller(code).then((response) => {
      res
        .status(200)
        .json({ ouput: response.replace(/(?:\\[rn]|[\r\n]+)+/g, "") });
    });
  }
};

// export const executeJava = async (req, res) => {
//   const { code, inputCheck } = req.body;
//   if (code === undefined) {
//     return res
//       .status(400)
//       .json({ success: "false", error: "Empty code body!" });
//   }
//   if (inputCheck == "true") {
//     const { input } = req.body;
//     java_controller_input(code, input).then((response) => {
//       let ress = response.replace(/(?:\\[rn])+/g, "");
//       console.log(ress);
//       res.status(200).json({ output: response });
//     });
//   } else {
//     java_controller(code).then((response) => {
//       let ress = response.replace(/(?:\\[rn])+/g, "");
//       console.log(ress);
//       res.status(200).json({ ouput: ress });
//     });
//   }
// };
