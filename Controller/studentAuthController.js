import { handleError } from "../Helpers/handleError.js";
import studentModel from "../Models/studentModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



//new student will be addded by teacher in database
export const addStudent = async (req, res, next) => {
    //Students will be added by teachers only;
  try {
    const data = req.body
    const student = new studentModel({
      studentId: data.studentId,
      name: data.name,
      classId: data.classId,
      rollNo: data.rollNo,
      email: data.email,
      teacherId: data.teacherId,
    });
    await student.save();
    res.status(200).json({
      success: true,
      message: "Student added successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

//Registered students will login using their student ID
export const Register = async (req, res, next) => {
  //Student will register himself again with his details

  try {
    const { studentId, email, password } = req.body;

    const student = await studentModel.findOne({ studentId });
    if (!student) {
      return next(handleError(404, "Invalid student ID."));
    }
    if (student.password) {
      return next(handleError(400, "Student already registered."));
    }


    const hashedPassword = await bcryptjs.hash(password, 10);
    student.password = hashedPassword;
    student.email = email
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student registration complete.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const { studentId, password } = req.body;

    const student = await studentModel.findOne({ studentId });
    if (!student) return next(handleError(404, "Student not found."));

    if (!student.password)
      return next(handleError(401, "Student not yet registered."));

    const isMatch = await bcryptjs.compare(password, student.password);
    if (!isMatch) return next(handleError(401, "Invalid credentials."));

    const token = jwt.sign(
      {
        _id: student._id,
        name: student.name,
        studentId: student.studentId,
        role: "Student",
      },
      process.env.JWTSECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json({
      success: true,
      token: token,
      student: studentData,
      message: "Login successful.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

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

