import mongoose from "mongoose";
import { quizSchema, questionSchema } from "./schema.js";

const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);

export { Quiz, Question };
