import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: String,
    points: Number,
    questionText: String,

    questionType: { //use this to determine which of the other options apply
        type: String,
        enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
        default: "MULTIPLE_CHOICE",
      },

    //only used in multiple choice questions
    multipleChoices: [{String, Boolean}], //list of pairs. The String is the text of the choice, the Boolean indicates correctness.

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

      availableFrom: String, //these could be formatted as dates for the calendar date entry
      availableUntil: String,
      dueDate: String,
      
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
      shuffleAnswers: Boolean,
      timeLimitInSeconds: Number, //encoded in SECONDS, convert units on front end for readability
      multipleAttempts: Boolean,
      howManyAttempts: Number, // if multipleAttempts is true, this is how many attempts are allowed
      showCorrectAnswers: {
        type: String,
        enum: ["ON_QUIZ_COMPLETION", "ON_DUE_DATE", "WHEN_QUIZ_IS_NO_LONGER_AVAILABLE"],
        default: "ON_QUIZ_COMPLETION",
      },
      accessCode: String,
      oneQuestionAtATime: Boolean,
      webcamRequired: Boolean,
      lockQuestionsAfterAnswering: Boolean, 
      
    },
    { 
      collection: "quizzes" 
    }
  );
  export default quizSchema;