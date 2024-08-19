import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
        default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
    createdCourses: {
        type: [String],  // Array of strings
        default: []
    },
    enrolledCourses: {
        type: [String],  // Array of strings
        default: []
    },
}, {
    collection: "users"
});

export default userSchema;