import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    codesArray: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);

export const newUser = async (request, response) => {
  try {
    const { username, password } = request.body;
    let exist = await User.findOne({ username });
    if (exist) {
      console.log("username already exists");
      return response.status(201).json({ error: "username already exists" });
    }
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    return response.status(200).json(newUser);
  } catch (error) {
    console.log("error adding new user", error);
    return response.status(203).json(error.msg);
  }
};

export const saveNewCode = async (code, lang, username, password, filename) => {
  try {
    let exist = await User.findOne({ username });
    if (exist && (await Buffer.compare(password, exist.password))) {
      const codes = {
        code,
        lang,
        username,
        password,
        filename,
      };
      exist.codesArray.push(codes);
      await exist.save();
    }
    // await newUser.save();
    return response.status(200).json(newUser);
  } catch (error) {
    console.log("error adding new user", error);
    return;
  }
};

export const saveNewCodeInput = async (
  code,
  input,
  lang,
  username,
  password,
  filename
) => {
  try {
    let exist = await User.findOne({ username });

    if (exist && exist.password == password) {
      const newCode = {
        filename,
        lang,
        input,
        code,
      };
      exist.codesArray.push(newCode);
      await exist.save();
    }
    return;
  } catch (error) {
    console.log("error adding new user", error);
    return response.status(203).json(error.msg);
  }
};

export const getCode = async (request, response) => {
  try {
    const { filename, username, password } = request.body;
    let exist = await User.findOne({ username });
    if (exist && exist.password == password) {
      return response.status(200).json(exist.codesArray);
    }
    return response
      .status(203)
      .json({ error: "username or password is not correct" });
  } catch (error) {
    console.log("error adding new user", error);
    return response.status(203).json(error.msg);
  }
};

export const getSpecificCode = async (request, response) => {
  try {
    const { filename, username, password } = request.body;
    let exist = await User.findOne({ username });
    if (exist && exist.password == password) {
      let result = exist.codesArray.filter((curr) => {
        {
          return curr.filename === filename;
        }
      });

      return response.status(200).json(result);
    }
    return response
      .status(203)
      .json({ error: "username or password is not correct" });
  } catch (error) {
    console.log("error adding new user", error);
    return response.status(203).json(error.msg);
  }
};
