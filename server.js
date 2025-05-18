import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose"; 
import studentAuthRoute from "./Routes/studentAuthRoute.js";
import teacherAuthRoute from "./Routes/teacherAuthRoute.js";
import classRoute from "./Routes/classRoute.js";
import studentRoute from "./Routes/studentsRoute.js";
import subjectRoute from "./Routes/subjectRoute.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT ; 
const app = express();

app.use(express.json());

app.use(cors());

app.use('/API/studentAuth', studentAuthRoute)
app.use('/API/teacher', teacherAuthRoute)
app.use('/API/class', classRoute)
app.use('/API/student', studentRoute)
app.use('/API/subject', subjectRoute)

mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });

 

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
