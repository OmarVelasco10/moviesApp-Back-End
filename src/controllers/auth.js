const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }
    user = new User(req.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id, user.name);
    let userToReturn = {}
    userToReturn.uid = user.id;
    userToReturn.name = user.name;
    console.log(userToReturn);
   

    res.status(201).json({
      user: userToReturn,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};


const loginUser = async(req, res = response) => {

  const { email, password } = req.body;
 

  try {

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(400).json({
          ok: false,
          msg: "Un usuario no existe con ese correo",
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
     let userToReturn = {}
     userToReturn.uid = user.id;
     userToReturn.name = user.name;
     console.log(userToReturn);

    res.json({
        user: userToReturn,
        token
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
  }

};



//Function to renew token
const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name);
    let userToReturn = {}
    userToReturn.uid = uid;
    userToReturn.name = name;
    console.log(userToReturn);
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
