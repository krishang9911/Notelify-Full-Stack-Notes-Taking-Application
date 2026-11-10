const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  // Logic for Registration/Signup
  const { name, email, password } = req.body;
  const user = await UserModel.find({email});

  if(user.length>0){
    return res.send({msg: "User already exists, please login"});
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (hash) {
        const newUser = new UserModel({ name, email, password: hash });
        await newUser.save();
        res.send({ msg: "User registered successfully" });
      } else {
        res.send({ msg: "Something went wrong" });
      }
    });
  } catch (error) {
    res.send({ msg: "Something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email }); // [{}] array of object
    console.log(user);
    if (user.length > 0) {
      // check for password
      // Load hash from your password DB.
      bcrypt.compare(password, user[0].password, async (err, result) => {
        // result == true
        if (result) {
          // Put the user's ID in the token and return it for frontend ownership checks.
          const token = jwt.sign({ userID: user[0]._id }, "coding");
          return res.send({ msg: "User login successfully", token, userID: user[0]._id.toString() });
        } else {
          return res.send({ msg: "wrong credientials" });
        }
      });
      // console.log(user);
    } else {
      return res.send({ msg: "Signup first" });
    }
  } catch (error) {
    return res.send({ msg: "Something went wrong" });
  }
});

module.exports = { userRouter };
