import mongoose from "mongoose";
import { quizSchema, questionSchema, quizAttemptSchema} from "./schema.js";

const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);
const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

export { Quiz, Question, QuizAttempt};
