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
        console.log("in findCoursesForUser: username:");
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

// Enroll a student in a course
const enrollInCourse = async (req, res) => {
  console.log("Page to enroll reached");
  try {
    const user = req.session.currentUser;
    console.log("Confirming user to enroll");
    if (!user || user.role !== "STUDENT") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { courseId } = req.body;
    const course = await dao.findCourseById(courseId);
    console.log("Found course to enroll to");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the course number to the student's enrolledCourses list
    const updatedUser = await User.addCourseToStudent(user.username, course.number);
    console.log("Successfully enrolled in course");

    res.json({ message: "Successfully enrolled", user: updatedUser });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  const loadAllCourses = async (req, res) => {
      try {
          // Retrieve all courses from the database
          const courses = await dao.findAllCourses();

          // Respond with the courses data
          res.json(courses);
      } catch (error) {
          console.error("Error loading all courses:", error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };


  app.post("/api/courses", createCourse);
  app.get("/api/courses", findCoursesForUser);
  app.get("/api/courses/all", loadAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.delete("/api/courses/:id", deleteCourse);
  app.put("/api/courses/:id", updateCourse);
  app.post("/api/enroll", enrollInCourse);
  app.get("/api/courses/all", findAllCourses);
}