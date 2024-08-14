import mongoose from "mongoose";
import schema from "./quizSchema.js";

const model = mongoose.model("QuizModel", schema);
export default model;