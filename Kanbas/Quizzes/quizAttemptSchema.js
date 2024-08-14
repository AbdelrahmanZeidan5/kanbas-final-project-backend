import mongoose, {Schema} from "mongoose";

const questionAttemptSchema = new mongoose.Schema({
  questionId: Schema.Types.ObjectId, //use the question type from here to find which one of the below applies

  //only if question is multiple choice
  multipleChoiceAnswer: String,

  //only if question is true false
  trueFalseAnswer: Boolean,

  //only if question is fill in the blank
  fillInBlankAnswer: String,

  pointsAwarded: Number, //how many points given for the answer
});

const quizAttemptSchema = new mongoose.Schema({
  quizName: String, //the unique title of the quiz taken
  attempteeUsername: String, //the unique username of the person taking the quiz
  answers: [questionAttemptSchema],
  score: Number, //score on the quiz, can be calculated from answers
  date: String, //when the quiz was attempted
},
{
collection: "quizAttempts"
}
);


export default quizAttemptSchema;