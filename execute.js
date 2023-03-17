import cpp_controller from "./controllers/cpp/cpp.controller.js";
import cpp_controller_input from "./controllers/cpp/cpp.controller_input.js";

const execute = async (req, res) => {
  const { code, inputCheck } = req.body;
  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  }
  if (inputCheck == "true") {
    const { input } = req.body;
    cpp_controller_input(code, input).then((response) => {
      res.status(200).json({ output: response });
    });
  } else {
    cpp_controller(code).then((response) => {
      res.status(200).json({ ouput: response });
    });
  }
};
export default execute;
