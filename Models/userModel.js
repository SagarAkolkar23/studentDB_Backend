import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "Student",
    enum: ["Student", "Teacher"],
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  school: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: String, 
      required: true,
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;