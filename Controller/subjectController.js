import { handleError } from "../Helpers/handleError.js"
import classModel from "../Models/classModel.js";
import Subject from "../Models/subjectModel.js"
import StudentModel from "../Models/studentModel.js";

//Subjects added by teacher
export const addSubject = async (req, res, next) => {
    const { classId } = req.params;
  const { subjects } = req.body;

  try {
    const updatedClass = await classModel.findByIdAndUpdate(
      classId,
      { $addToSet: { subjects: { $each: subjects } } }, // ✅ Adds without duplicates
      { new: true, upsert: false }
    );
    res.status(200).json(updatedClass);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add subjects' });
  }
}



// controller
export const getSubjectsForClass = async (req, res) => {
    const { classId } = req.params;
  
    try {
      const classData = await classModel.findById(classId);
      if (!classData) return res.status(404).json({ message: "Class not found" });
  
      res.status(200).json({ subjects: classData.subjects });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
// Subjects chosen by students
export const updateStudentSubjects = async (req, res) => {
  const { studentId } = req.params;
  const { subjects } = req.body;

  if (!Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: "Subjects array is required" });
  }

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { subjects: { $each: subjects } }, // Adds only non-duplicate subjects
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Subjects updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteStudentSubject = async (req, res) => {
  const { studentId } = req.params;
  const { subject } = req.body;

  if (!subject || typeof subject !== "string") {
    return res
      .status(400)
      .json({ message: "Subject is required and must be a string" });
  }

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      studentId,
      { $pull: { subjects: subject } }, 
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Subject removed successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error removing subject from student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
