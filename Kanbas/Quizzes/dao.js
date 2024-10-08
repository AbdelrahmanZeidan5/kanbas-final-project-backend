import { Quiz, Question, QuizAttempt } from "./model.js";

// Create a new quiz
export const createQuiz = (quiz) => {
    delete quiz._id;
    return Quiz.create(quiz);
};

// Find all quizzes
export const findAllQuizzes = () => Quiz.find();

// Find a quiz by ID
export const findQuizById = (quizId) => Quiz.findById(quizId).populate('course');

// Update a quiz by ID
export const updateQuiz = (quizId, quiz) => Quiz.updateOne({ _id: quizId }, { $set: quiz });

// Delete a quiz by ID
export const deleteQuiz = (quizId) => Quiz.deleteOne({ _id: quizId });

// Find quizzes by course
export const findQuizzesByCourse = (courseId) => Quiz.find({ course: courseId });

// Create a question for a quiz
export const createQuestion = (quizId, question) => {
    question.quiz = quizId;
    delete question._id;
    return Question.create(question);
};

// Find all questions for a quiz
export const findQuestionsByQuizId = (quizId) => Question.find({ quiz: quizId });

// Update a question by ID
export const updateQuestionById = (questionId, question) => {
    return Question.findByIdAndUpdate(questionId, { $set: question }, { new: true });
};

// Delete a question by ID
export const deleteQuestionById = (questionId) => Question.findByIdAndDelete(questionId);

// Create a QuizAttempt
export const createQuizAttempt = (quizId, qa) => {
    qa.quizId = quizId;
    delete qa._id;
    return QuizAttempt.create(qa);
};

//Update a QuizAttempt
export const updateQuizAttempt = (qaId, qa) => {
    return QuizAttempt.updateOne( {_id: qaId }, { $set: qa });
};

// Delete a QuizAttempt by ID
export const deleteQuizAttemptById = (qaId) => QuizAttempt.findByIdAndDelete(qaId);

// Find all attempts for a quiz
export const findQuizAttemptsByQuizId = (quizId) => QuizAttempt.find({ quizId: quizId });

// Find a quiz attempt by ID
export const findQuizAttemptById = (qaId) => QuizAttempt.findById(qaId);
