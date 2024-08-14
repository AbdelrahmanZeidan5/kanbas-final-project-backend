import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";

export default function QuizRoutes(app) { //handles quiz attempt routes too

    //quiz routes
    const createQuiz = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const course = await findCourseById(courseId);
            if (!course) {
                res.status(404).send({ message: "Course not found" });
                return;
            }

            const quizData = { ...req.body, course: course.number };
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

    app.get("/api/courses/:cid/quizzes", findAllQuizzes);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/quizzes/:qid", findQuizById);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.put("/api/quizzes/:qid", updateQuiz);

    //quiz attempt routes

    const createQuizAttempt = async (req, res) => {
        const quizAttempt = await dao.createQuizAttempt(req.body);
        res.json(quizAttempt);
    };
    
    const findAllQuizAttempts = async (req, res) => {
        const quizzes = await dao.findAllQuizAttempts();
        res.json(quizzes);
    };

    const deleteQuizAttempt = async (req, res) => {
        const status = await dao.deleteQuizAttempt(req.params.qid);
        res.json(status);
    };

    const updateQuizAttempt = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };

    const findQuizAttemptsByQuiz = async (req, res) => {
        const quizAttempts = await dao.findQuizAttemptsByQuiz(req.params.qTitle);
        res.json(quizAttempts);
    };

    const findQuizAttemptsByQuizAndAttemptee = async (req, res) => {
        const quizAttempts = await dao.findQuizAttemptsByQuizAndAttemptee(req.params.qTitle, req.params.qAttemptee);
        res.json(quizAttempts);
    };

    app.get("/api/quizAttempts", findAllQuizAttempts);
    app.post("/api/quizAttempts", createQuizAttempt);
    app.get("/api/quizAttempts/:qTitle", findQuizAttemptsByQuiz);
    app.get("/api/quizAttempts/:qTitle/:qAttemptee", findQuizAttemptsByQuizAndAttemptee);
    app.delete("/api/quizAttempts/:qid", deleteQuizAttempt);
    app.put("/api/quizAttempts/:qid", updateQuizAttempt);

}