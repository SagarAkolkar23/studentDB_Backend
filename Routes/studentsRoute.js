import express from "express"
import {  deleteStudent, editStudent, getStudentsByClassAndTeacher, showAllStudents } from "../Controller/studentsController.js"

const studentRoute = express.Router()


studentRoute.get("/get-all", showAllStudents) //Gets list of all the students from all classes
studentRoute.get("/edit/:studentId", editStudent) 
studentRoute.delete("/delete/:studentId", deleteStudent)
studentRoute.get("/class/:classId/teacher/:teacherId", getStudentsByClassAndTeacher);

export default studentRoute