import mongoose from "mongoose";
import schema from "./quizAttemptSchema.js";

const model = mongoose.model("QuizAttemptModel", schema);
export default model;