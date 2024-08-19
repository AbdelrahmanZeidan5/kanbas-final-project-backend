import express from 'express';
import session from "express-session";
import "dotenv/config";
import Hello from './Hello.js';
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./User/routes.js";
 
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
 
const app = express();
 
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);
 
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kanbas",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {}
// };

 
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        domain: ".kanbas-final-project-backend-kpif.onrender.com", // Corrected domain
    }
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
}

 
app.use(session(sessionOptions));
 
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Hello(app);
 
// Start Server
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`);
});