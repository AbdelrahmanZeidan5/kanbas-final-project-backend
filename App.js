import express from 'express';
import Hello from './Hello.js';
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";

const app = express();
app.use(cors()); 
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

Hello(app);
app.listen(process.env.PORT || 4000);
