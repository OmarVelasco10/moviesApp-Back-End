const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "An user exists with this email",
      });
    }
    user = new User(req.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id, user.name);
    let userToReturn = {};
    userToReturn.uid = user.id;
    userToReturn.name = user.name;

    res.status(201).json({
      user: userToReturn,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please, talk with the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "An user exists with this email",
      });
    }

    //Password confirm
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name);
    let userToReturn = {};
    userToReturn.uid = user.id;
    userToReturn.name = user.name;

    res.json({
      user: userToReturn,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please, talk with the administrator",
    });
  }
};

//Function to renew token
const renewToken = async (req, res = response) => {

  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  
  let userToReturn = {};
  userToReturn.uid = uid;
  userToReturn.name = name;

  res.json({
    user: userToReturn,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
