import * as dao from "./dao.js";
import { findCourseById } from "../Courses/dao.js";

export default function ModuleRoutes(app) {

    const createModule = async (req, res) => {
        try {
            const courseId = req.params.cid;
            const course = await findCourseById(courseId);
            if (!course) {
                res.status(404).send({ message: "Course not found" });
                return;
            }

            const moduleData = { ...req.body, course: course.number };
            const module = await dao.createModule(moduleData);
            res.json(module);
        } catch (error) {
            res.status(500).send({ message: "Error creating module" });
        }
    };
    
    const findAllModules = async (req, res) => {
        const { cid } = req.params;
        const course = await findCourseById(cid);
        const modules = await dao.findModulesByCourse(course.number);
        res.json(modules);
    };

    const findModuleById = async (req, res) => {
        const module = await dao.findModuleById(req.params.mid);
        res.json(module);
    };

    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.mid);
        res.json(status);
    };

    const updateModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);
        res.json(status);
    };

    app.get("/api/courses/:cid/modules", findAllModules);
    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/modules/:mid", findModuleById);
    app.delete("/api/modules/:mid", deleteModule);
    app.put("/api/modules/:mid", updateModule);


}