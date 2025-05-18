import express from "express"
import { logout, login, Register, addStudent } from "../Controller/studentAuthController.js";

const studentAuthRoute = express.Router()

studentAuthRoute.post("/register", Register);
studentAuthRoute.post("/login", login);
studentAuthRoute.get("/logout", logout);
studentAuthRoute.post("/add", addStudent)

export default studentAuthRoute