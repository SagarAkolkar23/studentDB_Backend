import express from "express"
import { addSubject, deleteSubject, editSubject, showAllSubjects } from "../Controller/subjectController.js"

const subjectRoute = express.Router()

subjectRoute.post("/add", addSubject)
subjectRoute.delete("/delete", deleteSubject)
subjectRoute.get("/showAllSubjects", showAllSubjects)
subjectRoute.get("/edit", editSubject)

export default subjectRoute