import mongoose from "mongoose"; 

const classSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Class", classSchema);
