import express from "express"
import { Create, deleteClass, getAllClass, getClassByTeacherId, updateClass } from "../Controller/classController.js"

const classRoute = express.Router()

classRoute.post("/add", Create)
classRoute.put("/update/:classId", updateClass)
classRoute.delete("/delete/:classId", deleteClass)
classRoute.get("/all-class", getAllClass)
classRoute.get("/teacher/:teacherId", getClassByTeacherId);


export default classRoute