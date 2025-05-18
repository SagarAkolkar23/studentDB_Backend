import { handleError } from "../Helpers/handleError.js";
import userModel from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const Register = async (req, res, next) => {
  try {
    const {name, email, school, number, password} = req.body;
    const checkUser = await userModel.findOne({email});
    if(checkUser){
        return next(handleError(409, "User Already Registered."))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const user = new userModel({
        name,
        email,
        school,
        number,
        password: hashedPassword,
        role: "Teacher"
    })
    await user.save()
    res.status(201).json({
        successful:true,
        message: "Registration Successful"
    })
    
  } catch (error) {
    next(handleError(500, error.message))
  }
};


export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user) {
      return next(handleError(404, "User not found."));
    }
    const hashedPassword = user.password
    const comparePassword = await bcryptjs.compare(password, hashedPassword)
    if(!comparePassword){return next(handleError(401, "Invalid credentials."))}

    const token = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  process.env.JWTSECRET
)


res.cookie("access_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/"
})
const newUser = user.toObject({getters: true})
delete newUser.password

res.status(200).json({
  success: true,
  token,
  newUser,
  message: "Login successful"
})
    
  } catch (error) {
    next(handleError(500, error.message))
  }
}


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout Successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId).select("-password"); // exclude password

    if (!user) return next(handleError(404, "User not found"));

    res.status(200).json({
      success: true,
      teacher: user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
