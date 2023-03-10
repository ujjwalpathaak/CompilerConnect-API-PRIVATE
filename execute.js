import cpp_controller from "./controllers/cpp/cpp.controller.js";
import cpp_controller_input from "./controllers/cpp/cpp.controller_input.js";

const execute = async (req, res) => {
  const { code, language, inputCheck } = req.body;
  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Empty code body!" });
  } else if (language === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Language not specified!" });
  }
  if (inputCheck == "true") {
    const { input } = req.body;
    switch (language) {
      case "cpp":
        cpp_controller_input(code, language, input).then((response) => {
          res.status(200).json({ output: response });
        });
        break;
      default:
        break;
    }
  } else {
    switch (language) {
      case "cpp":
        cpp_controller(code, language).then((response) => {
          res.status(200).json({ ouput: response });
        });
      default:
        break;
    }
  }
};
export default execute;
