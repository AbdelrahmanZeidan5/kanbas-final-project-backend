import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const course = await findCourseById(courseId);
            if (!course) {
                res.status(404).send({ message: "Course not found" });
                return;
            }
    
            const quizData = { ...req.body, course: course.number };  // Use course number directly
            const quiz = await dao.createQuiz(quizData);
            res.json(quiz);
        } catch (error) {
            res.status(500).send({ message: "Error creating quiz" });
        }
    };
    

    const findAllQuizzes = async (req, res) => {
        const { cid } = req.params;
        const course = await findCourseById(cid);
        const quizzes = await dao.findQuizzesByCourse(course.number);
        res.json(quizzes);
    };

    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    };
    
    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    };

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };

    const createQuestion = async (req, res) => {
        try {
            const quizId = req.params.qid;
            const question = await dao.createQuestion(quizId, req.body);
            res.json(question);
        } catch (error) {
            res.status(500).send({ message: "Error creating question" });
        }
    };

    const findQuestionsByQuizId = async (req, res) => {
        const questions = await dao.findQuestionsByQuizId(req.params.qid);
        res.json(questions);
    };

    const updateQuestion = async (req, res) => {
        const { qid, questionId } = req.params;
        const status = await dao.updateQuestionById(questionId, req.body);
        res.json(status);
    };

    const deleteQuestion = async (req, res) => {
        const status = await dao.deleteQuestionById(req.params.questionId);
        res.json(status);
    };

    const createQuizAttempt = async (req, res) => {
        try {
            const quizId = req.params.qid;
            const quizAttempt = await dao.createQuizAttempt(quizId, req.body);
            res.json(quizAttempt);
        } catch (error) {
            res.status(500).send({ message: "Error creating quiz attempt" });
        }
    }

    const findQuizAttemptsByQuizId = async (req, res) => {
        const quizAttempts = await dao.findQuizAttemptsByQuizId(req.params.qid);
        res.json(quizAttempts);
    };

    const findQuizAttemptById = async (req, res) => {
        const quizAttempt = await dao.findQuizAttemptById(req.params.qaId);
        res.json(quizAttempt);
    };

    const updateQuizAttempt = async (req, res) => {
        const status = await dao.updateQuizAttempt(req.params.qaId, req.body);
        res.json(status);
    };

    const deleteQuizAttempt = async (req, res) => {
        const status = await dao.deleteQuizAttemptById(req.params.qaId);
        res.json(status);
    };

    app.post("/api/quizzes/:qid/attempts", createQuizAttempt);
    app.get("/api/quizzes/:qid/attempts", findQuizAttemptsByQuizId);
    app.get("/api/quizzes/:qid/attempts/:qaId", findQuizAttemptById);
    app.put("/api/quizAttempts/:qid/attempts/:qaId", updateQuizAttempt);
    app.delete("/api/quizAttempts/:qaId", deleteQuizAttempt);

    app.get("/api/courses/:cid/quizzes", findAllQuizzes);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/quizzes/:qid", findQuizById);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);

    app.post("/api/quizzes/:qid/questions", createQuestion);
    app.get("/api/quizzes/:qid/questions", findQuestionsByQuizId);
    app.put("/api/quizzes/:qid/questions/:questionId", updateQuestion);
    app.delete("/api/questions/:questionId", deleteQuestion);
}
