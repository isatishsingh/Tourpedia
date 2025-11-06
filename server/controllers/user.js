import { models } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone, country, city } =
      req.body;
    const isAlreadyRegistered = await models.User.findOne({ where: { email } });
    if (isAlreadyRegistered) {
      return res.status(400).json({ error: "User already registered" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      email,
      password: encryptedPassword,
      firstname,
      lastname,
      phone,
      country,
      city,
    });
    // Remove password before sending response
    const { password: _, ...userData } = user.get({ plain: true });

    return res.status(201).json({ success: true, token, data: user });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    // Remove password before sending response
    const { password: _, ...userData } = user.get({ plain: true });

    return res.status(200).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    user.token = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
