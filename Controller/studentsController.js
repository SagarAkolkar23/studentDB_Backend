import express from "express";
import Student from "../Models/studentModel.js";
import { handleError } from "../Helpers/handleError.js";

import bcrypt from "bcryptjs";


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

