import mongoose, { Schema } from "mongoose";

export const quizSchema = new mongoose.Schema(
    {
      course: { type: String, required: true },   // Reference for course
      title: { type: String, required: true },
      description: String,
      type: {
        type: String,
        enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
        default: "GRADED_QUIZ",
      },
      points: Number,
      assignmentGroup: { type: String, default: "Quizzes" }, // Could be "Exams", "Assignments", etc.
      shuffleAnswers: { type: Boolean, default: true },
      timeLimit: { type: Number, default: 20 }, // Time in minutes
      multipleAttempts: { type: Boolean, default: false },
      maxAttempts: { type: Number, default: 1 }, // Only used if multipleAttempts is true
      showCorrectAnswers: { type: Boolean, default: true },
      accessCode: String, // Optional passcode to access the quiz
      oneQuestionAtATime: { type: Boolean, default: true },
      webcamRequired: { type: Boolean, default: false },
      lockQuestionsAfterAnswering: { type: Boolean, default: false },
      dueDate: Date,
      availableFrom: Date,
      availableUntil: Date,
      published: { type: Boolean, default: false }, // Tracks whether the quiz is available to students
    },
    { collection: "quizzes" }
);


export const questionSchema = new mongoose.Schema(
    {
        quiz: { type: String, required: true },   // Reference for quizzes
        title: { type: String, required: true },
        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
            default: "MULTIPLE_CHOICE",
        },
        points: { type: Number, default: 1 },
        questionText: { type: String, required: true },
        choices: [
            {
                text: { type: String, required: true },  
                isCorrect: { type: Boolean }, 
            },
        ],
    },
    { collection: "questions" }
);
  
  export const quizAttemptSchema = new mongoose.Schema({
    quizId: Schema.Types.ObjectId, //the unique id of the quiz taken
    attempteeUsername: String, //the unique username of the person taking the quiz
    answers: {}, //keys are questionIds, values are string answer for fill in blank questions, selected answer id otherwise
    date: Date, //when the quiz was attempted
  },
  {
  collection: "quizAttempts"
  }
  );
  
  
  export default quizAttemptSchema;