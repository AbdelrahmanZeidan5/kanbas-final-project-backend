import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";


export default function AssignmentRoutes(app) {

    const createAssignment = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const course = await findCourseById(courseId);
            if (!course) {
                res.status(404).send({ message: "Course not found" });
                return;
            }

            const assignmentData = { ...req.body, course: course.number };
            const assignment = await dao.createAssignment(assignmentData);
            res.json(assignment);
        } catch (error) {
            res.status(500).send({ message: "Error creating assignment" });
        }
    }

    const findAllAssignments = async (req, res) => {
        const { cid } = req.params;
        const course = await findCourseById(cid);
        const assignments = await dao.findAssignmentsByCourse(course.number);
        res.json(assignments);
    };
    
    const findAssignmentById = async (req, res) => {
        const assignment = await dao.findAssignmentById(req.params.aid);
        res.json(assignment);
    };

    const deleteAssignment = async (req, res) => {
        const status = await dao.deleteAssignment(req.params.aid);
        res.json(status);
    };

    const updateAssignment = async (req, res) => {
        const { aid } = req.params;
        const status = await dao.updateAssignment(aid, req.body);
        res.json(status);
    };

    app.get("/api/courses/:cid/assignments", findAllAssignments);
    app.post("/api/courses/:cid/assignments", createAssignment);
    app.get("/api/assignments/:aid", findAssignmentById);
    app.delete("/api/assignments/:aid", deleteAssignment);
    app.put("/api/assignments/:aid", updateAssignment);
}