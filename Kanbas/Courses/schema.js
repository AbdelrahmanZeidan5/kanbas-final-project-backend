import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    number: { type: String, required: true },
    name: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    image: String,
    description: String,
    createdBy: String // Reference to the faculty user
}, { collection: "courses" });

export default courseSchema;