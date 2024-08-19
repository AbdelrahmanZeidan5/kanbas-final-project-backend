import * as dao from "./dao.js";
import * as User from "../../User/dao.js";
import mongoose from "mongoose";


export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    };
    
    const findAllCourses = async (req, res) => {
        const { department, number, name } = req.query;
        if (department) {
        const courses = await dao.findCoursesByDepartment(department);
        res.json(courses);
        return;
        }

        if (number) {
            const courses = await dao.findCoursesByNumber(number);
            res.json(courses);
            return;
        }

        if (name) {
            const courses = await dao.findCoursesByPartialName(name);
            res.json(courses);
            return;
        }

        const courses = await dao.findAllCourses();
        res.json(courses);
    };

    const findCourseById = async (req, res) => {
        const course = await dao.findCourseById(req.params.courseId);
        res.json(course);
    };

    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.id);
        res.json(status);
    };

    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body);
        res.json(status);
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
                console.log("userWithCourses: ", userWithCourses);
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


  app.post("/api/courses", createCourse);
  app.get("/api/courses", findCoursesForUser);
  app.get("/api/courses/:id", findCourseById);
  app.delete("/api/courses/:id", deleteCourse);
  app.put("/api/courses/:id", updateCourse);

}