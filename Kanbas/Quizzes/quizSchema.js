import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: String,
    points: Number,
    questionText: { type: String, required: true },

    questionType: { //use this to determine which of the other options apply
        type: String,
        enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
        default: "MULTIPLE_CHOICE",
      },

    //only used in multiple choice questions
    choices: [
      {
          text: { type: String, required: true },  
          isCorrect: { type: Boolean, required: true}, 
      },
    ],

    //only used in true fase questions
    trueFalse: Boolean, //true if the answer to the question is 'true'.

    //only for fill in the blank questions
    acceptableAnswers: [String],
    caseSensitive: Boolean, //True for case sensitivity, false otherwise
  
});

const quizSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, unique: true},
      course: {type: String, required: true}, //course number (A String)
      description: String,

      availableFrom: Date,
      availableUntil: Date,
      dueDate: Date,
      
      quizType: {
        type: String,
        enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "PRACTICE_SURVEY"],
        default: "GRADED_QUIZ",
      },
      points: Number,
      questions: [questionSchema],
      assignmentGroup: {
        type: String,
        enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
        default: "QUIZZES",
      },
      shuffleAnswers: { type: Boolean, default: true },
      timeLimitInSeconds: Number, //encoded in SECONDS, convert units on front end for readability
      multipleAttempts: { type: Boolean, default: false },
      howManyAttempts: { type: Number, default: 1 }, // if multipleAttempts is true, this is how many attempts are allowed
      showCorrectAnswers: {
        type: String,
        enum: ["ON_QUIZ_COMPLETION", "ON_DUE_DATE", "WHEN_QUIZ_IS_NO_LONGER_AVAILABLE"],
        default: "ON_QUIZ_COMPLETION",
      },
      accessCode: String,
      oneQuestionAtATime: { type: Boolean, default: true },
      webcamRequired: { type: Boolean, default: false },
      lockQuestionsAfterAnswering: { type: Boolean, default: false }, 
      published: { type: Boolean, default: false }, // Tracks whether the quiz is available to students
      
    },
    { 
      collection: "quizzes" 
    }
  );
  export default quizSchema;