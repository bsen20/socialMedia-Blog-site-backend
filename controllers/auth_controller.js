import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    //generate hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user in database and respond
    const user = await newUser.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");
    validPassword && res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
