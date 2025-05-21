import express from "express"
import { addSubject, deleteStudentSubject, getSubjectsForClass, updateStudentSubjects } from "../Controller/subjectController.js"

const subjectRoute = express.Router()

subjectRoute.post("/:classId/subjects", addSubject);
subjectRoute.get("/:classId/subjects", getSubjectsForClass);
subjectRoute.put("/:studentId/subjects", updateStudentSubjects);
subjectRoute.delete("/:studentId/delete", deleteStudentSubject)

export default subjectRoute