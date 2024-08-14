import quizModel from "./quizModel.js";
import quizAttemptModel from "./quizAttemptModel.js";


// quizzes
export const createQuiz = (quiz) => {
    delete quiz._id
    return quizModel.create(quiz);
}
export const findAllQuizzes = () => quizModel.find();
export const findQuizById = (quizId) => quizModel.findById(quizId);
export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId });
export const findQuizzesByCourse = (course) => quizModel.find({ course: course });


//quiz attempts
export const createQuizAttempt = (quizAttempt) => {
    delete quizAttempt._id
    return quizAttemptModel.create(quizAttempt);
}
export const findAllQuizAttempts = () => quizAttemptModel.find();
export const findQuizAttemptById = (quizAttemptId) => quizAttemptModel.findById(quizAttemptId);
export const updateQuizAttempt = (quizAttemptId, quizAttempt) => quizAttemptModel.updateOne({ _id: quizAttemptId }, { $set: quizAttempt });
export const deleteQuizAttempt = (quizAttemptId) => quizAttemptModel.deleteOne({ _id: quizAttemptId });
export const findQuizAttemptsByQuiz = (quiz) => quizAttemptModel.find({ quizName: quiz });
export const findQuizAttemptsByAttemptee = (attemptee) => quizAttemptModel.find({ attempteeUsername: attemptee });
export const findQuizAttemptsByQuizAndAttemptee = (quiz, attemptee) => quizAttemptModel.find({ quizName: quiz, attempteeUsername: attemptee });

