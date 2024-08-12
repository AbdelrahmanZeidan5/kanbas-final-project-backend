import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    name: { type: String, required: true},
    startDate: Date,
    email: String,
    endDate: Date,
    department: String,
    credits: Number,
    image: String,
    description: String,
  },
  { 
    collection: "courses" 
  }
);
export default coursesSchema;