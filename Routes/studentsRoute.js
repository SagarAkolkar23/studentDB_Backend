import express from "express"
import {  deleteStudent, editStudent, getStudentDashboard, getStudentsByClassAndTeacher, showAllStudents } from "../Controller/studentsController.js"
import { verifyToken } from "../middleware/authenticate.js";

const studentRoute = express.Router()


studentRoute.get("/get-all", showAllStudents) //Gets list of all the students from all classes
studentRoute.get("/edit/:studentId", editStudent) 
studentRoute.delete("/delete/:studentId", deleteStudent)
studentRoute.get("/class/:classId/teacher/:teacherId", getStudentsByClassAndTeacher);
studentRoute.get("/me/:studentid", getStudentDashboard);


export default studentRoute