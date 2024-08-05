import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // Retrieve all assignments for a specific course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter(a => a.course === cid);
        res.send(assignments);
    });

    // Create a new assignment for a specific course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignment = { ...req.body, _id: new Date().getTime().toString(), course: cid };
        db.assignments.push(assignment);
        res.send(assignment);
    });


    // Update assignment by ID
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const updatedAssignment = req.body;
        db.assignments = db.assignments.map(a =>
            a._id === aid ? { ...a, ...updatedAssignment } : a
        );
        res.sendStatus(204);
    });

    // Delete assignment by ID
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter(a => a._id !== aid);
        res.sendStatus(204);
    });

}