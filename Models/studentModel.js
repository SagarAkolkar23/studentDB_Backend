
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId:{
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rollNo:{
      type: String,
      required: true,
      unique: true,

    },
    password: {
      type: String,
      required: false,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    classId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: "Class" 
      },

    subjects: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;

