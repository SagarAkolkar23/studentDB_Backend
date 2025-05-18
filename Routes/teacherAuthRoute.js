import express from "express"
import { getMyProfile, login, logout, Register } from "../Controller/teacherAuthController.js"
import { verifyToken } from "../middleware/authenticate.js";

const teacherAuthRoute = express.Router()

teacherAuthRoute.post('/register', Register)
teacherAuthRoute.post("/login", login);
teacherAuthRoute.get("/logout", logout);
teacherAuthRoute.get("/profile",verifyToken, getMyProfile)

export default teacherAuthRoute