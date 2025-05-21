import express from "express";
import Student from "../Models/studentModel.js";
import { handleError } from "../Helpers/handleError.js";
import classModel from "../Models/classModel.js";
import userModel from "../Models/userModel.js";
import mongoose from "mongoose";



export const editStudent = async (req, res, next) => {
  try {
    const { studentid } = req.params;
    const data = JSON.parse(req.body.data);

    const updatedStudent = await Student.findByIdAndUpdate(
      studentid,
      {
        $set: {
          name: data.name,
          email: data.email,
          rollNo: data.rollNo,
          classId: data.classId,
        },
      },
      { new: true }
    ).populate("classId", "name");

    if (!updatedStudent) {
      return next(handleError(404, "Student not found."));
    }

    res.status(200).json({
      success: true,
      student: updatedStudent,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { studentid } = req.params;
    await Student.findByIdAndDelete(studentid);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllStudents = async (req, res, next) => {
  try {
    const student = await Student.find()
      .populate("teacherId", "name number")
      .populate("classId", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      student,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getStudentsByClassAndTeacher = async (req, res, next) => {
  try {
    const { classId, teacherId } = req.params;

    const students = await Student.find({ classId, teacherId })
      .populate("teacherId", "name number")
      .populate("classId", "name")
      .sort({ createdAt: 1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getStudentDashboard = async (req, res, next) => {
  try {
    const { studentid } = req.params;
    console.log("studentid param:", studentid);

    if (!mongoose.Types.ObjectId.isValid(studentid)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student id format" });
    }

    const studentData = await Student.findById(studentid)
      .populate({
        path: "teacherId",
        select: "name email number school role",
        model: userModel,
      })
      .populate({ path: "classId", select: "name section", model: classModel })
      .lean();

    console.log("Student data found:", studentData);

    if (!studentData) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student: studentData });
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    return next(handleError(500, error.message));
  }
};
