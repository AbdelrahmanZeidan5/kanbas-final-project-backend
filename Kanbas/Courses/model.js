import mongoose from "mongoose";
import courseSchema from "./schema.js";  // Import the course schema

const Course = mongoose.model('Course', courseSchema);  // Define the model using the schema

export default Course;
