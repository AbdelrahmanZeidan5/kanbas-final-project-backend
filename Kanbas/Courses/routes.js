import * as dao from "./dao.js";
import * as User from "../../User/dao.js";
import mongoose from "mongoose";

export default function CourseRoutes(app) {
    // Middleware to ensure user is authenticated
    const ensureAuthenticated = (req, res, next) => {
        if (req.session && req.session.currentUser) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };

    // Create a course
    const createCourse = async (req, res) => {
        try {
            const user = req.session.currentUser;
            const course = { ...req.body, createdBy: user._id };
            const createdCourse = await dao.createCourse(course);
            await User.findByIdAndUpdate(user._id, { $push: { createdCourses: createdCourse._id } });
            res.json(createdCourse);
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Find all courses for a user
    const findCoursesForUser = async (req, res) => {
        console.log("in findCoursesForUser: username:", req.session.currentUser);
        try {
            const user = req.session.currentUser;
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (user.role === 'FACULTY') {
                const courses = await dao.findCoursesByCreator(user.username);
                console.log("faculty: courses", courses);
                res.json(courses);
            } else if (user.role === 'STUDENT') {
                const userWithCourses = await User.findUserByUsername(user.username);
                const courses = await Promise.all(
                    userWithCourses.enrolledCourses.map(async (courseNumber) => {
                        const courseData = await dao.findCoursesByNumber(courseNumber);
                        return courseData[0];
                    })
                );
                console.log("student: courses", courses);
                res.json(courses);
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            console.error('Error finding courses for user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Enroll in a course
    const enrollInCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const user = req.session.currentUser;
            const course = await dao.findCourseById(courseId);

            if (course) {
                await User.findByIdAndUpdate(user._id, { $addToSet: { enrolledCourses: courseId } });
                res.json({ message: 'Successfully enrolled' });
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Find all courses (for admin use)
    const findAllCourses = async (req, res) => {
        try {
            const { department, number, name } = req.query;
            let courses;
            if (department) {
                courses = await dao.findCoursesByDepartment(department);
            } else if (number) {
                courses = await dao.findCoursesByNumber(number);
            } else if (name) {
                courses = await dao.findCoursesByPartialName(name);
            } else {
                courses = await dao.findAllCourses();
            }
            res.json(courses);
        } catch (error) {
            console.error('Error finding all courses:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Find course by ID
    const findCourseById = async (req, res) => {
        try {
            const course = await dao.findCourseById(req.params.id);
            if (course) {
                res.json(course);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } catch (error) {
            console.error('Error finding course by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Delete course
    const deleteCourse = async (req, res) => {
        try {
            const status = await dao.deleteCourse(req.params.id);
            res.json(status);
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Update course
    const updateCourse = async (req, res) => {
        try {
            const { id } = req.params;
            const status = await dao.updateCourse(id, req.body);
            res.json(status);
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Define routes with authentication check
    app.post("/api/courses", ensureAuthenticated, createCourse);
    app.get("/api/courses", ensureAuthenticated, findCoursesForUser);
    app.get("/api/courses/all", findAllCourses); // Optional route to get all courses without user filtering
    app.get("/api/courses/:id", ensureAuthenticated, findCourseById);
    app.delete("/api/courses/:id", ensureAuthenticated, deleteCourse);
    app.put("/api/courses/:id", ensureAuthenticated, updateCourse);
    app.post("/api/courses/:courseId/enroll", ensureAuthenticated, enrollInCourse);
}
