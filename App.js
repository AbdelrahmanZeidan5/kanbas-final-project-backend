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
import UserRoutes from "./User/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

const app = express();

// Middleware to prevent caching
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

// Updated session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    /*
    cookie: {
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development", // Set to true in production to use HTTPS
        domain: process.env.NODE_SERVER_DOMAIN, // Ensure this matches your deployment domain
        maxAge: 24 * 60 * 60 * 1000 // Cookie expiration (1 day)
    },
    */
    proxy: process.env.NODE_ENV !== "development", // Enable if behind a proxy
};

app.use(session(sessionOptions));
app.use(express.json()); // Make sure this is used before defining routes

// Define routes
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);
